'use client';

import { useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import {
  DownloadOutlined,
  LoadingOutlined,
  QrcodeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import QRCode from 'qrcode';

type PaymentItem = {
  personalId: string | null;
  customerId: string | null;
  companyId: string;
  companyTaxId: string;
  amount: number;
  contractNo: string;
  productName: string;
  buyFromName: string;
};

type GeneratedQr = {
  customerId: string;
  dataUrl: string;
  payload: string;
};

const API_BASE_URL = 'https://www.cfasia.co.th/api/getpay';
const COMPANY_NAME = 'บริษัท บริหารสินทรัพย์ ซีเอฟ เอเชีย จำกัด';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(item: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = item[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return '';
}

// ===== Build payload (ตาม C# ที่ให้มา) =====
function buildBillBarcodePayload({
  taxId13,
  customerId,
  personalId,
  amount = 0,
}: {
  taxId13: string;
  customerId: string;
  personalId: string;
  amount?: number;
}) {
  const tax = String(taxId13 || '').trim();
  const r1 = String(customerId || '').trim();
  const r2 = String(personalId || '').trim();
  const amt = String(amount || 0).trim();
  return '|' + tax + '00' + '\r' + r1 + '\r' + r2 + '\r' + amt;
}

// ===== Normalize backend fields =====
function normalizeItem(item: unknown): PaymentItem | null {
  if (!isRecord(item)) return null;

  const rawAmount = item.amount;
  const personalId = getString(item, 'PersonalID', 'personalId') || null;
  const customerId = getString(item, 'CustomerID', 'customerId') || null;
  const companyTaxId =
    getString(item, 'CompanyTaxID', 'companyTaxId') || '0105546031394';

  return {
    personalId,
    customerId,
    companyId: getString(item, 'CompanyID', 'companyId'),
    companyTaxId,
    amount: rawAmount != null ? Number(rawAmount) : 0,
    contractNo:
      getString(item, 'ContractNo', 'contractNo') ||
      getString(item, 'CustomerID') ||
      '',
    productName: getString(item, 'TProductName', 'productName'),
    buyFromName: getString(item, 'TBuyFromName', 'buyFromName'),
  };
}

// ===== แปลง response เป็น list items =====
function extractItems(json: unknown) {
  if (!json) return [];
  if (Array.isArray(json)) return json;
  if (isRecord(json) && Array.isArray(json.data)) return json.data;
  if (isRecord(json) && Array.isArray(json.value)) return json.value;
  return [json];
}

function isPaymentItem(item: PaymentItem | null): item is PaymentItem {
  return item !== null;
}

function isRwayItem(item: PaymentItem) {
  return item.companyId.trim().toUpperCase() === 'RWAY';
}

async function createQrDataUrl(item: PaymentItem, personalId: string) {
  const payload = buildBillBarcodePayload({
    taxId13: item.companyTaxId,
    customerId: item.customerId || '',
    personalId: item.personalId || personalId,
    amount: item.amount || 0,
  });

  const dataUrl = await QRCode.toDataURL(payload, {
    errorCorrectionLevel: 'M',
    margin: 1,
    scale: 8,
  });

  return { dataUrl, payload };
}

export default function PaymentFormPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [personalId, setPersonalId] = useState('');
  const [items, setItems] = useState<PaymentItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [qr, setQr] = useState<GeneratedQr | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const selectedItem = useMemo(
    () => (selectedIndex == null ? null : items[selectedIndex]),
    [items, selectedIndex],
  );

  function resetForm() {
    setPersonalId('');
    setItems([]);
    setSelectedIndex(null);
    setQr(null);
    setMessage('');
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  async function generateQr(item: PaymentItem, searchId: string) {
    if (!item.customerId) {
      setMessage('ข้อมูลสัญญาไม่ครบ กรุณาติดต่อเจ้าหน้าที่');
      return;
    }

    const result = await createQrDataUrl(item, searchId);
    setQr({
      customerId: item.customerId,
      dataUrl: result.dataUrl,
      payload: result.payload,
    });
  }

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const searchId = personalId.replace(/\D/g, '');
    if (searchId.length !== 13) {
      setMessage('กรุณากรอกเลขบัตรประชาชน 13 หลัก');
      return;
    }

    setLoading(true);
    setItems([]);
    setSelectedIndex(null);
    setQr(null);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/${searchId}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('ไม่สามารถดึงข้อมูลได้');
      }

      const json = await response.json();
      const normalized = extractItems(json)
        .map(normalizeItem)
        .filter(isPaymentItem)
        .filter(isRwayItem);

      if (normalized.length === 0) {
        setMessage('ไม่พบข้อมูล กรุณาตรวจสอบเลขบัตรประชาชนอีกครั้ง');
        return;
      }

      setItems(normalized);

      if (normalized.length === 1) {
        setSelectedIndex(0);
        await generateQr(normalized[0], searchId);
      } else {
        setMessage('กรุณาเลือกสัญญาที่ต้องการชำระเงิน');
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการค้นหา',
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateSelected() {
    if (!selectedItem) {
      setMessage('กรุณาเลือกสัญญาที่ต้องการชำระเงิน');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      await generateQr(selectedItem, personalId);
    } catch {
      setMessage('ไม่สามารถสร้าง QR Code ได้');
    } finally {
      setLoading(false);
    }
  }

  function downloadQr() {
    if (!qr) return;

    const image = new Image();
    image.onload = () => {
      const width = 560;
      const qrSize = 300;
      const height = 520;
      const scale = window.devicePixelRatio || 1;
      const canvas = document.createElement('canvas');
      canvas.width = width * scale;
      canvas.height = height * scale;

      const context = canvas.getContext('2d');
      if (!context) {
        downloadDataUrl(qr.dataUrl, `QR_RWAY_${qr.customerId}.png`);
        return;
      }

      context.scale(scale, scale);
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, width, height);
      context.textAlign = 'center';
      context.fillStyle = '#2c3546';
      context.font = "700 20px 'Prompt', sans-serif";
      context.fillText(COMPANY_NAME, width / 2, 62);
      context.strokeStyle = '#e5e7eb';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(80, 78);
      context.lineTo(width - 80, 78);
      context.stroke();
      context.drawImage(image, (width - qrSize) / 2, 110, qrSize, qrSize);
      context.font = "700 20px 'Prompt', sans-serif";
      context.fillText(
        `เลขที่สัญญา : ${qr.customerId}`,
        width / 2,
        qrSize + 158,
      );

      const fileName = `QR_RWAY_${qr.customerId}.png`;
      if (canvas.toBlob) {
        canvas.toBlob((blob) => {
          if (!blob) {
            downloadDataUrl(qr.dataUrl, fileName);
            return;
          }

          const objectUrl = URL.createObjectURL(blob);
          downloadDataUrl(objectUrl, fileName);
          setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
        }, 'image/png');
      } else {
        downloadDataUrl(canvas.toDataURL('image/png'), fileName);
      }
    };
    image.onerror = () =>
      downloadDataUrl(qr.dataUrl, `QR_RWAY_${qr.customerId}.png`);
    image.src = qr.dataUrl;
  }

  function downloadDataUrl(url: string, fileName: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Box className="payment-page">
      <Box className="payment-container">
        <VStack align="center" mb={{ base: 9, md: 12 }} gap={0}>
          <Text className="section-title" textAlign="center">
            ขอแบบฟอร์มชำระเงิน
          </Text>
          <Box
            width="84px"
            height="3px"
            bg="#e8192c"
            borderRadius="2px"
            mt={3}
          />
        </VStack>

        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          gap={{ base: 6, lg: 8 }}
          alignItems="stretch"
        >
          <Box className="payment-card">
            <form onSubmit={handleSearch} noValidate>
              <Text className="payment-label">บัตรประชาชน 13 หลัก</Text>
              <div className="payment-search-row">
                <label className="payment-input-wrap">
                  <input
                    ref={inputRef}
                    value={personalId}
                    onChange={(event) => {
                      const nextValue = event.target.value.replace(/\D/g, '');
                      if (nextValue.length <= 13) {
                        setPersonalId(nextValue);
                      }
                    }}
                    placeholder="ระบุบัตรประชาชน 13 หลัก"
                    maxLength={13}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="off"
                    disabled={loading}
                    aria-label="บัตรประชาชน 13 หลัก"
                  />
                  <span>{personalId.length}/13</span>
                </label>
                <button
                  className="payment-primary-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <LoadingOutlined /> : <SearchOutlined />}
                  ค้นหา
                </button>
              </div>
            </form>

            <Text className="payment-help">
              กรุณาระบุหมายเลขบัตรประชาชน 13 หลักของท่าน
            </Text>

            {message && <div className="payment-message">{message}</div>}

            {items.length > 1 && (
              <div className="payment-contract-list">
                <Text className="payment-contract-heading">
                  เลือกสัญญาที่ต้องการชำระเงิน
                </Text>
                {items.map((item, index) => (
                  <button
                    key={`${item.customerId}-${index}`}
                    className={
                      selectedIndex === index
                        ? 'payment-contract-option is-selected'
                        : 'payment-contract-option'
                    }
                    type="button"
                    onClick={() => {
                      setSelectedIndex(index);
                      setQr(null);
                      setMessage('');
                    }}
                  >
                    <span className="payment-radio-dot" />
                    <span>
                      <strong>เลขที่สัญญา : {item.customerId}</strong>
                      {item.productName && <em>บัญชี {item.productName}</em>}
                      {item.buyFromName && (
                        <em>รับโอนหนี้จาก {item.buyFromName}</em>
                      )}
                    </span>
                  </button>
                ))}
                <button
                  className="payment-primary-button payment-wide-button"
                  type="button"
                  disabled={loading || selectedIndex == null}
                  onClick={handleGenerateSelected}
                >
                  <QrcodeOutlined />
                  สร้าง QR Code
                </button>
              </div>
            )}

            {items.length === 1 && (
              <div className="payment-contract-summary">
                <p>
                  เลขที่สัญญา : <strong>{items[0].customerId}</strong>
                </p>
                {items[0].productName && <p>บัญชี {items[0].productName}</p>}
                {items[0].buyFromName && (
                  <p>รับโอนหนี้จาก {items[0].buyFromName}</p>
                )}
              </div>
            )}

            {items.length > 0 && (
              <div className="payment-reset-row">
                <button
                  className="payment-reset-button"
                  type="button"
                  onClick={resetForm}
                >
                  Reset
                </button>
              </div>
            )}
          </Box>

          <Box className="payment-card payment-qr-card">
            {qr && (
              <div className="payment-company-name">
                {COMPANY_NAME}
                <span />
              </div>
            )}

            <div className="payment-qr-frame">
              {qr ? (
                <img src={qr.dataUrl} alt="Payment QR Code" />
              ) : (
                <QrcodeOutlined />
              )}
            </div>

            {qr && (
              <>
                <Text className="payment-qr-contract">
                  เลขที่สัญญา: <strong>{qr.customerId}</strong>
                </Text>
                <button
                  className="payment-download-button"
                  type="button"
                  onClick={downloadQr}
                  aria-label="ดาวน์โหลด QR Code"
                >
                  <DownloadOutlined />
                </button>
                <div className="payment-instructions">
                  <strong>วิธีการใช้งาน:</strong>
                  <p>1. เปิดแอปธนาคารของคุณ</p>
                  <p>
                    2. เลือกเมนู &quot;สแกน QR Code&quot; หรือ
                    &quot;จ่ายเงิน&quot;
                  </p>
                  <p>3. สแกน QR Code ด้านบน</p>
                  <p>4. ระบุจำนวนเงินที่ต้องการชำระ</p>
                  <p>5. ยืนยันการทำรายการ</p>
                </div>
              </>
            )}
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ContactPayload = {
  name?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const serviceLabels: Record<string, string> = {
  complaint: 'แจ้งเรื่องร้องเรียน',
  information: 'สอบถามข้อมูล',
  // payment: 'การชำระเงิน',
  other: 'อื่น ๆ',
};

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;
  const name = payload.name?.trim();
  const phone = payload.phone?.trim();
  const service = payload.service?.trim();
  const message = payload.message?.trim();

  if (!name || !phone || !service || !message) {
    return NextResponse.json(
      { message: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
      { status: 400 },
    );
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to =
    process.env.CONTACT_MAIL_TO ??
    process.env.CONTACT_TO_EMAIL ??
    'nuttokota00112@gmail.com';
  const from = process.env.SMTP_FROM ?? user;

  if (!host || !user || !pass || !from) {
    return NextResponse.json(
      {
        message:
          'ยังไม่ได้ตั้งค่า SMTP_HOST, SMTP_USER, SMTP_PASS และ SMTP_FROM',
      },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: { user, pass },
  });

  const serviceLabel = serviceLabels[service] ?? service;

  try {
    await transporter.sendMail({
      from,
      to,
      subject: `[${serviceLabel}] ข้อความติดต่อจากเว็บไซต์ RWAY - ${name}`,
      text: [
        'มีข้อความติดต่อจากเว็บไซต์ RWAY',
        '',
        `ชื่อ-นามสกุล: ${name}`,
        `เบอร์โทรศัพท์: ${phone}`,
        `หัวข้อ: ${serviceLabel}`,
        '',
        'รายละเอียด:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #1f2933;">
          <h2>มีข้อความติดต่อจากเว็บไซต์ RWAY</h2>
          <p><strong>ชื่อ-นามสกุล:</strong> ${escapeHtml(name)}</p>
          <p><strong>เบอร์โทรศัพท์:</strong> ${escapeHtml(phone)}</p>
          <p><strong>หัวข้อ:</strong> ${escapeHtml(serviceLabel)}</p>
          <p><strong>รายละเอียด:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'ส่งอีเมลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง' },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: 'ส่งข้อความเรียบร้อยแล้ว' });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

'use client';

import { useState } from 'react';
import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import {
  CheckCircleFilled,
  EnvironmentFilled,
  PhoneFilled,
  SendOutlined,
  WechatFilled,
} from '@ant-design/icons';
import { Form, Input } from 'antd';

const { TextArea } = Input;

type ContactFormValues = {
  name: string;
  phone: string;
  service: string;
  message: string;
};

const contactCards = [
  {
    icon: <PhoneFilled />,
    title: 'โทรศัพท์',
    value: '02 821 1055',
    note: 'วันจันทร์-วันศุกร์ 8:30-17:30',
    color: '#f7931e',
    bg: '#fff1dd',
  },
  {
    icon: <WechatFilled />,
    title: 'LINE Official',
    value: '@rway',
    note: 'ตอบกลับภายในเวลาทำการ',
    color: '#18c463',
    bg: '#e8fff1',
  },
  {
    icon: <EnvironmentFilled />,
    title: 'สำนักงานใหญ่',
    value: 'บริษัท รีโซลูชั่น เวย์ จำกัด',
    note: '34/6 หมู่ 1 ถนนแจ้งวัฒนะ ตำบลคลองเกลือ อำเภอปากเกร็ด จังหวัดนนทบุรี 11120',
    color: '#ff6b6b',
    bg: '#ffecec',
  },
];

export default function ContactSection() {
  const [form] = Form.useForm<ContactFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  async function handleSubmit(values: ContactFormValues) {
    setSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? 'ส่งข้อความไม่สำเร็จ');
      }

      form.resetFields();
      setShowSuccessModal(true);
    } catch (error) {
      setSubmitMessage(
        error instanceof Error ? error.message : 'ส่งข้อความไม่สำเร็จ',
      );
    } finally {
      setSubmitting(false);
    }
  }

  function closeSuccessModal() {
    setShowSuccessModal(false);
  }

  return (
    <Box id="contact" py={{ base: 12, md: 16 }} bg="#f8f7ff">
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }}>
        <VStack align="center" mb={{ base: 10, md: 14 }} gap={0}>
          <Text className="section-title" textAlign="center">
            ติดต่อเรา
          </Text>
          <Box
            width="64px"
            height="3px"
            bg="#e8192c"
            borderRadius="2px"
            mt={3}
          />
          <Text
            color="#748095"
            fontFamily="'Prompt', sans-serif"
            fontSize={{ base: '1rem', md: '1.1rem' }}
            textAlign="center"
            maxW="720px"
            mt={5}
            lineHeight="1.8"
          >
            พร้อมรับฟังและช่วยเหลือคุณ ปรึกษาปัญหาหนี้ฟรี ไม่มีค่าใช้จ่าย
          </Text>
        </VStack>

        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: 8, lg: 12 }}
          align="stretch"
          maxW="1180px"
          mx="auto"
        >
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 2 }}
            gap={5}
            flex="1"
            alignItems="stretch"
          >
            {contactCards.map((item, index) => (
              <Box
                key={item.title}
                gridColumn={{
                  base: 'auto',
                  md: index === 2 ? 'span 2' : 'auto',
                  lg: index === 2 ? 'span 1' : 'auto',
                }}
                bg="rgba(255,255,255,0.82)"
                border="1px solid rgba(26, 5, 51, 0.07)"
                borderRadius="18px"
                p={{ base: 6, md: 7 }}
                minH={{ base: '190px', md: '220px' }}
                boxShadow="0 18px 44px rgba(26, 5, 51, 0.06)"
              >
                <Box
                  w="56px"
                  h="56px"
                  borderRadius="14px"
                  bg={item.bg}
                  color={item.color}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="24px"
                  mb={5}
                >
                  {item.icon}
                </Box>
                <Text
                  color="#1a0533"
                  fontFamily="'Prompt', sans-serif"
                  fontWeight="800"
                  fontSize="1.05rem"
                  mb={3}
                >
                  {item.title}
                </Text>
                <Text
                  color="#1a0533"
                  fontFamily="'Prompt', sans-serif"
                  fontWeight="800"
                  fontSize={{ base: '1.15rem', md: '1.2rem' }}
                  lineHeight="1.55"
                  mb={3}
                >
                  {item.value}
                </Text>
                <Text
                  color="#90a0b8"
                  fontFamily="'Prompt', sans-serif"
                  fontSize="0.95rem"
                  lineHeight="1.65"
                >
                  {item.note}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          <Box
            flex="1.05"
            position="relative"
            overflow="hidden"
            bg="#1f0b4a"
            color="white"
            borderRadius={{ base: '24px', md: '30px' }}
            p={{ base: 6, md: 10 }}
            boxShadow="0 24px 70px rgba(31, 11, 74, 0.18)"
          >
            <Box
              position="absolute"
              width="190px"
              height="190px"
              borderRadius="50%"
              bg="rgba(255,255,255,0.08)"
              right="-58px"
              top="-56px"
            />

            <Box position="relative" zIndex={1}>
              <Text
                fontFamily="'Prompt', sans-serif"
                fontWeight="800"
                fontSize={{ base: '1.35rem', md: '1.55rem' }}
                mb={6}
              >
                ส่งข้อความถึงเรา
              </Text>

              <Form
                form={form}
                layout="vertical"
                initialValues={{ service: '' }}
                onFinish={handleSubmit}
              >
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
                  <Form.Item
                    label={
                      <span className="contact-form-label">
                        ชื่อ-นามสกุล *
                      </span>
                    }
                    name="name"
                    rules={[
                      { required: true, message: 'กรุณากรอกชื่อ-นามสกุล' },
                    ]}
                  >
                    <Input
                      className="contact-dark-input"
                      placeholder="ชื่อของคุณ"
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <span className="contact-form-label">
                        เบอร์โทรศัพท์ *
                      </span>
                    }
                    name="phone"
                    rules={[
                      { required: true, message: 'กรุณากรอกเบอร์โทรศัพท์' },
                    ]}
                  >
                    <Input
                      className="contact-dark-input"
                      placeholder="0XX-XXX-XXXX"
                    />
                  </Form.Item>
                </SimpleGrid>

                <Form.Item
                  label={
                    <span className="contact-form-label">
                      บริการที่สนใจ *
                    </span>
                  }
                  name="service"
                  rules={[{ required: true, message: 'กรุณาเลือกบริการ' }]}
                >
                  <select className="contact-native-select">
                    <option value="" disabled>
                      เลือกบริการ
                    </option>
                    <option value="complaint">แจ้งเรื่องร้องเรียน</option>
                    <option value="information">สอบถามข้อมูล</option>
                    <option value="other">อื่น ๆ</option>
                  </select>
                </Form.Item>

                <Form.Item
                  label={
                    <span className="contact-form-label">รายละเอียด *</span>
                  }
                  name="message"
                  rules={[
                    { required: true, message: 'กรุณากรอกรายละเอียด' },
                  ]}
                >
                  <TextArea
                    className="contact-dark-input contact-dark-textarea"
                    placeholder="อธิบายเรื่องที่ต้องการติดต่อ..."
                    rows={5}
                  />
                </Form.Item>

                {submitMessage && (
                  <Text
                    color="#ffb4b4"
                    fontFamily="'Prompt', sans-serif"
                    fontWeight="600"
                    fontSize="14px"
                    mb={4}
                  >
                    {submitMessage}
                  </Text>
                )}

                <button
                  className="contact-submit-btn"
                  type="submit"
                  disabled={submitting}
                >
                  <SendOutlined />
                  {submitting ? 'กำลังส่ง...' : 'ส่งข้อความ'}
                </button>
              </Form>
            </Box>
          </Box>
        </Flex>
      </Box>

      {showSuccessModal && (
        <div className="contact-success-overlay" role="dialog" aria-modal="true">
          <div className="contact-success-modal">
            <div className="contact-success-icon">
              <CheckCircleFilled />
            </div>
            <h3>ส่งข้อความสำเร็จ</h3>
            <p>
              ทีมงานได้รับข้อความแล้ว และจะติดต่อกลับโดยเร็วที่สุด ขอบคุณครับ
            </p>
            <button
              className="contact-success-button"
              type="button"
              onClick={closeSuccessModal}
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </Box>
  );
}

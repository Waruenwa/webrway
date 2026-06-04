'use client';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

const menuLinks = [
  'หน้าแรก',
  'เกี่ยวกับเรา',
  'ประกาศอัตราดอกเบี้ย',
  'เอกสารการประชุม',
  'การคุ้มครองข้อมูลส่วนบุคคล',
  'ข่าวสารและกิจกรรม',
  'ติดต่อเรา',
];

export default function Footer() {
  return (
    <Box className="footer-bg" pt={16} pb={6}>
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }}>
        <Flex direction={{ base: 'column', lg: 'row' }} gap={12} mb={12}>
          <VStack align="start" flex={1} gap={4}>
            <Box>
              <img src="/logo.png" alt="Hero" className="hero-logo-inline" />
            </Box>
            <Text
              color="rgba(255,255,255,0.5)"
              fontFamily="'Prompt', sans-serif"
              fontSize="14px"
              lineHeight="1.8"
              maxW="280px"
            >
              บริษัท รีโซลูชั่น เวย์ จำกัด
              <br />
              ประกอบธุรกิจสินเชื่อส่วนบุคคลภายใต้การกำกับของธนาคารแห่งประเทศไทยและบริหารจัดการสินทรัพย์ด้อยคุณภาพ
            </Text>
          </VStack>

          <VStack align="start" flex={1} gap={0}>
            <Text
              color="#e8192c"
              fontFamily="'Prompt', sans-serif"
              fontWeight="700"
              fontSize="1rem"
              mb={4}
            >
              เมนู
            </Text>
            <Box
              width="32px"
              height="2px"
              bg="#e8192c"
              borderRadius="2px"
              mb={5}
            />
            {menuLinks.map((link) => (
              <a key={link} href="#" className="footer-link">
                {link}
              </a>
            ))}
          </VStack>

          <VStack align="start" flex={1} gap={0}>
            <Text
              color="#e8192c"
              fontFamily="'Prompt', sans-serif"
              fontWeight="700"
              fontSize="1rem"
              mb={4}
            >
              ติดต่อเรา
            </Text>
            <Box
              width="32px"
              height="2px"
              bg="#e8192c"
              borderRadius="2px"
              mb={5}
            />
            {[
              { icon: '📞', text: '02 821 1055' },
              { icon: '✉️', text: 'rway@rway.co.th' },
              { icon: '💬', text: '@rway' },
            ].map((item, i) => (
              <Box key={i} className="contact-item">
                <Box
                  className="contact-icon"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                  }}
                >
                  {item.icon}
                </Box>
                {item.text}
              </Box>
            ))}
            <Text
              color="rgba(255,255,255,0.5)"
              fontFamily="'Prompt', sans-serif"
              fontSize="13px"
              mt={2}
            >
              วันจันทร์ - วันศุกร์ เวลา 8.30 น. - 17.30 น.
            </Text>
          </VStack>

          <VStack align="start" flex={1} gap={0}>
            <Text
              color="#e8192c"
              fontFamily="'Prompt', sans-serif"
              fontWeight="700"
              fontSize="1rem"
              mb={4}
            >
              ARMA Mobile Application
            </Text>
            <Box
              width="32px"
              height="2px"
              bg="#e8192c"
              borderRadius="2px"
              mb={5}
            />
            <a
              href="https://apps.apple.com/th/app/arma/id6472656294?l=th"
              className="app-store-btn"
              target="_blank"
              rel="noreferrer"
            >
              <AppleOutlined className="app-store-icon" />
              <VStack align="start" gap={0}>
                <Text fontSize="10px" opacity={0.7}>
                  ดาวน์โหลดที่
                </Text>
                <Text fontWeight="700" fontSize="14px">
                  App Store
                </Text>
              </VStack>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.chase.arma&pcampaignid=web_share"
              className="app-store-btn"
              target="_blank"
              rel="noreferrer"
            >
              <AndroidOutlined className="app-store-icon" />
              <VStack align="start" gap={0}>
                <Text fontSize="10px" opacity={0.7}>
                  ดาวน์โหลดที่
                </Text>
                <Text fontWeight="700" fontSize="14px">
                  Google Play
                </Text>
              </VStack>
            </a>
            <Box>
              <img
                src="logoA.png"
                alt="ARMA App"
                style={{ maxWidth: '100%', height: '50px' }}
              />
            </Box>
          </VStack>
        </Flex>

        <Box borderTop="1px solid rgba(255,255,255,0.1)" pt={6}>
          <Text
            textAlign="center"
            color="rgba(255,255,255,0.4)"
            fontFamily="'Prompt', sans-serif"
            fontSize="14px"
          >
            © บริษัท รีโซลูชั่น เวย์ จำกัด สงวนลิขสิทธิ์
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

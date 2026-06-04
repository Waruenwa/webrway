'use client';
import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';

export default function ServicesSection() {
  return (
    <Box id="about" py={{ base: 12, md: 16 }} bg="white">
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }}>
        <VStack align="center" mb={{ base: 10, md: 14 }} gap={0}>
          <Text className="section-title" textAlign="center">
            เกี่ยวกับเรา
          </Text>
          <Box
            width="48px"
            height="3px"
            bg="#e8192c"
            borderRadius="2px"
            mt={3}
          />
          <Text
            color="gray.500"
            fontFamily="'Prompt', sans-serif"
            fontSize="1.05rem"
            textAlign="center"
            maxW="600px"
            mt={4}
            lineHeight="1.8"
          >
            เราพร้อมพร้อมให้บริการรวมลดปลดหนี้ครบวงจร ดูแลคุณตั้งแต่ต้นจนจบ
          </Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          gap={{ base: 8, lg: 14 }}
          alignItems="center"
          maxW="1120px"
          mx="auto"
        >
          <Box
            position="relative"
            overflow="hidden"
            borderRadius={{ base: '24px', md: '30px' }}
            bg="#1f0b4a"
            color="white"
            px={{ base: 6, md: 12 }}
            py={{ base: 10, md: 14 }}
            minH={{ base: '320px', md: '410px' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 24px 70px rgba(31, 11, 74, 0.18)"
          >
            <Box
              position="absolute"
              width="210px"
              height="210px"
              borderRadius="50%"
              bg="rgba(255,255,255,0.08)"
              right="-58px"
              top="-56px"
            />
            <Box
              position="absolute"
              width="190px"
              height="190px"
              borderRadius="50%"
              bg="rgba(232,25,44,0.12)"
              left="-76px"
              bottom="-58px"
            />

            <VStack gap={6} position="relative" zIndex={1} textAlign="center">
              <img
                src="/logo.png"
                alt="RWAY"
                // className="about-card-logo"
                style={{ maxWidth: '100%', height: '32px' }}
              />
              <Text
                fontFamily="'Prompt', sans-serif"
                fontSize={{ base: '1.15rem', md: '1.35rem' }}
                lineHeight="1.9"
                fontWeight="500"
                maxW="520px"
              >
                “เราเชื่อว่าทุกการดูแลทางการเงินควรเริ่มจากความเข้าใจ
                และจบด้วยทางออกที่เหมาะกับคุณ”
              </Text>
              <Box width="74px" height="3px" bg="#e8192c" borderRadius="2px" />
              <Text
                color="#ffb02e"
                fontFamily="'Prompt', sans-serif"
                fontWeight="700"
                fontSize={{ base: '0.95rem', md: '1.05rem' }}
              >
                บริษัท รีโซลูชั่น เวย์ จำกัด
              </Text>
            </VStack>
          </Box>

          <Box>
            <Text
              color="#4b5565"
              fontFamily="'Prompt', sans-serif"
              fontSize={{ base: '1rem', md: '1.15rem' }}
              lineHeight="1.75"
              textAlign={{ base: 'center', lg: 'left' }}
              mb={2}
            >
              บริษัท รีโซลูชั่น เวย์ จำกัด ประกอบธุรกิจสินเชื่อส่วนบุคคล
              ภายใต้การกำกับของธนาคารแห่งประเทศไทย
              และบริหารจัดการสินทรัพย์ด้อยคุณภาพ
            </Text>
            <Flex
              align="center"
              gap={3}
              justify={{ base: 'center', lg: 'flex-start' }}
            >
              <Box
                boxShadow=" rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                p={2}
                borderRadius="8px"
              >
                <img
                  src="logoA.png"
                  alt="ARMA App"
                  style={{ maxWidth: '100%', height: '40px' }}
                />
              </Box>
              <Box
                fontWeight="700"
                color="#1f0b4a"
                fontSize={{ base: '1.15rem', md: '1.25rem' }}
                fontFamily="'Prompt', sans-serif"
              >
                ARMA Mobile Application
              </Box>
            </Flex>

            <Text
              color="#4b5565"
              fontFamily="'Prompt', sans-serif"
              fontSize={{ base: '1rem', md: '1.15rem' }}
              lineHeight="1.75"
              textAlign={{ base: 'center', lg: 'left' }}
              mt={2}
            >
              แอปพลิเคชันที่ลูกค้าสามารถตรวจสอบยอดหนี้ค้างชำระ
              ประวัติการชำระด้วยตนเอง รวมถึงสามารถขอเอกสารต่างๆ เช่น
              หนังสือปิดบัญชี หนังสือเงื่อนไขการชำระ ใบเสร็จรับเงิน
              หรือเอกสารอื่นที่เกี่ยวข้องได้
              มีฟังก์ชั่นแชทที่สามารถโต้ตอบกับเจ้าหน้าที่ได้
              ลูกค้าสามารถดาวน์โหลดติดตั้งได้ทั้งระบบ iOS และ Android
            </Text>

            {/* <VStack align="stretch" gap={4}>
              {highlights.map((item) => (
                <HStack key={item} align="flex-start" gap={3}>
                  <Box color="#e8192c" fontSize="18px" mt="2px">
                    <CheckCircleFilled />
                  </Box>
                  <Text
                    color="#4b5565"
                    fontFamily="'Prompt', sans-serif"
                    fontSize={{ base: '0.98rem', md: '1rem' }}
                    lineHeight="1.7"
                  >
                    {item}
                  </Text>
                </HStack>
              ))}
            </VStack> */}
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

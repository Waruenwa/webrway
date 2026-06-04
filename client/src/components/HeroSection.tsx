'use client';
import { Box, Flex, Text, VStack, HStack } from '@chakra-ui/react';
import { scrollToSection } from '@/lib/scrollToSection';

export default function HeroSection() {
  function scrollToContact() {
    scrollToSection('contact');
  }

  return (
    <Box className="hero-section" id="home" pt="80px">
      <Box
        className="hero-content"
        maxW="1100px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 16, md: 24 }}
        position="relative"
        zIndex={2}
      >
        <Flex direction="column" align="center" justify="center">
          <VStack align="center" gap={0} textAlign="center">
            <Flex align="center" justify="center" gap={{ base: 2, md: 4 }} flexWrap="wrap">
              <Text
                className="animate-in animate-delay-2"
                fontFamily="'Prompt', sans-serif"
                fontSize={{ base: 'clamp(1.75rem, 8.8vw, 2.35rem)', md: '3.2rem' }}
                fontWeight="800"
                color="white"
                lineHeight="1.1"
                // mt={4}
                mb={2}
              >
                ยินดีต้อนรับสู่
              </Text>
              <Box>
                <img src="/logo.png" alt="Hero" className="hero-logo-inline" />
              </Box>
            </Flex>

            {/* <Text
              className="animate-in animate-delay-2"
              fontFamily="'Prompt', sans-serif"
              fontSize={{ base: '2.8rem', lg: '4.5rem' }}
              fontWeight="900"
              lineHeight="1.0"
              mb={6}
            >
              <Box as="span" color="white">
                RW
              </Box>
              <Box as="span" color="#e8192c">
                ∧
              </Box>
              <Box as="span" color="white">
                Y
              </Box>
            </Text> */}

            <Text
              className="animate-in animate-delay-3"
              color="rgba(255,255,255,0.9)"
              fontSize={{ base: '1rem', lg: '1.2rem' }}
              fontFamily="'Prompt', sans-serif"
              lineHeight="1.8"
              maxW="760px"
              mb={8}
            >
              บริษัท รีโซลูชั่น เวย์ จำกัด ประกอบธุรกิจสินเชื่อ
              ส่วนบุคคลภายใต้การกำกับของธนาคารแห่งประเทศไทยและบริหารจัดการสินทรัพย์ด้อยคุณภาพ
            </Text>

            <HStack
              gap={4}
              className="animate-in animate-delay-4"
              flexWrap="wrap"
              justify="center"
              w="100%"
            >
              <button className="interest-badge" type="button" onClick={scrollToContact}>
                ติดต่อเรา
              </button>
              {/* <button className="outline-btn">เรียนรู้เพิ่มเติม</button> */}
            </HStack>
          </VStack>
        </Flex>
      </Box>

      <Box className="hero-wave" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 L0,40 Q360,0 720,40 Q1080,80 1440,40 L1440,80 Z"
            fill="white"
          />
        </svg>
      </Box>
    </Box>
  );
}

'use client';
import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FilePdfOutlined } from '@ant-design/icons';

const pdpaDocs = [
  'นโยบายคุ้มครองข้อมูลส่วนบุคคล',
  'ประกาศความเป็นส่วนตัวสำหรับลูกหนี้',
  'ประกาศความเป็นส่วนตัวสำหรับผู้โอนสินทรัพย์ด้อยคุณภาพ',
  'ประกาศความเป็นส่วนตัวสำหรับผู้ขอสินเชื่อส่วนบุคคล',
  'ประกาศความเป็นส่วนตัวสำหรับผู้เข้ามาภายในพื้นที่ของกลุ่มบริษัทฯ',
];

export default function PdpaSection() {
  return (
    <Box id="pdpa" py={{ base: 12, md: 16 }} bg="#f8f7ff">
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }}>
        <VStack align="center" mb={{ base: 9, md: 12 }} gap={0}>
          <Text className="section-title" textAlign="center">
            การคุ้มครองข้อมูลส่วนบุคคล
          </Text>
          <Box
            width="64px"
            height="3px"
            bg="#e8192c"
            borderRadius="2px"
            mt={3}
          />
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3 }}
          gap={{ base: 5, md: 6 }}
          maxW="1180px"
          mx="auto"
        >
          {pdpaDocs.map((title) => (
            <Box
              key={title}
              bg="white"
              borderRadius="8px"
              px={{ base: 5, md: 7 }}
              py={{ base: 6, md: 7 }}
              minH={{ base: '112px', md: '120px' }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={5}
              boxShadow="0 14px 34px rgba(26, 5, 51, 0.08)"
              border="1px solid rgba(26, 5, 51, 0.05)"
              transition="all 0.2s ease"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 18px 42px rgba(26, 5, 51, 0.11)',
              }}
            >
              <Text
                as="span"
                color="#0b6cff"
                fontFamily="'Prompt', sans-serif"
                fontSize={{ base: '1.02rem', md: '1.1rem' }}
                fontWeight="500"
                lineHeight="1.65"
                textDecoration="underline"
                textUnderlineOffset="3px"
              >
                {title}
              </Text>
              <Box
                color="#e8192c"
                fontSize={{ base: '34px', md: '40px' }}
                flexShrink={0}
                lineHeight={1}
              >
                <FilePdfOutlined />
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

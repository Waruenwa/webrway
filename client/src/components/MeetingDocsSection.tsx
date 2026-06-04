'use client';
import { Box, Text, VStack, chakra } from '@chakra-ui/react';
import { FilePdfOutlined } from '@ant-design/icons';

const meetingDocs = [
  {
    title:
      'หนังสือเชิญประชุมสามัญผู้ถือหุ้นประจำปี 2569 (เผยแพร่ เมื่อวันที่ 22 เมษายน 2569)',
    href: '/docs/meetings/agm-2569-notice.pdf',
  },
];

export default function MeetingDocsSection() {
  return (
    <Box id="docs" py={{ base: 12, md: 16 }} bg="white">
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }}>
        <VStack align="center" mb={{ base: 9, md: 12 }} gap={0}>
          <Text className="section-title" textAlign="center">
            เอกสารการประชุม
          </Text>
          <Box
            width="64px"
            height="3px"
            bg="#e8192c"
            borderRadius="2px"
            mt={3}
          />
        </VStack>

        <Box maxW="1180px" mx="auto">
          {meetingDocs.map((doc) => (
            <chakra.a
              key={doc.href}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={{ base: 5, md: 8 }}
              bg="white"
              borderRadius="8px"
              px={{ base: 5, md: 8 }}
              py={{ base: 6, md: 8 }}
              boxShadow="0 16px 42px rgba(26, 5, 51, 0.09)"
              border="1px solid rgba(26, 5, 51, 0.06)"
              textDecoration="none"
              transition="all 0.2s ease"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 20px 52px rgba(26, 5, 51, 0.12)',
              }}
            >
              <Text
                color="#0b6cff"
                fontFamily="'Prompt', sans-serif"
                fontSize={{ base: '1.05rem', md: '1.25rem' }}
                fontWeight="600"
                lineHeight="1.7"
                textDecoration="underline"
                textUnderlineOffset="3px"
              >
                {doc.title}
              </Text>
              <Box
                color="#e8192c"
                fontSize={{ base: '34px', md: '44px' }}
                flexShrink={0}
                lineHeight={1}
              >
                <FilePdfOutlined />
              </Box>
            </chakra.a>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

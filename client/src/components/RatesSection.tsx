'use client';
import { useState } from 'react';
import { Box, Text, VStack, chakra } from '@chakra-ui/react';
import { DownOutlined, FilePdfOutlined } from '@ant-design/icons';

const rateDocs = [
  {
    title:
      'ประกาศอัตราดอกเบี้ย ค่าปรับ ค่าบริการ ค่าธรรมเนียมใด ๆ และค่าใช้จ่าย ณ วันที่ 30 กรกฎาคม 2568',
    href: '/docs/rates/rate-2025-07-30.pdf',
  },
  {
    title:
      'ประกาศอัตราดอกเบี้ย ค่าปรับ ค่าบริการ ค่าธรรมเนียมใด ๆ และค่าใช้จ่าย ณ วันที่ 1 กุมภาพันธ์ 2568',
    href: '/docs/rates/rate-2025-02-01.pdf',
  },
  {
    title:
      'ประกาศอัตราดอกเบี้ย ค่าปรับ ค่าบริการ ค่าธรรมเนียมใด ๆ และค่าใช้จ่าย ณ วันที่ 1 ตุลาคม 2567',
    href: '/docs/rates/rate-2024-10-01.pdf',
  },
  {
    title:
      'ประกาศอัตราดอกเบี้ย ค่าปรับ ค่าบริการ ค่าธรรมเนียมใด ๆ และค่าใช้จ่าย ณ วันที่ 1 เมษายน 2564',
    href: '/docs/rates/rate-2021-04-01.pdf',
  },
  {
    title:
      'ประกาศอัตราดอกเบี้ย ค่าปรับ ค่าบริการ ค่าธรรมเนียมใด ๆ และค่าใช้จ่าย ณ วันที่ 1 สิงหาคม 2563',
    href: '/docs/rates/rate-2020-08-01.pdf',
  },
  {
    title:
      'ประกาศอัตราดอกเบี้ย ค่าปรับ ค่าบริการ ค่าธรรมเนียมใด ๆ และค่าใช้จ่าย ณ วันที่ 23 มิถุนายน 2558',
    href: '/docs/rates/rate-2015-06-23.pdf',
  },
  {
    title:
      'ประกาศอัตราดอกเบี้ย ค่าปรับ ค่าบริการ ค่าธรรมเนียมใด ๆ และค่าใช้จ่าย ณ วันที่ 14 กุมภาพันธ์ 2556',
    href: '/docs/rates/rate-2013-02-14.pdf',
  },
];

export default function RatesSection() {
  const latestDoc = rateDocs[0];
  const [open, setOpen] = useState(false);

  return (
    <Box id="rates" py={{ base: 12, md: 16 }} bg="#f8f7ff">
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }}>
        <VStack align="center" mb={{ base: 9, md: 12 }} gap={0}>
          <Text className="section-title" textAlign="center">
            ประกาศอัตราดอกเบี้ย
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
          <chakra.a
            href={latestDoc.href}
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
            mb={{ base: 7, md: 8 }}
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
              color="#1F0B4A"
              fontFamily="'Prompt', sans-serif"
              fontSize={{ base: '1.05rem', md: '1.25rem' }}
              fontWeight="600"
              lineHeight="1.7"
              textDecoration="underline"
              textUnderlineOffset="3px"
            >
              {latestDoc.title}
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

          <Box position="relative" display="inline-block" maxW="100%">
            <chakra.button
              type="button"
              display="flex"
              alignItems="center"
              bg="#1F0B4A"
              color="white"
              border="none"
              borderRadius="6px"
              px={5}
              py={3}
              gap={3}
              fontFamily="'Prompt', sans-serif"
              fontSize="0.95rem"
              fontWeight="600"
              cursor="pointer"
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
            >
              <Text>ประกาศอัตราดอกเบี้ย</Text>
              <DownOutlined
                style={{
                  fontSize: '12px',
                  transition: 'transform 0.2s ease',
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </chakra.button>

            {open && (
              <VStack
                align="stretch"
                gap={0}
                position="absolute"
                top="calc(100% + 4px)"
                left={0}
                zIndex={20}
                border="1px solid #d6d6dc"
                borderRadius="4px"
                overflow="hidden"
                w={{ base: 'calc(100vw - 32px)', md: '780px' }}
                maxW="calc(100vw - 32px)"
                bg="white"
                boxShadow="0 18px 44px rgba(26, 5, 51, 0.12)"
              >
                {rateDocs.slice(1).map((doc) => (
                  <chakra.a
                    key={doc.href}
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={4}
                    px={{ base: 4, md: 5 }}
                    py={{ base: 3, md: 3.5 }}
                    color="#252833"
                    textDecoration="none"
                    borderTop="1px solid #eeeeee"
                    transition="background 0.2s ease"
                    _first={{ borderTop: 'none' }}
                    _hover={{ bg: '#fafafa' }}
                    onClick={() => setOpen(false)}
                  >
                    <Text
                      fontFamily="'Prompt', sans-serif"
                      fontSize={{ base: '0.95rem', md: '1rem' }}
                      lineHeight="1.6"
                    >
                      {doc.title}
                    </Text>
                    <Box color="#e8192c" fontSize="24px" flexShrink={0}>
                      <FilePdfOutlined />
                    </Box>
                  </chakra.a>
                ))}
              </VStack>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

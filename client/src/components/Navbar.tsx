'use client';
import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Flex, Text, chakra } from '@chakra-ui/react';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { scrollToSection } from '@/lib/scrollToSection';

const navItems = [
  { label: 'หน้าแรก', href: '/#home' },
  { label: 'เกี่ยวกับเรา', href: '/#about' },
  { label: 'แบบฟอร์มชำระเงิน', href: '/payment' },
  { label: 'ประกาศอัตราดอกเบี้ย', href: '/#rates' },
  { label: 'เอกสารการประชุม', href: '/#docs' },
  { label: 'การคุ้มครองข้อมูลส่วนบุคคล', href: '/#pdpa' },
  { label: 'ข่าวสารและกิจกรรม', href: '/#news' },
  { label: 'ติดต่อเรา', href: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function getSectionId(href: string) {
    return href.startsWith('/#') ? href.slice(2) : null;
  }

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const sectionId = getSectionId(href);

    if (!sectionId) {
      setOpen(false);
      return;
    }

    event.preventDefault();
    setOpen(false);

    if (pathname !== '/') {
      router.push(href);
      return;
    }

    scrollToSection(sectionId);
  }

  useEffect(() => {
    if (pathname !== '/') return;

    const sectionId = window.location.hash.replace('#', '');
    if (!sectionId) return;

    const timer = window.setTimeout(() => {
      scrollToSection(sectionId, { updateHash: false });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <Box className="navbar" py={3}>
        <Box maxW="1400px" mx="auto" px={{ base: 4, md: 6 }}>
          <Flex align="center" justify="space-between">
            <Box>
              <img src="/logo.png" alt="Logo" style={{ height: '30px' }} />
            </Box>
            <Flex gap={1} display={{ base: 'none', xl: 'flex' }}>
              {navItems.map((item) => (
                <chakra.a
                  key={item.label}
                  href={item.href}
                  className="nav-link"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  onClick={(event) => handleNavClick(event, item.href)}
                >
                  {item.label}
                </chakra.a>
              ))}
            </Flex>
            <Box
              display={{ base: 'flex', xl: 'none' }}
              as="button"
              onClick={() => setOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              <MenuOutlined />
            </Box>
          </Flex>
        </Box>
      </Box>

      {open && (
        <Box position="fixed" inset={0} zIndex={2000} display="flex">
          <Box
            position="absolute"
            inset={0}
            bg="rgba(0,0,0,0.5)"
            onClick={() => setOpen(false)}
          />
          <Box
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            w="280px"
            bg="#1a0533"
            p={6}
            overflowY="auto"
          >
            <Flex justify="space-between" align="center" mb={8}>
              <Text
                fontFamily="'Prompt', sans-serif"
                fontWeight="700"
                color="white"
                fontSize="1.2rem"
              >
                เมนู
              </Text>
              <Box
                as="button"
                onClick={() => setOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              >
                <CloseOutlined />
              </Box>
            </Flex>
            {navItems.map((item) => (
              <chakra.a
                key={item.label}
                href={item.href}
                display="block"
                color="rgba(255,255,255,0.8)"
                fontFamily="'Prompt', sans-serif"
                fontSize="15px"
                py={3}
                borderBottom="1px solid rgba(255,255,255,0.08)"
                onClick={(event) => handleNavClick(event, item.href)}
              >
                {item.label}
              </chakra.a>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}

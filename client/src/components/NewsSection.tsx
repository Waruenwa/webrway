'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { ArrowRightOutlined, CalendarOutlined } from '@ant-design/icons';
import type { ActivityItem } from '@/data/news';

type ActivityListResponse = {
  data?: ActivityItem[];
};

export default function NewsSection() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadActivities() {
      try {
        const response = await fetch('/api/activities');
        const payload = (await response.json()) as ActivityListResponse;

        if (active) {
          setActivities(payload.data ?? []);
        }
      } catch {
        if (active) {
          setActivities([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Box id="news" py={20} bg="white">
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8 }}>
        <Flex justify="center" align="center" mb={10} flexWrap="wrap" gap={4}>
          <VStack align="center" gap={0}>
            <Text className="section-title">ข่าวสารและกิจกรรม</Text>
            <Box className="divider-red" />
          </VStack>
        </Flex>

        {loading ? (
          <Text
            color="gray.500"
            fontFamily="'Prompt', sans-serif"
            textAlign="center"
          >
            กำลังโหลดข่าวสาร...
          </Text>
        ) : activities.length === 0 ? (
          <Text
            color="gray.500"
            fontFamily="'Prompt', sans-serif"
            textAlign="center"
          >
            ยังไม่มีข่าวสารและกิจกรรม
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {activities.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="news-card-link"
                aria-label={`อ่านรายละเอียด ${item.title}`}
              >
                <Box className="news-card" cursor="pointer" h="100%">
                  <Box
                    h="160px"
                    position="relative"
                    style={{
                      background: item.imageUrl
                        ? `url("${item.imageUrl}") center / cover no-repeat`
                        : `linear-gradient(135deg, ${item.color}, #6b35c8)`,
                    }}
                  >
                    <Box position="absolute" bottom={4} left={4}>
                      <Box className="news-date-badge">{item.category}</Box>
                    </Box>
                  </Box>
                  <Box p={6}>
                    <Flex
                      align="center"
                      gap={2}
                      color="gray.400"
                      fontFamily="'Prompt', sans-serif"
                      fontSize="13px"
                      mb={3}
                    >
                      <CalendarOutlined /> {item.date}
                    </Flex>
                    <Text
                      fontFamily="'Prompt', sans-serif"
                      fontWeight="700"
                      fontSize="1.05rem"
                      color="#1a0533"
                      mb={3}
                      lineHeight="1.5"
                    >
                      {item.title}
                    </Text>
                    <Text
                      color="gray.500"
                      fontFamily="'Prompt', sans-serif"
                      fontSize="14px"
                      lineHeight="1.7"
                    >
                      {item.desc}
                    </Text>
                    <Flex
                      align="center"
                      gap={2}
                      mt={4}
                      color="#e8192c"
                      fontFamily="'Prompt', sans-serif"
                      fontSize="14px"
                      fontWeight="600"
                    >
                      อ่านเพิ่มเติม <ArrowRightOutlined />
                    </Flex>
                  </Box>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}

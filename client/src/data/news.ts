export type ActivityApiItem = {
  _id: string;
  image?: string;
  title_pro?: string;
  content_pro?: string;
  type_image?: string;
  status?: string;
  date_noty?: MongoDateValue;
  createdAt?: string;
  updatedAt?: string;
};

type MongoDateValue =
  | string
  | {
      $date?: string;
    };

export type ActivityItem = {
  id: string;
  date: string;
  category: string;
  title: string;
  desc: string;
  content: string[];
  imageUrl?: string;
  color: string;
};

const ACTIVITY_API_BASE = 'https://www.cfasia.co.th/backend-mobile';
const ACTIVITY_IMAGE_BASE =
  'https://www.cfasia.co.th/backend-mobile/public/image';

const cardColors = ['#2d0a5e', '#3d1278', '#4a1a8c', '#4a1d95'];

type ActivityListResponse = {
  data?: ActivityApiItem[];
};

type ActivityDetailResponse = {
  data?: ActivityApiItem;
};

export async function fetchActivities() {
  const response = await fetch(`${ACTIVITY_API_BASE}/activity`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Activity list request failed: ${response.status}`);
  }

  const payload = (await response.json()) as ActivityListResponse;

  return (payload.data ?? [])
    .filter((item) => item.status !== 'OFF')
    .map((item, index) => mapActivity(item, index));
}

export async function fetchActivityById(id: string) {
  const response = await fetch(
    `${ACTIVITY_API_BASE}/activity/${encodeURIComponent(id)}`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as ActivityDetailResponse;
  return payload.data ? mapActivity(payload.data, 0) : null;
}

export function mapActivity(item: ActivityApiItem, index: number): ActivityItem {
  const content = item.content_pro?.trim() ?? '';

  return {
    id: item._id,
    date: formatThaiDate(getDateValue(item.date_noty) ?? item.createdAt),
    category: getActivityCategory(item),
    title: item.title_pro?.trim() || 'ข่าวสารและกิจกรรม',
    desc: truncateText(content, 118),
    content: splitContent(content),
    imageUrl: getActivityImageUrl(item.image),
    color: cardColors[index % cardColors.length],
  };
}

function getDateValue(value?: MongoDateValue) {
  if (!value) {
    return undefined;
  }

  if (typeof value === 'string') {
    return value;
  }

  return value.$date;
}

function getActivityImageUrl(fileName?: string) {
  if (!fileName) {
    return undefined;
  }

  return `${ACTIVITY_IMAGE_BASE}/${encodeURIComponent(fileName)}`;
}

function getActivityCategory(item: ActivityApiItem) {
  const title = item.title_pro ?? '';

  if (title.includes('แจ้ง') || title.includes('ประกาศ')) {
    return 'ประกาศ';
  }

  if (title.includes('กิจกรรม') || title.includes('มหกรรม')) {
    return 'กิจกรรม';
  }

  return 'ข่าวสาร';
}

function splitContent(content: string) {
  if (!content) {
    return ['รายละเอียดเพิ่มเติมจะแสดงจาก API เมื่อมีข้อมูล'];
  }

  return content
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trim()}...`;
}

function formatThaiDate(dateString?: string) {
  if (!dateString) {
    return '-';
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('th-TH', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

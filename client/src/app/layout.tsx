import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import BackToTopButton from '@/components/BackToTopButton';
import CookieConsentBanner from '@/components/CookieConsentBanner';

export const metadata: Metadata = {
  title: 'RWAY - บริษัท รีโซลูชั่น เวย์ จำกัด',
  description:
    'ประกอบธุรกิจสินเชื่อส่วนบุคคลภายใต้การกำกับของธนาคารแห่งประเทศไทยและบริหารจัดการสินทรัพย์ด้อยคุณภาพ',
  icons: {
    icon: '/headicon.png',
    shortcut: '/headicon.png',
    apple: '/headicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
          <CookieConsentBanner />
          <BackToTopButton />
        </Providers>
      </body>
    </html>
  );
}

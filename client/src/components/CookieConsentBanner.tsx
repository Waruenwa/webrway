'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'rway-cookie-consent-date';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const acceptedDate = window.localStorage.getItem(STORAGE_KEY);
      const shouldShow = acceptedDate !== getTodayKey();
      setVisible(shouldShow);
      document.body.classList.toggle('has-cookie-consent', shouldShow);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove('has-cookie-consent');
    };
  }, []);

  function handleAccept() {
    window.localStorage.setItem(STORAGE_KEY, getTodayKey());
    document.body.classList.remove('has-cookie-consent');
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      className="cookie-consent-banner"
      role="region"
      aria-label="Cookie notice"
    >
      <div className="cookie-consent-inner">
        <p className="cookie-consent-text">
          เว็บไซต์นี้มีการจัดเก็บคุกกี้เพื่อเพิ่มประสิทธิภาพในการใช้งานของท่าน
          และการมอบบริการที่ดีที่สุดจากเรา กรุณากดยอมรับเพื่อใช้งานต่อ
          สามารถอ่านรายละเอียดเพิ่มเติมได้ที่{' '}
          <a
            href="https://www.courts.co.th/20250627-chase-notice-cookies-th.pdf"
            className="cookie-consent-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            นโยบายการใช้คุกกี้
          </a>
        </p>
        <button
          className="cookie-consent-button"
          type="button"
          onClick={handleAccept}
          color="red"
        >
          ยอมรับ
        </button>
      </div>
    </div>
  );
}

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

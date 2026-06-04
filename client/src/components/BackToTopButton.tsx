'use client';

import { useEffect, useState } from 'react';
import { UpOutlined } from '@ant-design/icons';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 420);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      className={`back-to-top-button${visible ? ' is-visible' : ''}`}
      type="button"
      aria-label="กลับขึ้นด้านบน"
      onClick={scrollToTop}
    >
      <UpOutlined />
    </button>
  );
}

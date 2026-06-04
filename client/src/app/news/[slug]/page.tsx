import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchActivityById } from '@/data/news';

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchActivityById(slug);

  if (!item) {
    return {
      title: 'ข่าวสารและกิจกรรม | RWAY',
    };
  }

  return {
    title: `${item.title} | RWAY`,
    description: item.desc,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const item = await fetchActivityById(slug);

  if (!item) {
    notFound();
  }

  return (
    <main>
      <Navbar />
      <article className="news-detail-page">
        <div className="news-detail-container">
          <p className="news-detail-category">{item.category}</p>
          <h1 className="news-detail-title">{item.title}</h1>
          <p className="news-detail-date">{item.date}</p>

          {item.imageUrl && (
            <Image
              className="news-detail-image"
              src={item.imageUrl}
              alt={item.title}
              width={1000}
              height={500}
              sizes="(max-width: 768px) 100vw, 1000px"
            />
          )}

          <div className="news-detail-content">
            {item.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}

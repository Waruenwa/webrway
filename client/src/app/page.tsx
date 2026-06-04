import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import RatesSection from '@/components/RatesSection'
import MeetingDocsSection from '@/components/MeetingDocsSection'
import PdpaSection from '@/components/PdpaSection'
import NewsSection from '@/components/NewsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <RatesSection />
      <MeetingDocsSection />
      <PdpaSection />
      <NewsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

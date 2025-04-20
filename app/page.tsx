import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import KeyFacts from "@/components/key-facts"
import BusinessSectors from "@/components/business-sectors"
import WhoWeAre from "@/components/who-we-are"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WhoWeAre />
      <KeyFacts />
      <BusinessSectors />
      <Footer />
    </main>
  )
}

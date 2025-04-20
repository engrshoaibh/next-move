import type { Metadata } from "next"
import ContactForm from "./contact-form"
import ContactInfo from "./contact-info"
import Map from "./map"
import Navbar from "@/components/navbar"

export const metadata: Metadata = {
  title: "Contact Us | NEXT MOVE",
  description:
    "Get in touch with NEXT MOVE. We're here to help with your inquiries and provide the information you need.",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-primary/90 to-primary">
      <div className="container mx-auto pt-24 pb-16 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Have questions or want to discuss how we can help your business? Our team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-8">
          <ContactInfo />
          <ContactForm />
        </div>

        <div className="mt-16">
          <Map />
        </div>
      </div>
    </div>
    </>
  )
}

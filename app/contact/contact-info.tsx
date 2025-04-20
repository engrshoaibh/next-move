import { MapPin, Phone, Mail, Clock, Linkedin, Facebook, Twitter, Instagram } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function ContactInfo() {
  return (
    <Card className="border-none shadow-2xl bg-white/10 backdrop-blur-md text-white h-full">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">NEXT MOVE</h2>
          <p className="text-gray-200 mb-6">
            We're dedicated to helping businesses reach their full potential through innovative solutions and strategic
            planning.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start">
            <MapPin className="h-6 w-6 mr-4 text-white/80 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Our Location</h3>
              <p className="text-gray-200">
                1234 Business Avenue
                <br />
                Suite 500
                <br />
                New York, NY 10001
                <br />
                United States
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Phone className="h-6 w-6 mr-4 text-white/80 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Phone</h3>
              <p className="text-gray-200">
                <a href="tel:+12125551234" className="hover:text-white transition-colors">
                  +1 (212) 555-1234
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="h-6 w-6 mr-4 text-white/80 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Email</h3>
              <p className="text-gray-200">
                <a href="mailto:info@nextmove.com" className="hover:text-white transition-colors">
                  info@nextmove.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="h-6 w-6 mr-4 text-white/80 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
              <p className="text-gray-200">
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 2:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

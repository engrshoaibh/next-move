export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Next Move Group of Companies</h3>
            <p className="text-gray-300">
              A leading investment company with diverse business sectors across the globe.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#who-we-are" className="text-gray-300 hover:text-white transition-colors">
                  Who We Are
                </a>
              </li>
              <li>
                <a href="#business-sectors" className="text-gray-300 hover:text-white transition-colors">
                  Business Sectors
                </a>
              </li>
              <li>
                <a href="#careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact-us" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <address className="not-italic text-gray-300">
              <p>Dubai, UAE</p>
              <p className="mt-2">Email: info@nextmovegroup.com</p>
              <p className="mt-2">Phone: +971 4 123 4567</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Next Move Group of Companies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

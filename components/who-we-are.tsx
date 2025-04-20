"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Who We Are
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-primary mb-4">A Leading Investment Company</h3>
            <p className="text-gray-700 mb-6">
              Next Move Group of Companies is one of the largest private investment groups in the Middle East, with
              investments spanning across various sectors including telecommunications, banking, real estate,
              hospitality, energy, construction, and more.
            </p>
            <p className="text-gray-700">
              With a heritage dating back to 1974, we have established ourselves as a trusted partner for businesses
              across the globe, from North America to North Africa, Europe, and South Asia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src="https://res.cloudinary.com/db8d9l4jw/image/upload/v1745060003/Middle_East_Cityscape_at_Dusk_gao2zj.png"
              alt="Next Move Group of Companies Headquarters"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

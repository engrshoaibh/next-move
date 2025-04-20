// This file ensures GSAP is properly imported and configured
import { gsap } from "gsap"

// Export GSAP for use in components
export { gsap }

// Optional: Configure GSAP defaults
gsap.defaults({
  ease: "power2.out",
  duration: 0.5,
})

// Export any additional GSAP plugins you might need
export default gsap

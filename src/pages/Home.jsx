import Hero from '../sections/Hero'
import ServicesTeaser from '../sections/ServicesTeaser'
import Shipment from '../sections/Shipment'
import Packages from '../sections/Packages'
import CaseStudy from '../sections/CaseStudy'
import Compliance from '../sections/Compliance'
import Contact from '../sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesTeaser />
      <Shipment />
      <Packages />
      <CaseStudy />
      <Compliance />
      <Contact />
    </>
  )
}

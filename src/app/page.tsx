import Hero from "../components/Hero";
import UseCases from "../components/UseCases";
import BentoGrid from "../components/BentoGrid";
import FeaturedCollection from "../components/FeaturedCollection";
import Footer from "../components/Footer";
// import ComingSoon from "@/components/ComingSoon";

export default function Home() {
  return (
    <main className="bg-wood-bg w-full relative">
      {/* <ComingSoon /> */}
      <Hero />
      <UseCases />
      <FeaturedCollection />
      <BentoGrid />
      <Footer />
    </main>
  );
}

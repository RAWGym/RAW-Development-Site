import { AudienceProvider } from "@/components/audience";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Services } from "@/components/home/services";
import { Work } from "@/components/home/work";
import { Personal } from "@/components/home/personal";
import { Numbers } from "@/components/home/numbers";
import { Process } from "@/components/home/process";
import { Pedantry } from "@/components/home/pedantry";
import { Testimonials } from "@/components/home/testimonials";
import { FinalCta } from "@/components/home/final-cta";

export default function Home() {
  return (
    <AudienceProvider>
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Personal />
      <Numbers />
      <Process />
      <Pedantry />
      <Testimonials />
      <FinalCta />
    </AudienceProvider>
  );
}

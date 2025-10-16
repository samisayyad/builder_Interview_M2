import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Domains } from "@/components/landing/Domains";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Index() {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <Features />
      <Domains />
      <CTA />
      <Footer />
    </div>
  );
}

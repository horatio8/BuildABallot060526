import { TopBanner } from "@/components/TopBanner";
import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BigStatementSection } from "@/components/BigStatementSection";
import { ThreeColumnSection } from "@/components/ThreeColumnSection";
import { FaqSection } from "@/components/FaqSection";
import { FundedByYouSection } from "@/components/FundedByYouSection";
import { SignupSection } from "@/components/SignupSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopBanner />
      <NavBar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <BigStatementSection />
        <ThreeColumnSection />
        <FaqSection />
        <FundedByYouSection />
        <SignupSection />
      </main>
      <Footer />
    </>
  );
}

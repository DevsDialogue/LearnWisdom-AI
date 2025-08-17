// import { ModernNavbar } from "@/components/ModernNavbar";
import { ModernHeroSection } from "@/components/ModernHeroSection";
import { TrustSection } from "@/components/TrustSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AutomationSection } from "@/components/AutomationSection";
import { FAQSection } from "@/components/FAQSection";
import { ModernFooter } from "@/components/ModernFooter";

export default function Home() {
  return (
    <>
      {/* <ModernNavbar /> */}
      <main>
        <ModernHeroSection />
        <TrustSection />
        <FeaturesSection />
        <AutomationSection />
        <FAQSection />
      </main>
      <ModernFooter />
    </>
  );
}

import {
  CTA,
  DashboardPreview,
  Features,
  Footer,
  Hero,
  Navbar,
} from "@/components/landing";

export default function Landing() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#09090B] text-[#FAFAFA] antialiased">
      <Navbar />

      <main className="flex flex-1 flex-col">
        <Hero />
        <Features />
        <DashboardPreview />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

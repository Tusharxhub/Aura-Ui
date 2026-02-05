import { Hero } from "@/components/landing/hero";
import { LivePreview } from "@/components/landing/live-preview";
import { Features } from "@/components/landing/features";
import { Showcase } from "@/components/landing/showcase";
import { Philosophy } from "@/components/landing/philosophy";
import { GetStarted } from "@/components/landing/get-started";

export default function Home() {
  return (
    <>
      <Hero />
      <LivePreview />
      <Features />
      <Showcase />
      <Philosophy />
      <GetStarted />
    </>
  );
}

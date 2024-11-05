import { Logo } from "@/assets/Logo";
import { Button } from "@/components/ui";
import Navbar from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <HeroSection/>
    </div>
  );
}

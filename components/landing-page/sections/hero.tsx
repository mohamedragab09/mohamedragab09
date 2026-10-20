import { Mail } from "lucide-react";
import AnimatedBtn from "../ui/AnimatedBTN";
import HeroCardDetails from "../ui/hero-card";
import HeroDetails from "../ui/hero-details";

export default function Hero() {
  return (
    <section id="hero" className="w-full flex flex-col items-center align-middle">
      <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-center lg:gap-10">
        <div className="w-full max-w-sm shrink-0 lg:w-auto">
          <HeroCardDetails />
        </div>

        <div className="w-full min-w-0 flex-1">
          <HeroDetails />
        </div>
      </div>

      <div className="my-2">
        <AnimatedBtn
          href="#contact"
          icon={<Mail />}
          lable="Let's Talk"
        />
      </div>
    </section>
  );
}
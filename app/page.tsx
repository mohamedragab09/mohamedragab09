import Background from "@/components/landing-page/ui/background";
import Navbar from "@/components/landing-page/sections/side-nav";
import Header from "@/components/landing-page/sections/header";
import Hero from "@/components/landing-page/sections/hero";
import About from "@/components/landing-page/sections/about";
import Skills from "@/components/landing-page/sections/skills";
import Works from "@/components/landing-page/sections/exprience";
import Contact from "@/components/landing-page/sections/contact";
import Footer from "@/components/landing-page/sections/footer";

export default function Page() {
    return (
        <>
            <div className="pointer-events-none fixed inset-0 -z-10">
                <Background />
            </div>

            <Header />

            <main className="px-[4%] md:px-[8%] grid gap-y-12 py-12">
                <Navbar />
                <Hero />
                <About />
                <Skills />
                <Works />
                <Contact />
            </main>
            
            <Footer />
        </>
    );
}
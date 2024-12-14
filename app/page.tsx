import { Hero } from "@/components/hero";
import Services from "@/components/services";
import SocialProof from "@/components/socialproof";
import VideoTestimonials from "@/components/testimonials";
import Network from "@/components/network";
import Contact from "@/components/contact";
import CallToAction from "@/components/call-to-action";
import FAQ from "@/components/faq";

export default function Home() {
    return (
        <>
            <Hero />
            <Services />
            <SocialProof />
            <VideoTestimonials />
            <Network />
            <Contact />
            <CallToAction />
            <FAQ />
        </>
    );
}

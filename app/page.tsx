import Hero from "@/components/hero";
import Services from "@/components/services";
import SocialProof from "@/components/socialproof";
import VideoTestimonials from "@/components/testimonials";
import AlumniNetwork from "@/components/alumni-network";
import ContactUs from "@/components/contact-us";
import CallToAction from "@/components/call-to-action";

export default function Home() {
    return (
        <>
            <Hero />
            <Services />
            <SocialProof />
            <VideoTestimonials />
            <AlumniNetwork />
            <ContactUs />
            <CallToAction />
        </>
    );
}

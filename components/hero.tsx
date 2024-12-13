"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONSULTANT_FORM_LINK, BUSINESS_FORM_LINK } from "@/lib/constants";

function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-labelledby="hero-title">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <Image
                    src="/hero.webp"
                    alt="Community consulting team working together"
                    className="object-cover object-[50%_30%] w-full h-full"
                    quality={100}
                    priority
                    fill
                />
            </div>

            {/* Content Container */}
            <div className="relative max-w-screen-xl h-full px-4 mx-auto text-white z-10 text-center">
                <h1 id="hero-title" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 animate-fade-in-up">
                    Consult Your Community
                </h1>

                <div className="max-w-2xl mx-auto space-y-4 mb-8">
                    <p className="font-light text-base md:text-lg lg:text-xl opacity-90 animate-fade-in-up animation-delay-200">
                        A student-led UT Dallas organization dedicated to providing <strong>free consulting services</strong> to Dallas&apos;s small,
                        minority-owned businesses and nonprofits.
                    </p>
                    <p className="font-light text-base md:text-lg lg:text-xl opacity-90 animate-fade-in-up animation-delay-400">
                        We&apos;re more than consultants—we&apos;re <strong>community leaders</strong> driving social impact through strategic support.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild className="animate-fade-in-up animation-delay-600 hover:scale-105 transition-transform">
                        <Link href={CONSULTANT_FORM_LINK} target="_blank" rel="noopener noreferrer">
                            Join as a Consultant
                        </Link>
                    </Button>
                    <Button variant="secondary" asChild className="animate-fade-in-up animation-delay-600 hover:scale-105 transition-transform">
                        <Link href={BUSINESS_FORM_LINK} target="_blank" rel="noopener noreferrer">
                            Request Consulting
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default Hero;

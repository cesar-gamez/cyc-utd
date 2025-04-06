"use client";

import Image from "next/image";

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" aria-labelledby="hero-title">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <Image 
                    src="/team-picture-spring2025.png" 
                    alt="hero" 
                    className="object-cover object-[50%_0%] w-full h-full" 
                    quality={100} 
                    priority 
                    fill 
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content Container */}
            <div className="relative max-w-screen-xl h-full px-4 mx-auto text-white z-10 text-center">
                <h1 id="hero-title" className="text-4xl md:text-5xl font-bold tracking-tight mb-4 animate-fade-in-up">
                    Meet Our Team
                </h1>

                <div className="max-w-3xl mx-auto space-y-4 mb-8">
                    <p className="font-light text-base md:text-lg lg:text-xl animate-fade-in-up animation-delay-200">
                        We value diversity, prioritize impactful solutions, and recruit to enhance our culture and clients. With a small, flat structure, every
                        member is valued and integral.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
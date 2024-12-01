"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONSULTANT_FORM_LINK, BUSINESS_FORM_LINK } from "@/lib/constants";

function Hero() {
    return (
        <section id="#" className="relative h-screen flex items-center justify-center">
            <Image src="/hero.webp" alt="Hero Background" className="object-cover object-[50%_30%] w-full h-full brightness-80" quality={100} priority fill />
            <div className="max-w-screen-xl px-4 mx-auto flex flex-col md:items-center text-center text-white z-10">
                <h1 className="max-w-2xl mb-4 text-5xl font-extrabold tracking-tight">Consult Your Community</h1>
                <p className="max-w-2xl mb-4 font-light md:text-lg lg:text-xl">
                    Student-led UT Dallas organization that provides free consulting services to Dallas&apos;s small, minority-owned businesses and nonprofits.
                </p>
                <p className="max-w-2xl mb-6 font-light md:text-lg lg:text-xl">
                    With social impact at the heart of what we do, our members become not just consultants, but community leaders.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <Button>
                        <Link href={CONSULTANT_FORM_LINK} target="_blank" rel="noopener noreferrer">
                            Join as a consultant
                        </Link>
                    </Button>
                    <Button variant="secondary">
                        <Link href={BUSINESS_FORM_LINK} target="_blank" rel="noopener noreferrer">
                            Request consulting services
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default Hero;

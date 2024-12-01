"use client";

import { Button } from "@/components/ui/button";
import { CONSULTANT_FORM_LINK, BUSINESS_FORM_LINK } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function CallToAction() {
    return (
        <section id="call-to-action" className="relative py-16">
            <Image
                src="/team-picture-spring2023.webp"
                alt="team picture spring 2023"
                className="object-cover object-[50%_40%] w-full h-full brightness-70"
                quality={100}
                priority
                fill
            />
            <div className="container mx-auto px-4 relative z-10 flex flex-col max-w-5xl">
                <h2 className="text-3xl font-serif text-white mb-4">&ldquo;Our culture cares about you as a person, not your resume.&rdquo;</h2>
                <p className="text-white mb-6">
                    We believe in your potential, not your past achievements. Join a community that supports your growth, challenges you, and helps you make a
                    real impact.
                </p>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                    <Button size="lg">
                        <Link href={CONSULTANT_FORM_LINK} target="_blank" rel="noopener noreferrer">
                            Become a consultant
                        </Link>
                    </Button>
                    <Button size="lg">
                        <Link href={BUSINESS_FORM_LINK} target="_blank" rel="noopener noreferrer">
                            Work with us
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

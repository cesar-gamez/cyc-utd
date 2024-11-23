"use client";

import CountUp from "react-countup";

type SocialProof = {
    metric: number;
    description: string;
};

const socialProofs: SocialProof[] = [
    {
        metric: 28,
        description: "University chapters across America",
    },
    {
        metric: 100,
        description: "Small businesses in an academic year",
    },
    {
        metric: 1000000,
        description: "Hours of pro bono counsel dedicated to helping small businesses",
    },
    {
        metric: 600,
        description: "Volunteers across the country",
    },
];

function SocialProofCard({ metric, description }: SocialProof) {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <dt className="mb-2 text-3xl italic tracking-tight">
                <CountUp end={metric} duration={5} enableScrollSpy={true} scrollSpyOnce={true} />+
            </dt>
            <dd className="text-sm text-muted-foreground">{description}</dd>
        </div>
    );
}

export default function SocialProof() {
    return (
        <section className="bg-primary-foreground py-12">
            <div className="container mx-auto max-w-screen-xl px-4 text-center p-24">
                <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {socialProofs.map((proof, index) => (
                        <SocialProofCard key={index} {...proof} />
                    ))}
                </dl>
            </div>
        </section>
    );
}

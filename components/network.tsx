"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { Member } from "@/components/profile";
import Link from "next/link";

type CompanyLogo = {
    name: string;
    logo: string;
};

type RosterResponse = {
    executives: Member[];
    senior_analysts: Member[];
    junior_analysts: Member[];
};

const COMPANIES: CompanyLogo[] = [
    { name: "AT&T", logo: "/att.svg" },
    { name: "Deloitte", logo: "/deloitte.svg" },
    { name: "Goldman Sachs", logo: "/goldman-sachs.svg" },
    { name: "HubSpot", logo: "/hubspot.svg" },
    { name: "Indeed", logo: "/indeed.svg" },
    { name: "Jane Street", logo: "/jane-street.svg" },
    { name: "JP Morgan", logo: "/jp-morgan.svg" },
    { name: "Niantic", logo: "/niantic.svg" },
    { name: "Paycom", logo: "/paycom.svg" },
    { name: "Snowflake", logo: "/snowflake.svg" },
    { name: "Southwest", logo: "/southwest.svg" },
    { name: "USAA", logo: "/usaa.svg" },
];

export default function Network() {
    const [teamMembers, setTeamMembers] = useState<Member[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTeamMembers() {
            try {
                const response = await fetch("/api/py/roster");

                if (!response.ok) {
                    throw new Error("Failed to fetch team members");
                }

                const data: RosterResponse = await response.json();

                const allMembers = [...data.executives, ...data.senior_analysts, ...data.junior_analysts];

                setTeamMembers(allMembers);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setIsLoading(false);
            }
        }

        fetchTeamMembers();
    }, []);

    const displayMembers = teamMembers.slice(0, 5);
    const remainingCount = teamMembers.length - 5;

    return (
        <section id="network" className="py-20 relative overflow-hidden bg-primary-foreground">
            <div className="container mx-auto px-4 space-y-10 relative z-10">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl text-primary tracking-tight">Check Out Our Network</h2>
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                        Our consultants leverage the skills from their time apart of Consult Your Community and move on to top graduate schools and leading
                        companies in a variety of industries.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {COMPANIES.map((company, index) => (
                        <div key={index} className="flex items-center justify-center">
                            <Image src={company.logo} alt={company.name} width={100} height={100} className="max-h-16" />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="flex items-center space-x-[-12px]">
                        {isLoading ? (
                            [...Array(5)].map((_, index) => <div key={index} className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />)
                        ) : error ? (
                            <div className="text-red-500">{error}</div>
                        ) : (
                            <>
                                {displayMembers.map((member, index) => (
                                    <Avatar key={index} className="w-12 h-12 border-2 border-white">
                                        <AvatarImage src={member.headshot} />
                                        <AvatarFallback>
                                            {member.first_name[0]}
                                            {member.last_name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}
                                {remainingCount > 0 && (
                                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center border-2 border-white">
                                        +{remainingCount}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <Button variant="outline" size="lg" className="flex items-center gap-2" asChild>
                        <Link href="/team">
                            Meet the Team
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

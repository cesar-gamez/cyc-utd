"use client";

import { useState, useEffect } from "react";
import { Member, Profile, ProfileSkeleton } from "@/components/profile";
import { Separator } from "@/components/ui/separator";

type RosterResponse = {
    executives: Member[];
    senior_analysts: Member[];
    junior_analysts: Member[];
};

export default function Team() {
    const [teamMembers, setTeamMembers] = useState<RosterResponse>({
        executives: [],
        senior_analysts: [],
        junior_analysts: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/py/roster`, { headers: { Accept: "application/json" } })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch team members");
                return response.json();
            })
            .then((data: RosterResponse) => setTeamMembers(data))
            .catch((err) => setError(err instanceof Error ? err.message : "Unknown error occurred"))
            .finally(() => setIsLoading(false));
    }, []);

    const renderSection = (category: string, members: Member[] | null = null) => (
        <div key={category} className="space-y-6">
            <div className="text-center pb-3 space-y-6">
                <h3 className="text-2xl text-primary tracking-wide uppercase">{category.replace("_", " ")}</h3>
                <Separator />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {members
                    ? members.map((member) => <Profile key={member.email} {...member} />)
                    : Array.from({ length: 6 }).map((_, index) => <ProfileSkeleton key={index} />)}
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 space-y-16">
                {Object.keys(teamMembers).map((category) => renderSection(category))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12 text-center text-neutral-500">
                <p className="text-2xl mt-8">Something went wrong</p>
                <p className="mt-4 text-base">Please refresh the page or contact support</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 space-y-16">
            {Object.entries(teamMembers).map(([category, members]) =>
                members.length > 0 ? renderSection(category, members) : null
            )}
        </div>
    );
}

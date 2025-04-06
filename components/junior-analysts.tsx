"use client";

import { Member, Profile } from "@/components/profile";
import { Separator } from "@/components/ui/separator";

type JuniorAnalystsProps = {
    junior_analysts: Member[];
};

export default function JuniorAnalysts({ junior_analysts = [] }: JuniorAnalystsProps) {
    if (junior_analysts.length === 0) {
        return null;
    }

    return (
        <div className="space-y-6">
            <div className="text-center pb-3 space-y-6">
                <h3 className="text-2xl text-primary tracking-wide uppercase">Junior Analysts</h3>
                <Separator />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {junior_analysts.map((member) => (
                    <Profile key={member.email} {...member} />
                ))}
            </div>
        </div>
    );
}

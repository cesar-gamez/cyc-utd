import Hero from "@/components/hero-team";
import Executives from "@/components/executives";
import SeniorAnalysts from "@/components/senior-analysts";
import JuniorAnalysts from "@/components/junior-analysts";
import { executives, senior_analysts, junior_analysts } from "./members";

export const metadata = {
    title: "Team",
    description: "Meet the team behind Consult Your Community at UT Dallas.",
};

export default function TeamPage() {
    return (
        <>
            <Hero />
            <div className="container mx-auto px-4 py-16 space-y-16">
                <Executives executives={executives} />
                <SeniorAnalysts senior_analysts={senior_analysts} />
                <JuniorAnalysts junior_analysts={junior_analysts} />
            </div>
        </>
    );
}

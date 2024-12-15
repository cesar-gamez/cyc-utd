import Hero from "@/components/hero-team";
import Team from "@/components/team";

export const metadata = {
    title: "Team",
    description: "Meet the team behind Consult Your Community at UT Dallas.",
};

export default function TeamPage() {
    return (
        <>
            <Hero />
            <Team />
        </>
    );
}

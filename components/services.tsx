"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartBar, PiggyBank, BarChart3, TrendingUp, Megaphone, Settings } from "lucide-react";

type Service = {
    icon: React.ReactNode;
    title: string;
    description: string;
    tags: string[];
};

const servicesData: Service[] = [
    {
        icon: <ChartBar className="w-5 h-5" />,
        title: "Market Insights",
        description:
            "Provide in-depth market research, including competitive landscape analysis and industry trend identification, to help businesses understand their positioning and opportunities.",
        tags: ["Competitive Analysis", "Industry Trends", "Market Research"],
    },
    {
        icon: <PiggyBank className="w-5 h-5" />,
        title: "Financial Planning",
        description: "Develop financial projections, restructures pricing models, and creates revenue strategies to ensure sustainable growth.",
        tags: ["Financial Projections", "Pricing Strategy", "Revenue Planning"],
    },
    {
        icon: <BarChart3 className="w-5 h-5" />,
        title: "Data Analysis",
        description:
            "Using statistical analysis and data visualization, we turn raw data into actionable insights to drive decision-making and improve operations.",
        tags: ["Statistics", "Visualization", "Analytics"],
    },
    {
        icon: <TrendingUp className="w-5 h-5" />,
        title: "Growth Strategies",
        description: "Assist businesses in scaling operations, expanding geographically, and diversifying products to increase revenues and market share.",
        tags: ["Scaling", "Expansion", "Diversification"],
    },
    {
        icon: <Megaphone className="w-5 h-5" />,
        title: "Brand Marketing",
        description:
            "Craft value propositions to managing social media and forming partnerships, we enhance brand identity and build a strong digital presence.",
        tags: ["Branding", "Social Media", "Partnerships"],
    },
    {
        icon: <Settings className="w-5 h-5" />,
        title: "Operational Efficiency",
        description:
            "Optimize supply chains, manage talent, and integrate technology to streamline processes, reduce costs, and enhance business transactions.",
        tags: ["Optimization", "Process", "Technology"],
    },
];

const ServiceCard = ({ icon, title, description, tags }: Service) => {
    return (
        <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        {icon}
                    </div>
                    <h3 className="text-xl font-bold text-primary">{title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary-hover">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const Services = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 },
        );

        if (node) {
            observer.observe(node);
        }

        return () => {
            if (node) {
                observer.unobserve(node);
            }
        };
    }, []);

    return (
        <section ref={ref} className={`transition-opacity duration-900 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div id="services" className="mx-auto max-w-screen-xl py-24 px-4 sm:py-32 lg:px-6">
                <div className="max-w-screen-md mb-12 lg:mb-16">
                    <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-primary">Our Services</h2>
                    <p className="text-lg text-muted-foreground">
                        Each semester, our student consultants undertake consulting projects with diverse clients to deliver data-driven insights and actionable
                        solutions across various domains.
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {servicesData.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

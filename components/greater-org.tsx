import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function OrganizationRedirect() {
    return (
        <section className="relative w-full h-[600px] flex items-center">
            {/* Background Image */}
            <Image 
                src="/Hero.webp"
                alt="Organization Hero Background" 
                fill 
                className="absolute inset-0 object-cover z-0 brightness-100" 
            />
            
            {/* Content Container */}
            <div className="container mx-auto px-4 relative z-10 text-white">
                <div className="max-w-2xl space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Empowering Small Businesses Across America
                    </h1>
                    
                    <p className="text-lg text-gray-200 leading-relaxed">
                        Our mission is to support and uplift entrepreneurial ventures through innovative solutions and strategic guidance.
                    </p>
                    
                    <Link href="https://consultyourcommunity.org/" target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" size="lg" className="flex items-center gap-2">
                            Learn More
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default OrganizationRedirect;
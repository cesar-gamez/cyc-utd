"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useState, useCallback } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
    { title: "Services", href: "/#services", ariaLabel: "View our services" },
    { title: "Team", href: "/#team", ariaLabel: "Meet our team" },
    { title: "Contact", href: "/#contact-us", ariaLabel: "Contact us" },
    { title: "FAQ", href: "/#faq", ariaLabel: "View FAQs" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
            <nav className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-6" aria-label="Main Navigation">
                {/* Logo */}
                <Link href="#" className="flex items-center space-x-3" aria-label="Navigate to home">
                    <Image src="/logo.jpeg" width={40} height={40} alt="CYC UTD Logo" className="rounded-sm" priority />
                    <span className="text-xl text-primary">CYC UT Dallas</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex space-x-6">
                    {NAV_LINKS.map(({ title, href, ariaLabel }) => (
                        <Link
                            key={href}
                            href={href}
                            aria-label={ariaLabel}
                            className={`
                                text-primary hover:text-primary transition-colors
                                ${pathname === href ? "font-semibold text-primary" : ""}
                            `}
                        >
                            {title}
                        </Link>
                    ))}
                </div>

                {/* Mobile Navigation */}
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild className="lg:hidden">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleMenu}
                            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-controls="mobile-navigation"
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="top" className="h-screen">
                        <VisuallyHidden.Root>
                            <SheetTitle>Menu</SheetTitle>
                            <SheetDescription>Mobile Navigation</SheetDescription>
                        </VisuallyHidden.Root>
                        <div id="mobile-navigation" className="flex flex-col items-center justify-center h-full space-y-6" role="menu">
                            {NAV_LINKS.map(({ title, href, ariaLabel }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={closeMenu}
                                    role="menuitem"
                                    aria-label={ariaLabel}
                                    className={`
                                        text-2xl text-primary hover:text-primary transition-colors
                                        ${pathname === href ? "font-semibold text-primary" : ""}
                                    `}
                                >
                                    {title}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}

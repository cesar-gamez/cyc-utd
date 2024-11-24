"use client";

import { useEffect, useState, useRef, ReactNode } from "react";

type FadeInProps = {
    children: ReactNode;
};

function Fade_in({ children }: FadeInProps) {
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
            { threshold: 0.1 },
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
        <section ref={ref} className={`transition-opacity duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {children}
        </section>
    );
}

export default Fade_in;

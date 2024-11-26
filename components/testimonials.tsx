"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import FadeIn from "@/components/fade-in";

type Testimonial = {
    id: number;
    title: string;
    url: string;
};

const testimonials: Testimonial[] = [
    {
        id: 1,
        title: "A Story of a Small Business Family: Proteus Bicycles",
        url: "https://www.youtube.com/watch?v=2mNzTLuMXUU",
    },
    {
        id: 2,
        title: "Why Consult Your Community Hit Home for a Daughter of a Small Business Owner",
        url: "https://www.youtube.com/watch?v=PmY_d0iaSBY",
    },
];

const VideoTestimonials = () => {
    const [activeVideo, setActiveVideo] = useState<number | null>(null);

    const getYoutubeEmbedUrl = (url: string) => {
        try {
            const videoId = url.split("v=")[1]?.split("&")[0];
            return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } catch (error) {
            console.error("Invalid YouTube URL:", error);
            return "";
        }
    };

    const getYoutubeThumbnailUrl = (url: string) => {
        try {
            const videoId = url.split("v=")[1]?.split("&")[0];
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        } catch (error) {
            console.error("Invalid YouTube URL:", error);
            return "";
        }
    };

    return (
        <FadeIn>
            <div id="testimonials" className="w-full max-w-7xl mx-auto px-4 py-24 sm:py-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-medium mb-4 text-primary">Our Impact Stories</h2>
                    <p className="text-muted-foreground">Real experiences from our community</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-card">
                            {activeVideo === testimonial.id ? (
                                <iframe
                                    className="w-full aspect-video"
                                    src={getYoutubeEmbedUrl(testimonial.url)}
                                    title={testimonial.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <button onClick={() => setActiveVideo(testimonial.id)} className="w-full relative block">
                                    <Image
                                        src={getYoutubeThumbnailUrl(testimonial.url)}
                                        alt={testimonial.title}
                                        className="w-full aspect-video object-cover"
                                        quality={100}
                                        width={1920}
                                        height={1080}
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-20 transition-opacity">
                                        <div className="rounded-full bg-primary p-4 shadow-lg group-hover:scale-110 transition-transform">
                                            <Play className="w-4 h-4 sm:w-8 sm:h-8 text-primary-foreground" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                                        <h3 className="text-white font-medium text-sm sm:text-lg">{testimonial.title}</h3>
                                    </div>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </FadeIn>
    );
};

export default VideoTestimonials;

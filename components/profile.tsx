"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface Member {
    first_name: string;
    last_name: string;
    email: string;
    major: string;
    graduation_year: number | string;
    linkedin?: string;
    position?: string;
    headshot?: string;
}

const ProfileSkeleton = () => (
    <div className="text-center space-y-3">
        {/* Skeleton Avatar */}
        <div className="mx-auto size-24">
            <Skeleton className="w-full h-full rounded-full" />
        </div>

        {/* Skeleton Text */}
        <div className="pt-1 space-y-2">
            <Skeleton className="w-32 h-4 mx-auto" />
            <Skeleton className="w-24 h-3 mx-auto" />
            <Skeleton className="w-24 h-3 mx-auto" />

            {/* Skeleton for Icons */}
            <div className="flex justify-center space-x-3 mt-2">
                <svg
                    className="text-muted-foreground hover:text-primary transition-colors size-5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
                <svg className="text-muted-foreground hover:text-primary transition-colors size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                    <path d="M 0 7 L 0 43 L 50 43 L 50 7 Z M 2 9 L 48 9 L 48 11.53125 L 25 29.71875 L 2 11.53125 Z M 2 14.09375 L 24.375 31.78125 C 24.742188 32.074219 25.257813 32.074219 25.625 31.78125 L 48 14.09375 L 48 41 L 2 41 Z"></path>
                </svg>
            </div>
        </div>
    </div>
);

const Profile = ({ first_name, last_name, email, major, graduation_year, linkedin, position, headshot }: Member) => (
    <div className="text-center space-y-3">
        <Avatar className="mx-auto size-24">
            <AvatarImage src={headshot} alt={`${first_name} ${last_name}`} className="object-cover" />
            <AvatarFallback>
                {first_name[0]}
                {last_name[0]}
            </AvatarFallback>
        </Avatar>

        <div>
            <h3 className="text-lg font-semibold">
                {first_name} {last_name}
            </h3>
            {!position?.includes("Analyst") && <p className="text-sm text-muted-foreground">{position}</p>}
            <p className="text-sm text-muted-foreground">
                {major} • {graduation_year}
            </p>

            <div className="flex justify-center space-x-3 mt-2">
                {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <svg className="size-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                        </svg>
                    </a>
                )}
                {email && (
                    <a
                        href={`mailto:${email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                            <path d="M 0 7 L 0 43 L 50 43 L 50 7 Z M 2 9 L 48 9 L 48 11.53125 L 25 29.71875 L 2 11.53125 Z M 2 14.09375 L 24.375 31.78125 C 24.742188 32.074219 25.257813 32.074219 25.625 31.78125 L 48 14.09375 L 48 41 L 2 41 Z"></path>
                        </svg>
                    </a>
                )}
            </div>
        </div>
    </div>
);

export { type Member, ProfileSkeleton, Profile };

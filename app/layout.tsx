import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.utdcyc.com/"),
    keywords: ["consulting", "pro bono", "small business", "startup", "UT Dallas", "Consult Your Community", "cyc", "utd", "cycutd", "utdcyc"],
    title: { default: "CYC UT Dallas", template: "%s | CYC UT Dallas" },
    description:
        "Chapter of the national Consult Your Community organization at UT Dallas, providing pro bono consulting services to small businesses and startups locally.",
    openGraph: {
        images: "/opengraph-image.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Navbar />
                {children}
                <Toaster />
                <Footer />
            </body>
        </html>
    );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.youtube.com",
                port: "",
                pathname: "**",
            },
        ],
    },
    rewrites: async () => {
        return [
            {
                source: "/api/py/:path*",
                destination: process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api/py/:path*" : "/api/",
            },
            {
                source: "/docs",
                destination: process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api/py/docs" : "/api/py/docs",
            },
            {
                source: "/openapi.json",
                destination: process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api/py/openapi.json" : "/api/py/openapi.json",
            },
            {
                source: "/redoc",
                destination: process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api/py/redoc" : "/api/py/redoc",
            },
        ];
    },
};

export default nextConfig;

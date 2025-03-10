/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        removeConsole: {
            exclude: ["log", "error"],
        },
    },
};

export default nextConfig;

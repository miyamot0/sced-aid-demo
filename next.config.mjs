import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};


const withPWA = withPWAInit({
    dest: "public",
  // disable: process.env.NODE_ENV === "development",
   register: true,
    // scope: "/app",
  // sw: "service-worker.js",
});

export default withPWA({
  ...nextConfig
});
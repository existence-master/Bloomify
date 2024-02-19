/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            path: false,
            os: false,
            child_process: false
        }
    
        return config
    },
    images: {
        domains: ["lh3.googleusercontent.com"],
    },
}

module.exports = nextConfig
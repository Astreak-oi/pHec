import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Astreak",
    short_name: "Astreak",
    description:
      "Transform your business with cutting-edge product engineering, software solutions, SaaS services, and more. Drive efficiency, growth, and success across industries.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/andriod-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}

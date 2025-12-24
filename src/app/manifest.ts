import type { MetadataRoute } from "next";

const appName = process.env.NEXT_PUBLIC_APP_NAME;
if (!appName) {
  throw new Error("NEXT_PUBLIC_APP_NAME が設定されていません。");
}

const appNameSub = process.env.NEXT_PUBLIC_APP_NAME_SUB;
if (!appNameSub) {
  throw new Error("NEXT_PUBLIC_APP_NAME_SUB が設定されていません。");
}

const appDescription = process.env.NEXT_PUBLIC_APP_DESCRIPTION;
if (!appDescription) {
  throw new Error("NEXT_PUBLIC_APP_DESCRIPTION が設定されていません。");
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL;
if (!appUrl) {
  throw new Error("NEXT_PUBLIC_APP_URL が設定されていません。");
}

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${appName}: ${appNameSub}`,
    short_name: appName,
    description: appDescription,
    start_url: appUrl,
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/assets/img/touch-icon-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
  };
}

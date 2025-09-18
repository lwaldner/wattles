// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      SHOPIFY_TOKEN: process.env.SHOPIFY_TOKEN,
      SHOPIFY_DOMAIN: process.env.SHOPIFY_DOMAIN,
    },
  },
  app: {
    head: {
      title: "Wyeth Creative Studio",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, minimum-scale=1.0, maximum-scale=5.0",
        },
        {
          property: "og:image",
          content: "/favicon.webp",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.webp" },
        { rel: "preconnect", href: "https://myshopify.com" },
        { rel: "preconnect", href: process.env.SHOPIFY_DOMAIN },
      ],
    },
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
  },
  appConfig: {
    components: {
      dirs: [
        {
          path: "~/app/components",
          global: true,
        },
      ],
    },
  },
  modules: [
    "@nuxt/image",
    "nuxt-svgo",
    "@pinia/nuxt",
    "@nuxtjs/sitemap",
    "nuxt-gtag",
    "@nuxtjs/robots",
    "nuxt-schema-org",
    "@nuxtjs/sanity",
    "@nuxt/fonts",
  ],
  css: ["./app/styles/base.scss"],
  svgo: {
    autoImportPath: "./assets/svgs/",
    defaultImport: "component",
    componentPrefix: "svg",
    svgoConfig: {
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              inlineStyles: false,
              removeViewBox: false,
            },
          },
        },
      ],
    },
  },
  sanity: {
    projectId: "2z2jjuje",
    dataset: "production",
    apiVersion: "2024-03-25",
    perspective: "published",
    token: process.env.SANITY_API_TOKEN,
  },
  site: {
    url: "https://wyeth.studio",
    name: "Wyeth Creative Studio",
  },
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        "@sanity/visual-editing",
        "react",
        "react/jsx-runtime",
        "react-dom",
        "react-dom/client",
      ],
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) =>
        ["swiper-container", "swiper-slide"].includes(tag),
    },
  },
});

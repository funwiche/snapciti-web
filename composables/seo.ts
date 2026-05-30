interface Breadcrumb {
  name: string;
  path: string;
}
interface SeoData {
  title?: string;
  desc?: string;
  image?: string;
  breadcrums?: [Breadcrumb];
}
export const useSeoData = (data: SeoData) => {
  const route = useRoute();
  const app = useAppConfig();
  const head = useLocaleHead();
  const href = app.url + route.fullPath;
  const description = tn(data.desc || app.desc);
  const title = tn(data.title || app.title);
  const image = app.url + (data.image || app.image);
  useHead({
    htmlAttrs: head.value.htmlAttrs,
    title: computed(() => title),
    titleTemplate: `%s | ${app.name}`,
    meta: [
      { charset: "utf-8" },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no",
      },
      { name: "description", content: description },

      // Open Graph / Facebook
      { property: "og:type", content: "website" },
      { property: "og:url", content: href },
      { property: "og:site_name", content: app.name },
      { property: "og:locale", content: "en_GB" },
      { property: "og:title", content: `${title} | ${app.name}` },
      { property: "og:description", content: description },
      { property: "og:image", content: image },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: href },
      { name: "twitter:title", content: `${title} | ${app.name}` },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    link: [
      { rel: "canonical", href },
      { rel: "image/x-icon", href: "/favicon.ico" },
      // { rel: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      // { rel: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      ...head.value.link?.map(({ id, ...link }) => link),
      {
        rel: "stylesheet",
        href: "https://xtremnet.vercel.app/fonts/fontawesome/css/all.min.css",
      },
    ],
    script: [
      { src: "/js/main.js" },
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: app.name,
          url: app.url,
          logo: `${app.url}/logo.png`,
          description,
          sameAs: [
            // "https://twitter.com/user_name",
            // "https://facebook.com/user_name"
          ],
          potentialAction: {
            "@type": "SearchAction",
            target: `${app.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      },
      data.breadcrums?.length
        ? {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: app.url,
                },
                data.breadcrums.map((el, i) => ({
                  "@type": "ListItem",
                  position: i + 2,
                  name: el.name,
                  item: `${app.url}${el.path}`,
                })),
              ],
            }),
          }
        : null,
    ].filter((el) => el),
  });
};

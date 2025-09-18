export function useShopifyFetch(query, variables) {
  const config = useRuntimeConfig();
  return $fetch(
    `https://${config.public.SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": config.public.SHOPIFY_TOKEN,
      },
      body: {
        query: query,
        variables: variables,
      },
    }
  );
}

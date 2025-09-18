export function useShopify(query, variables, transform, key) {
  const config = useRuntimeConfig();
  return useAsyncData(
    key,
    () => {
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
    },
    { transform }
  );
}

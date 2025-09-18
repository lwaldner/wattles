import productByHandle from "~/gql/ProductByHandle.js";

export function useFetchProduct(productHandle) {
  const gqlVariables = {
    handle: productHandle,
  };
  const transform = (shopifyData) => {
    return shopifyData?.data?.productByHandle;
  };
  return useShopify(
    productByHandle,
    gqlVariables,
    transform,
    `product-${productHandle}`
  );
}

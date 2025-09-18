import getCollection from "~/gql/GetCollection.js";

export function useFetchCollection(collectionHandle) {
  const gqlVariables = {
    handle: collectionHandle,
  };
  const transform = (shopifyData) => {
    return shopifyData?.data?.collectionByHandle?.products?.edges || {};
  };
  return useShopify(
    getCollection,
    gqlVariables,
    transform,
    `collection-${collectionHandle}`
  );
}

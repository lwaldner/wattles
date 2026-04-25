export default `query GetCollection($handle: String!) {
  collectionByHandle(handle: $handle) {
    products(first: 99) {
      edges {
        node {
          id
          title
          handle
          updatedAt
          availableForSale
          featuredImage {
            desktop: url(transform: {maxWidth: 500})
            mobile: url(transform: {maxWidth: 240})
            width
            height
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
}`;

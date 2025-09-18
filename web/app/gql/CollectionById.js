export default `
query collectionById($language: LanguageCode, $country: CountryCode, $collectionID: ID!) {
  collection(id: $collectionID) {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          availableForSale
          featuredImage {
            desktop: url(transform: {maxWidth: 500})
            mobile: url(transform: {maxWidth: 240})
          }
          variants(first: 50) {
            nodes {
              id
              title
              selectedOptions {
                name
                value
              }
            }
          }
          variantImages: metafield(key: "variant_images", namespace: "custom") {
            references(first: 50) {
              nodes {
                ... on Metaobject {
                  colorSample: field(key: "color_sample") {
                    value
                  }
                  name: field(key: "variant_name") {
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

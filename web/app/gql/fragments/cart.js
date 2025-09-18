export default `
  id
  checkoutUrl
  createdAt
  estimatedCost {
    subtotalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 50) {
    nodes {
      ... on CartLine {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            availableForSale
            title
            image {
              url(transform: {maxWidth: 120})
            }
            selectedOptions {
              name
              value
            }
            product {
              id
              handle
              title
            }
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

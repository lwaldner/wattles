export default `
  id
  title
  handle
  descriptionHtml
  options(first: 90) {
    values
    name
  }
  featuredImage {
    desktop: url(transform: {maxWidth: 500})
    mobile: url(transform: {maxWidth: 240})
  }
  images(first: 50) {
    nodes {
      small: url(transform: {maxWidth: 120})
      medium: url(transform: {maxWidth: 1000})
      large: url(transform: {maxWidth: 1600})
      id
      altText
    }
  }
  variants(first: 50) {
    nodes {
      id
      title
      availableForSale
      quantityAvailable
      quantityRule {
          increment
          maximum
          minimum
        }
      priceV2 {
        amount
        currencyCode
      }
      selectedOptions {
        name
        value
      }
    }
  }
`;

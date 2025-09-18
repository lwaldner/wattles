import cartFragment from "~/gql/fragments/cart";

export default `
  mutation AddToCart($cartId: ID!, $itemId: ID!, $quantity: Int!) {
    cartLinesAdd(cartId: $cartId, lines: {merchandiseId: $itemId, quantity: $quantity}) {
      cart {
        ${cartFragment}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

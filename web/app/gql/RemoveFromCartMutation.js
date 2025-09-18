import cartFragment from "~/gql/fragments/cart";

export default `
  mutation RemoveFromCart($cartId: ID!, $lineId: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineId) {
      cart {
        ${cartFragment}
      }
    }
  }

`;

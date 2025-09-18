import cartFragment from "~/gql/fragments/cart";

export default `
  mutation ($input: CartInput!){
    cartCreate(input: $input) {
      userErrors {
        message
        code
        field
      }
      cart {
        ${cartFragment}
      }
    }
  }
`;

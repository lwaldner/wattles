import cartFragment from "~/gql/fragments/cart";

export default `
  query GetCartById($id: ID!) { 
    cart(id: $id){
      ${cartFragment}
    }
  }
`;

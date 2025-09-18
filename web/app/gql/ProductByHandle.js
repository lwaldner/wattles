import productFragment from "~/gql/fragments/product";

export default `
  query ProductByHandle($handle: String!) {  
    productByHandle(handle: $handle) {
      ${productFragment}
    }
  }
`;

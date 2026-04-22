export default `
mutation createCustomer($input: CustomerInput!) {
      customerCreate(input: $input) {
        userErrors {
          field
          message
        }
      }
    }
`;

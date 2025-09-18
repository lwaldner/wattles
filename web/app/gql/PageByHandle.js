export default `
query MyQuery($handle: String!) {
  pageByHandle(handle: $handle) {
    body
    title
    handle
    seo {
      description
      title
    }
  }
}
`;

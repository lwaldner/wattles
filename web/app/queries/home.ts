export default groq`
  *[_type == "homePage"] {
    title,
    featuredImage {
      asset -> {
        _id,
        url
      }
    }
  }[0]
`;

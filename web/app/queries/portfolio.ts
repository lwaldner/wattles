export default groq`
  *[_type == "portfolio" && title == $title] {
    title,
    images[] {
      asset -> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      }
    }
  }[0]
`;

export default groq`
  *[_type == "about"] {
    title,
    featuredImage {
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
    },
    body[] {
      ...,
      _type == "image" => {
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
        },
        alt,
        caption
      }
    }
  }[0]
`;

export default groq`
  *[_type == "commissions"] {
    title,
    info[] {
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
    },
    slideshow[] {
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
    },
    destinationEmail
  }[0]
`;

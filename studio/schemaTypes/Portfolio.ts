import {defineType} from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Portfolio Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      images: 'images',
    },
    prepare(selection) {
      const {title, media, images} = selection
      const imageCount = images?.length || 0
      return {
        title: title || 'Untitled Portfolio',
        subtitle: `${imageCount} image${imageCount !== 1 ? 's' : ''}`,
        media: media,
      }
    },
  },
})

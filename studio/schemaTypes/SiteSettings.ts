import {defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'showBanner',
      title: 'Show Banner?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'bannerText',
      title: 'Banner Text',
      type: 'string',
      hidden: ({document}) => !document?.showBanner,
    },
    {
      name: 'bannerLink',
      title: 'Banner Link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
          allowRelative: true,
        }),
      hidden: ({document}) => !document?.showBanner,
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Site Settings',
    }),
  },
})

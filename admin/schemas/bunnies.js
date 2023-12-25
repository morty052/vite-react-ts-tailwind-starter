export default {
  name: 'bunnies',
  title: 'Bunnies',
  type: 'document',
  fields: [
    {
      name: 'avatar',
      type: 'image',
      title: 'Avatar',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'username',
      title: 'username',
      type: 'string',
    },
    {
      name: 'recommended',
      title: 'recommended',
      type: 'boolean',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'trending',
      title: 'Trending',
      type: 'boolean',
    },
    {
      name: 'offers',
      title: 'Offers',
      type: 'object',
      fields: [
        {
          name: 'video',
          title: 'Video',
          type: 'boolean',
        },
        {
          name: 'photo',
          title: 'Photo',
          type: 'boolean',
        },
        {
          name: 'date',
          title: 'Date',
          type: 'boolean',
        },
      ],
    },
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          name: 'subimage',
          title: 'Image',
        },
      ],
    },
    {
      name: 'followers',
      title: 'followers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'users'}],
        },
      ],
    },
    {
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'posts'}],
        },
      ],
    },
    {
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        {
          name: 'photo_price',
          type: 'number',
          title: 'Photo-price',
        },
        {
          name: 'video_price',
          type: 'number',
          title: 'Video-price',
        },
        {
          name: 'date_price',
          type: 'number',
          title: 'Date-price',
        },
      ],
    },
  ],
}

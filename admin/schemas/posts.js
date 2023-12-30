export default {
  name: 'posts',
  title: 'Posts',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'bunnies'},
    },
    {
      name: 'recommended',
      title: 'Recommended',
      type: 'boolean',
    },
    {
      name: 'home_page',
      title: 'Home page',
      type: 'boolean',
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'number',
    },
    {
      name: 'likedby',
      title: 'Liked By',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'users'},
        },
      ],
    },
    {
      name: 'bookmarkers',
      title: 'Bookmarkers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'users'},
        },
      ],
    },
  ],
}

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
  ],
}

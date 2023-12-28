export default {
  name: 'pimps',
  title: 'Pimps',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
    {
      name: 'username',
      title: 'username',
      type: 'string',
    },
    {
      name: 'bunnies',
      title: 'bunnies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'bunnies'}],
        },
      ],
    },
  ],
}

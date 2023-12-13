export default {
  name: 'users',
  title: 'Users',
  type: 'document',
  fields: [
    {
      name: 'username',
      title: 'username',
      type: 'string',
    },
    {
      name: 'credits',
      title: 'credits',
      type: 'number',
    },
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
      name: 'bunnies',
      title: 'Bunnies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'bunnies'}],
        },
      ],
    },
    {
      name: 'events',
      title: 'Events',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Event',
          name: 'event',
          fields: [
            {
              name: 'bunny',
              title: 'Bunny',
              type: 'reference',
              to: [{type: 'bunnies'}],
            },
            {
              name: 'eventtype',
              title: 'EventType',
              type: 'string',
            },
            {
              name: 'date',
              title: 'Date',
              type: 'date',
            },
          ],
        },
      ],
    },
  ],
}

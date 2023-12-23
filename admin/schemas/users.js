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
          type: 'object',
          name: 'bunny',
          title: 'Bunny',
          fields: [
            {
              name: 'bunny',
              title: 'Bunny',
              type: 'reference',
              to: [{type: 'bunnies'}],
            },
            {
              type: 'boolean',
              name: 'liked',
              title: 'Liked',
            },
          ],
        },
      ],
    },
    {
      name: 'bookmarked',
      title: 'bookmarked',
      type: 'array',
      of: [
        {
          type: 'reference',
          name: 'bookmarks',
          title: 'Bookmarks',
          to: [{type: 'posts'}],
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
    {
      name: 'orders',
      title: 'Orders',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'order',
          name: 'order',
          fields: [
            {
              name: 'bunny',
              title: 'Bunny',
              type: 'reference',
              to: [{type: 'bunnies'}],
            },
            // {
            //   name: 'type',
            //   title: 'type',
            //   type: 'object',
            //   fields: [
            //     {
            //       name: 'topup',
            //       title: 'Topup',
            //       type: 'boolean',
            //     },
            //     {
            //       name: 'refund',
            //       title: 'Refund',
            //       type: 'boolean',
            //     },
            //     {
            //       name: 'purchase',
            //       title: 'Purchase',
            //       type: 'boolean',
            //     },
            //   ],
            // },
            {
              name: 'date',
              title: 'Date',
              type: 'date',
            },
            {
              name: 'amount',
              title: 'amount',
              type: 'number',
            },
            {
              name: 'event',
              title: 'Event',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}

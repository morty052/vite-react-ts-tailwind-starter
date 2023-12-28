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
    {
      name: 'settings',
      title: 'Settings',
      type: 'object',
      fields: [
        {
          name: 'account_settings',
          title: 'Account Settings',
          type: 'object',
          fields: [
            {
              name: 'username',
              title: 'Username',
              type: 'string',
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
              name: '2fa',
              title: '2FA',
              type: 'boolean',
            },
          ],
        },
        {
          name: 'notification_settings',
          title: 'Notification Settings',
          type: 'object',
          fields: [
            {
              name: 'marketing_emails',
              title: 'marketing Emails',
              type: 'boolean',
            },
            {
              name: 'event_emails',
              title: 'Event Emails',
              type: 'boolean',
            },
            {
              name: 'direct_messages',
              title: 'direct_messages',
              type: 'boolean',
            },
            {
              name: 'posts_emails',
              title: 'Posts Emails',
              type: 'boolean',
            },
          ],
        },
        {
          name: 'privacy_settings',
          title: 'Privacy Settings',
          type: 'object',
          fields: [
            {
              name: 'public_balance',
              title: 'Public Balance',
              type: 'boolean',
            },
            {
              name: 'public_profile',
              title: 'Public profile',
              type: 'boolean',
            },
            {
              name: 'sessions',
              title: 'sessions',
              type: 'boolean',
            },
          ],
        },
        {
          name: 'referral_settings',
          title: 'Referral Settings',
          type: 'object',
          fields: [
            {
              name: 'milestone_alerts',
              title: 'Milestone alerts',
              type: 'boolean',
            },
            {
              name: 'referral_alerts',
              title: 'Referral alerts',
              type: 'boolean',
            },
          ],
        },
      ],
    },
  ],
}

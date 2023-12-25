import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Button } from 'src/components/ui/button'
import { Switch } from 'src/components/ui/switch'

async function getUser(username: string | null) {
  const _id = localStorage.getItem('_id')
  const res = await fetch(`http://192.168.100.16:3000/users/fetch-user?_id=${_id}`)
  const data = await res.json()
  const { user } = data
  return user
}

function CheckBoxField({ checked, setChecked, title, description }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-lg border border-white/10 p-4">
        <div className="flex-1">
          <p className=" font-medium text-light">{title}</p>
          <p className="text-sm text-light">{description}</p>
        </div>
        <Switch checked={checked} onCheckedChange={setChecked} />
      </div>
    </div>
  )
}

// TODO : ADD SETTINGS LOGIC

// TODO: ADD MORE SETTINGS
export function UserProfile() {
  const [marketingEmails, setmarketingEmails] = useState(true)
  const [eventEmails, seteventEmails] = useState(true)
  const [enable2FA, setEnable2FA] = useState(false)

  useMemo(() => console.log(eventEmails), [eventEmails])

  // @ts-expect-error
  const { data, isLoading, error } = useQuery({ queryKey: ['user'], queryFn: getUser })

  const { username, email }: { username: string; email: string } = data ?? {}
  const Initial = username?.charAt(0)?.toUpperCase()
  return (
    <div className="scrollbar-hidden h-screen overflow-scroll px-2 pb-14">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <div className="-ml-1 flex items-center gap-x-4">
          <button className="h-14 w-14 rounded-full bg-white p-2">
            <span className="text-2xl font-black">{Initial}</span>
          </button>
          <p className="font-medium text-blue-700">Edit Avatar</p>
        </div>
        <hr className="" />
        <div className="w-full space-y-1">
          <p className="text-sm text-light">Email</p>
          <input
            placeholder={email}
            className="w-full max-w-md rounded-lg border border-light bg-transparent p-2 text-light "
            type="text"
          />
        </div>
        <div className="w-full space-y-1">
          <p className="text-sm text-light">Username</p>
          <input
            placeholder={username}
            className="w-full max-w-md rounded-lg border border-light bg-transparent p-2 text-light "
            type="text"
          />
        </div>

        <hr className="my-2" />
        <p className="text-sm text-light">Email Notifications</p>
        <div className="w-full space-y-2">
          <CheckBoxField
            title="Marketing Emails"
            description="Receive emails about new products, features, and more."
            checked={marketingEmails}
            setChecked={setmarketingEmails}
          />
          <CheckBoxField
            title="Event Emails"
            description="Receive remainder emails about your upcoming events."
            // checked={eventEmails}
            setChecked={seteventEmails}
          />
        </div>

        <hr />
        <p className="text-sm text-light">Account Security</p>
        <div className="w-full space-y-1">
          <p className="text-sm text-light">Change Password</p>
          <input
            placeholder={'Password'}
            className="w-full max-w-md rounded-lg border border-light bg-transparent p-2 text-light "
            type="text"
          />
        </div>
        <CheckBoxField
          title="Enable 2FA"
          description="Receive 2FA authentication email when you sign in."
          checked={enable2FA}
          setChecked={setEnable2FA}
        />
        <Button className="w-full ">Save</Button>
      </div>
    </div>
  )
}

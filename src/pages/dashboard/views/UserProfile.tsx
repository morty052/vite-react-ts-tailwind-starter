import { useQuery } from '@tanstack/react-query'
import { ChevronRight, Clipboard } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, Route, Routes } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { Switch } from 'src/components/ui/switch'
import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../components/ui/accordion'
import { Loader } from 'src/components'

const settingsArray = [
  {
    title: 'Account',
    to: 'account',
  },
  {
    title: 'Notifications',
    to: 'notifications',
  },
  {
    title: 'Privacy and safety',
    to: 'privacy',
  },
  // {
  //   title: 'Payments and Billing',
  //   to: 'billing',
  // },
  {
    title: 'Manage Referrals',
    to: 'referral',
  },
]

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean> // Return success

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }

  return [copiedText, copy]
}

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

function SettingItem({ title, to }: { title: string; to: string }) {
  return (
    <Link to={`${to}`} className="flex items-center justify-between border-y px-2 py-4">
      <p className="text-light">{title}</p>
      <ChevronRight color="white" />
    </Link>
  )
}
function AllSettingsList(params: type) {
  return (
    <div className="">
      {settingsArray.map((item) => {
        return <SettingItem key={item.title} title={item.title} to={item.to} />
      })}
    </div>
  )
}

function AccountSettings(params: type) {
  const [enable2FA, setEnable2FA] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newPassWord, setNewPassWord] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newUsername, setnewUsername] = useState('')

  const [newAccountSettings, setNewAccountSettings] = useState({
    two_factor_authentication: false,
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  })

  // @ts-expect-error
  const { data } = useQuery({ queryKey: ['user_profile'], queryFn: getUser })

  const { username, email }: { username: string; email: string } = data ?? {}
  const Initial = username?.charAt(0)?.toUpperCase()
  return (
    <div className="mx-auto max-w-lg space-y-4 px-2 py-4">
      <div className="-ml-1 flex items-center gap-x-4 pb-2">
        <button className="h-14 w-14 rounded-full bg-white p-2">
          <span className="text-2xl font-black">{Initial}</span>
        </button>
        <div className="flex flex-col  gap-x-4">
          <p className="font-medium text-blue-700">@{username}</p>
          <p className="font-medium text-blue-700">{email}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="w-full space-y-1">
          <p className="text-sm text-light">Email</p>
          <input
            autoComplete="email"
            value={newAccountSettings.email}
            onChange={(e) => setNewAccountSettings({ ...newAccountSettings, email: e.target.value })}
            placeholder={email}
            className="w-full max-w-lg rounded-lg border border-light bg-transparent p-2 text-light "
            type="text"
          />
        </div>
        <div className="w-full space-y-1">
          <p className="text-sm text-light">Username</p>
          <input
            value={newAccountSettings.username}
            onChange={(e) => setNewAccountSettings({ ...newAccountSettings, username: e.target.value })}
            placeholder={username}
            className="w-full max-w-lg rounded-lg border border-light bg-transparent p-2 text-light "
            type="text"
          />
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-xl font-semibold text-light">Account Security</p>
        <div className="w-full space-y-1">
          <p className="text-sm text-light">Change Password</p>
          <input
            value={newAccountSettings.password}
            onChange={(e) => setNewAccountSettings({ ...newAccountSettings, password: e.target.value })}
            placeholder={'Password'}
            className="w-full max-w-lg rounded-lg border border-light bg-transparent p-2 text-light "
            type="password"
          />
        </div>
        {newAccountSettings.password && (
          <div className="w-full space-y-1">
            <p className="text-sm text-light">Confirm new Password</p>
            <input
              value={newAccountSettings.confirmPassword}
              onChange={(e) => setNewAccountSettings({ ...newAccountSettings, confirmPassword: e.target.value })}
              placeholder={'Password'}
              className="w-full max-w-lg rounded-lg border border-light bg-transparent p-2 text-light "
              type="password"
            />
          </div>
        )}
        <CheckBoxField
          title="Enable 2FA"
          description="Receive 2FA authentication email when you sign in."
          checked={newAccountSettings.two_factor_authentication}
          setChecked={() => setNewAccountSettings({ ...newAccountSettings, two_factor_authentication: !enable2FA })}
        />
      </div>

      <Button
        onClick={() => console.log(newAccountSettings)}
        disabled={!newAccountSettings.email}
        className="w-full bg-fuchsia-500"
      >
        <span className="text-lg">Save</span>
      </Button>
    </div>
  )
}

function NotificationSettings(params: type) {
  const [marketingEmails, setmarketingEmails] = useState(true)
  const [eventEmails, seteventEmails] = useState(true)

  const [notificationSettings, setNotificationSettings] = useState({
    marketing_emails: true,
    event_emails: true,
    direct_messages: true,
    posts_emails: true,
  })

  return (
    <div className="mx-auto max-w-lg space-y-4 p-2">
      <p className="font-medium text-light">Email Notifications</p>
      <div className="w-full space-y-2">
        <CheckBoxField
          title="Marketing Emails"
          description="Receive emails about new products, features, and more."
          checked={marketingEmails}
          setChecked={() => setNotificationSettings({ ...notificationSettings, marketing_emails: !marketingEmails })}
        />
        <CheckBoxField
          title="Event Emails"
          description="Receive remainder emails about your upcoming events."
          // checked={eventEmails}
          setChecked={() => setNotificationSettings({ ...notificationSettings, event_emails: !eventEmails })}
        />
        <CheckBoxField
          title="Direct Messages"
          description="Get Notified when you have a new direct message."
          // checked={eventEmails}
          setChecked={() => setNotificationSettings({ ...notificationSettings, event_emails: !eventEmails })}
        />

        <CheckBoxField
          title="Posts"
          description="Get Notified when bunnies you follow uploads a new post."
          // checked={eventEmails}
          setChecked={() => setNotificationSettings({ ...notificationSettings, event_emails: !eventEmails })}
        />
        <div className="pt-4">
          <Button className="w-full bg-fuchsia-500 ">Save</Button>
        </div>
      </div>
    </div>
  )
}

function PrivacyAndSafety(params: type) {
  const [enable2FA, setEnable2FA] = useState(false)
  const [privacySettings, setprivacySettings] = useState({
    public_balance: false,
    public_profile: false,
    sessions: false,
  })
  return (
    <div className="mx-auto max-w-lg space-y-4 px-2 py-2">
      <p className="text-lg font-medium text-light">Privacy and security</p>
      <CheckBoxField
        title="Public Balance"
        description="Allow Bunnies see your credits."
        checked={privacySettings.public_balance}
        setChecked={() => setprivacySettings({ ...privacySettings, public_balance: !enable2FA })}
      />
      <CheckBoxField
        title="Public Profile"
        description="Allow bunnies send me direct messages first."
        checked={privacySettings.public_profile}
        setChecked={() => setprivacySettings({ ...privacySettings, public_profile: !enable2FA })}
      />
      <CheckBoxField
        title="Sessions"
        description="Allow your account to be used across multiple devices."
        checked={privacySettings.sessions}
        setChecked={() => setprivacySettings({ ...privacySettings, sessions: !enable2FA })}
      />
      <div className="pt-4">
        <Button className="w-full bg-fuchsia-500 ">Save</Button>
      </div>
    </div>
  )
}

function PaymentsAndBilling(params: type) {
  const [enable2FA, setEnable2FA] = useState(false)
  return (
    <div className="py-10">
      <svg className="mx-auto h-[400px] w-[600px] border">
        <line y1={30} y2={-20} x1={0} x2={45} stroke="red" strokeWidth={5} />
        <line y1={30} y2={'100%'} x1={0} x2={0} stroke="blue" strokeWidth={5} />
        <line y1={'100%'} y2={'100%'} x1={'30%'} x2={'100%'} stroke="green" strokeWidth={5} />
      </svg>
    </div>
  )
}
function Referrals(params: type) {
  const [ref_link, setEnable2FA] = useState('ukpesi be malu')
  const [value, copy] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)
  const [milestoneAlert, setMilestoneAlert] = useState(false)

  function handleCopied(params: type) {
    setCopied(true)
    copy(ref_link)
    toast.success('Copied to clipboard')
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 px-2 py-4">
      <div className="">
        <p className="text-lg font-medium text-light">Your referral link</p>
        <div className="flex items-center justify-between">
          <span className="primary-text  text-light">{ref_link}</span>
          <motion.span
            className="cursor-pointer"
            animate={copied ? { scale: 1.4, color: 'green' } : { scale: 0.9, color: 'white' }}
          >
            <Clipboard onClick={handleCopied} size={20} />
          </motion.span>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-white/10 px-2 py-4">
        <p className="text-lg font-medium text-light">Total Referrals</p>
        <p className="text-lg font-medium text-light">0</p>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-white/10 px-2 py-4">
        <p className="text-lg font-medium text-light">Next milestone</p>
        <p className="text-lg font-medium text-light">10</p>
      </div>
      <CheckBoxField
        title="Receive Milestone Alerts"
        description="Get email notifications when you reach your next milestone."
        checked={milestoneAlert}
        setChecked={setMilestoneAlert}
      />
      <CheckBoxField
        title="Referrals"
        description="Get Notified when someone signs up using your referral link."
        // checked={eventEmails}
        setChecked={setMilestoneAlert}
      />
      <Button className="w-full bg-fuchsia-500">
        <span className="text-lg">Save</span>
      </Button>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

// TODO : ADD SETTINGS LOGIC

export function UserProfile() {
  async function getUserSettings(params: type) {
    const _id = localStorage.getItem('_id')
    const res = await fetch(`http://192.168.100.16:3000/users/settings?_id=${_id}`)
    const data = await res.json()
    const { settings } = data
    return settings
  }

  const { data: settings, isLoading } = useQuery(['settings'], getUserSettings)

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="scrollbar-hidden  space-y-2 overflow-scroll  pb-24  ">
      {/* <div className="mx-auto max-w-md space-y-4 py-4">
      
        
      </div> */}
      <Routes>
        <Route path="/" element={<AllSettingsList />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route path="/notifications" element={<NotificationSettings />} />
        <Route path="/privacy" element={<PrivacyAndSafety />} />
        <Route path="/billing" element={<PaymentsAndBilling />} />
        <Route path="/referral" element={<Referrals />} />
      </Routes>
    </div>
  )
}

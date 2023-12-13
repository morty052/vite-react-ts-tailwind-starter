import { useSignUp } from '@clerk/clerk-react'
import { useState } from 'react'
import { Button } from 'src/components/ui/button'

async function createNewUser(email: string, username: string) {
  const res = await fetch(`http://192.168.100.16:3000/users/create?email=${email}&username=${username}`)
  const data = await res.json()
  const { error } = data

  if (!error) {
    console.log('user created')
  } else console.error('something went wrong')
}

export function SignUpPage() {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const { isLoaded, signUp, setActive } = useSignUp()

  if (!isLoaded) {
    // handle loading state
    return null
  }

  async function submit(e) {
    e.preventDefault()
    // Check the sign up response to
    // decide what to do next.
    await signUp
      .create({
        emailAddress,
        password,
        username,
      })
      .then((result) => {
        if (result.status === 'complete') {
          console.log(result)
          setActive({ session: result.createdSessionId })
        } else {
          console.log(result)
        }
      })
      .catch((err) => console.error('error', err.errors[0].longMessage))

    await createNewUser(emailAddress, username)
  }

  return (
    <div className="">
      <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
      <input value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} type="text" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
      <Button onClick={(e) => submit(e)}>Submit</Button>
    </div>
  )
}

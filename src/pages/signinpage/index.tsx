import { useSignIn, SignIn } from '@clerk/clerk-react'

export function SignInPage() {
  const { isLoaded, signIn } = useSignIn()

  if (!isLoaded) {
    // handle loading state
    return null
  }

  return <SignIn redirectUrl={'/dashboard'} />
}

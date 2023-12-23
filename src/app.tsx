import React, { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Toaster } from 'react-hot-toast'
import './styles/app.css'
import { ChatContextProvider } from './contexts/ChatContext'
import { ClerkProvider } from '@clerk/clerk-react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function App() {
  const queryClient = useMemo(() => new QueryClient({}), [])

  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={clerkPubKey}>
        <ChatContextProvider>
          <RouterProvider router={router} />
        </ChatContextProvider>
        <Toaster />
      </ClerkProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

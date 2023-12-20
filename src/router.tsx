import { createBrowserRouter, createRoutesFromChildren, Route } from 'react-router-dom'
import ErrorPage from './components/error-page'
import { Home, DashBoard, SignUpPage, SignInPage, Pricing, Onboarding } from './pages'

export const routerObjects = [
  {
    path: '/',
    Component: <Home />,
  },
  {
    path: '/dashboard/*',
    Component: <DashBoard />,
  },
  {
    path: '/signin',
    Component: <SignInPage />,
  },
  {
    path: '/signup',
    Component: <SignUpPage />,
  },
  {
    path: '/pricing',
    Component: <Pricing />,
  },
  {
    path: '/onboarding/*',
    Component: <Onboarding />,
  },
  {
    path: '*',
    Component: <ErrorPage />,
  },
]

const allRoutes = routerObjects.map((router) => {
  const { path, Component } = router
  return <Route key={path} path={path} element={Component} errorElement={<ErrorPage />} />
})

export const router = createBrowserRouter(createRoutesFromChildren(allRoutes))

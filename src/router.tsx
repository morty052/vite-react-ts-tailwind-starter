import { createBrowserRouter, createRoutesFromChildren, Route } from 'react-router-dom'
import ErrorPage from './components/error-page'
import { Home, DashBoard, SignUpPage, SignInPage } from './pages'

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
    path: '*',
    Component: <ErrorPage />,
  },
]

const allRoutes = routerObjects.map((router) => {
  const { path, Component } = router
  return <Route key={path} path={path} element={Component} errorElement={<ErrorPage />} />
})

export const router = createBrowserRouter(createRoutesFromChildren(allRoutes))

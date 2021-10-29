import React, { useEffect } from 'react'
import { Router, Switch } from 'react-router-dom'
import { GuardProvider, GuardedRoute } from 'react-router-guards'
import { createBrowserHistory } from 'history';
import { getAuth } from '@firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import Auth from './pages/Auth'
import Home from './pages/Home'
import DefaultLayout from './layouts/DefaultLayout'
import AdminLayout from './layouts/AdminLayout'
import { isAuthenticated } from './utils/auth'

const history = createBrowserHistory();

const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (isAuthenticated()) { next(); return }
    next.redirect('/auth')
    return
  } else if (to.match.path === '/auth' && isAuthenticated()) {
    next.redirect('/')
    return
  } else {
    next()
  }
}

const buildRoute = (Component, path, props = {}, LayoutComponent = AdminLayout, isGuarded = true) => ({
  Component: () => (
    <LayoutComponent>
      <Component {...props} />
    </LayoutComponent>
  ),
  path,
  props,
  isGuarded
})

const routes = [
  buildRoute(Home, '/'),
  buildRoute(Auth, '/auth', {}, DefaultLayout, false),
]

const AppRouter = () => {
  const auth = getAuth()
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (!loading && user === null) {
      localStorage.setItem('IS_LOGGED_IN', false)
      history.push('/auth')
    } else if (!loading && user !== null) {
      localStorage.setItem('IS_LOGGED_IN', true)
      if (history?.location?.pathname === '/auth') {
        history.push('/')
      }
    }
  }, [user, loading])

  return (
    <Router history={history}>
      <GuardProvider guards={[ requireLogin ]} loading={() => 'loading'} error={() => 'route not found'}>
        <Switch>
          {
            routes.map(({ path, Component, props = {}, isGuarded }) => (
              <GuardedRoute path={path} key={path} exact meta={isGuarded ? { auth: true } : {}}>
                <Component {...props} loading={loading} />
              </GuardedRoute>
            ))
          }
        </Switch>
      </GuardProvider>
    </Router>
  )
}

export default AppRouter

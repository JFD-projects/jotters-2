import React from 'react'

import DropdownBtn from '../../../formElements/dropdownBtn'
import { useLogin } from '../../../../hooks/useLogin'
import LoginForm from './loginForm'
import { Route, Switch } from 'react-router-dom'
import RegisterForm from './registerForm'
import ProfileForm from './profileForm'
import LogoutForm from './logoutForm'

const LoginBtn = () => {
  const {paramsDropdownBtn} = useLogin()

  // let {url} = useRouteMatch()
  // if (!url.endsWith('/login')) {
  //   url += '/login'
  // }

  return (
    <>
      <div className="header__user-name">
        {paramsDropdownBtn.label}
      </div>

      <DropdownBtn params={paramsDropdownBtn}/>

      <Switch>
        <Route path={[
          '/info/login',
          '/public/login',
          '/public/:noteId/login'
        ]}><LoginForm/></Route>
        <Route path={[
          '/info/register',
          '/public/register',
          '/public/:noteId/register'
        ]}><RegisterForm/></Route>
        <Route path={[
          '/info/profile',
          '/public/profile',
          '/public/:noteId/profile'
        ]}><ProfileForm/></Route>
        <Route path={[
          '/info/logout',
          '/public/logout',
          '/public/:noteId/logout'
        ]}><LogoutForm/></Route>
      </Switch>
    </>)
}

export default LoginBtn

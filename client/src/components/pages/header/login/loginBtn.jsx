import React from 'react'

import DropdownBtn from '../../../formElements/dropdownBtn'
import LoginProvider from '../../../../hooks/useLogin'
import useLoginDropdown from '../../../../hooks/useLoginDropdown'

const LoginBtn = () => {
  const {paramsDropdownBtn, renderLoginCard} = useLoginDropdown()

  return (
    <>
      <LoginProvider>
        <div className="header__user-name">
          {paramsDropdownBtn.label}
        </div>

        <DropdownBtn params={paramsDropdownBtn}/>

        {renderLoginCard}
      </LoginProvider>
    </>)
}

export default LoginBtn

import React, {useEffect, useState} from 'react'
import {useLogin} from '../../hooks/useLogin'

const TextInputLogin = ({name, label, type = 'text'}) => {
  const {data, setData, errors, isTouched, setIsTouched, updateErrors} = useLogin()
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    updateErrors(name)
  }, [data[name]])

  const valueIsValid = !errors[name]
  const hasError = !valueIsValid && isTouched[name]

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const handleChange = (event) => {
    setData(prev => ({
      ...prev,
      [name]: event.target.value
    }))
  }

  const handleBlur = () => {
    setIsTouched(prev => ({
      ...prev,
      [name]: true
    }))
  }

  return (
    <div className="field has-validation">
      <input name={name}
             id={name}
             type={showPassword ? 'text' : type}
             value={data[name]}
             placeholder={label}
             onChange={handleChange}
             className={'field__input' + (hasError ? ' is-invalid' : '')}
             onBlur={handleBlur}/>

      <label htmlFor={name} className="field__label">
        {label}
      </label>

      {type === 'password' &&
      <button className="field__btn"
              type="button"
              onClick={toggleShowPassword}>
        <svg className={'field__icon'}>
          {showPassword
            ? <use xlinkHref="/sprite.svg#icon-visibility_off"/>
            : <use xlinkHref="/sprite.svg#icon-visibility_on"/>}
        </svg>
      </button>}

      {hasError &&
      <div className="invalid-feedback">
        {errors[name]}
      </div>}
    </div>
  )
}

export default TextInputLogin

import React, { useState } from 'react'

const TextInputLogin = ({name, label, type = 'text', value, onChange, onBlur, error, isTouched}) => {
  const [showPassword, setShowPassword] = useState(false)

  const valueIsValid = !error
  const hasError = !valueIsValid && isTouched

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const handleChange = (event) => {
    onChange({name: event.target.name, value: event.target.value})
  }

  const handleBlur = (event) => {
    onBlur({name: event.target.name})
  }

  return (
    <div className="field has-validation">
      <input name={name}
             id={name}
             type={showPassword ? 'text' : type}
             value={value}
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
        {error}
      </div>}
    </div>
  )
}

export default TextInputLogin

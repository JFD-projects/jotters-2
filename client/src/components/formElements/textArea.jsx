import React from 'react'

const TextArea = ({name, label, value, onChange, onBlur, error, isTouched}) => {
  const valueIsValid = !error
  const hasError = !valueIsValid && isTouched

  const handleChange = (event) => {
    onChange({name: event.target.name, value: event.target.value})
  }

  const handleBlur = (event) => {
    onBlur({name: event.target.name})
  }

  return (
    <div className="field has-validation">
      <textarea name={name}
             id={name}
             value={value}
             placeholder={label}
             onChange={handleChange}
             className={'field__input' + (hasError ? ' is-invalid' : '')}
             onBlur={handleBlur}/>

      <label htmlFor={name} className="field__label">
        {label}
      </label>

      {hasError &&
      <div className="invalid-feedback">
        {error}
      </div>}
    </div>
  )
}

export default TextArea

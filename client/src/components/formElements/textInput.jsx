import React from 'react'

const TextInput = ({name, label, type = 'text', value, onChange, error}) => {
  const handleChange = (event) => {
    onChange({name: event.target.name, value: event.target.value})
  }

  return (
    <div className="field">
      <input name={name}
             id={name}
             type={type}
             value={value}
             placeholder={label}
             onChange={handleChange}
             className={'field__input' + (error ? ' is-invalid' : '')}/>

      <label htmlFor={name} className="field__label">
        {label}
      </label>

      {error &&
        <div className="invalid-feedback">
          {error}
        </div>}
    </div>
  )
}

export default TextInput

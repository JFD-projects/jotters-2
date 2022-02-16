import React from 'react'

const Radio = ({name, label, onChange, radioButtons}) => {
  const handleChange = (event) => {
    onChange({
      name: event.target.name,
      value: event.target.value
    })
  }

  return (
    <div className="form-check">
      <h2 className="form-check__label">
        {label}
      </h2>

      {radioButtons.map(r => (
        <div key={r.value} className="check-element">
          <input name={name}
                 value={r.value}
                 checked={r.checked}
                 onChange={handleChange}
                 type="radio"
                 className="check-element__input"
                 id={name + r.value}/>
          <label className="check-element__label"
                 htmlFor={name + r.value}>
            {r.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Radio

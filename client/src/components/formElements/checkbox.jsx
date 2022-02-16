import React from 'react'

const Checkbox = ({name, label, onChange, checkboxItems = []}) => {
  const handleChange = (event) => {
    onChange({
      name: event.target.id,
      value: event.target.checked
    })
  }

  return (
    <div className="form-check">
      <h2 className="form-check__label">
        {label}
      </h2>

      {checkboxItems.map(c => (
        <div key={c._id} className="check-element">
          <input name={name}
                 value=""
                 checked={c.selected}
                 onChange={handleChange}
                 type="checkbox"
                 className="check-element__input"
                 id={c._id}/>
          <label className="check-element__label"
                 htmlFor={c._id}>
            {c.name}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Checkbox

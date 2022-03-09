import React, {useState} from 'react'

const ColorPicker = ({name, label, value, colors, onChange}) => {
  const [selectedColor, setSelectedColor] = useState(value)

  const handleSelect = (color) => {
    setSelectedColor(color)
    onChange({name, value: color})
  }

  return (
    <div className="field field__color-picker">
      {colors.map((color, idx) => (
        <div className={'field__color-circle' + (color === selectedColor ? ' selected' : '')}
             style={{'background': (color === selectedColor ? color : 'transparent'), 'borderColor': color}}
             onClick={() => handleSelect(color)}
             key={idx}/>
      ))}

      <label htmlFor={name} className="field__label">
        {label}
      </label>

    </div>
  )
}

export default ColorPicker

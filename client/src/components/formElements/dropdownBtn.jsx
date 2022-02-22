import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

const DropdownBtn = ({params}) => {
  const {img, title, isBig = false, items} = params
  const [open, setOpen] = useState(false)
  const dropdown = useRef(null)

  const history = useHistory()
  const {url} = useRouteMatch()

  const handleClickOutside = event => {
    if (dropdown.current && !dropdown.current.contains(event.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  const handleSelect = (action) => {
    setOpen(false)
    history.push(`${url}/${action}`)
  }

  return (
    <>
      <div className={'dropdown' + (open ? (' dropdown--z') : '') + (isBig ? (' dropdown--big') : '')}
           ref={dropdown}>
        <button className={'dropdown__btn'}
                type="button"
                onClick={() => setOpen(!open)}>
          {img}
        </button>

        <ul className={'dropdown__menu' + (open ? (' dropdown__menu--show') : '')}>
          <li className="dropdown__title">
            {title}
          </li>

          {items.map(({action, title, img, disabled}) =>
            <li key={action}
                className="dropdown-item">
              <button className="dropdown-item__btn"
                // to={"/info/login"}
                      onClick={() => handleSelect(action)}
                      disabled={disabled}>
                {img}
                <span>{title}</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}

export default DropdownBtn

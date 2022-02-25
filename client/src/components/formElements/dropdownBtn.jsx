import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { showModal } from '../../store/modalSlice'
import i18next from 'i18next'

const DropdownBtn = ({params}) => {
  const dispatch = useDispatch()
  const {img, title, isBig = false, items, data} = params
  const [open, setOpen] = useState(false)
  const dropdown = useRef(null)

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
    if (['en', 'ru'].includes(action)) {
      i18next.changeLanguage(action)
    } else {
      dispatch(showModal({currentModal: action, data}))
    }
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

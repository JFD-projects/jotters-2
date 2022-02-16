import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Sidebar from './common/sidebar'
import useDebounceState from '../../../hooks/useDebounce'
import Radio from '../../formElements/radio'
import Checkbox from '../../formElements/checkbox'

const DELIMITER = String.fromCodePoint(9733)

const PublicNotesSidebar = ({search, sort, users, onSearch, onSort, onSelect, ...rest}) => {
  const {t} = useTranslation()
  const [localSearch, setLocalSearch] = useState(search)
  const [localUsers, setLocalUsers] = useState(users)
  const [debounce, setDebounce] = useDebounceState(DELIMITER, 500)

//========================= Charge debounce on change checkbox =========================
  useEffect(() => {
    if (localUsers) {
      const debounceLeft = debounce.slice(0, debounce.indexOf(DELIMITER) + 1)
      setDebounce(debounceLeft + localUsers.reduce((acc, i) => (i.selected ? (acc + i._id) : (acc + '')), ''))
    }
  }, [localUsers])

//========================= Charge debounce on search string =========================
  useEffect(() => {
      const debounceRight = debounce.slice(debounce.indexOf(DELIMITER))
      setDebounce(localSearch + debounceRight)
  }, [localSearch])
//=========================

  useEffect(() => {
    onSearch(localSearch)
    onSelect(localUsers)
  }, [debounce])

  useEffect(() => {
    setLocalUsers(users)
  }, [users])

  const handleSearch = (event) => {
    setLocalSearch(event.target.value)
  }

  const handleSelect = ({name, value}) => {
    setLocalUsers(prev => {
      return prev.map(i => i._id === name ? {...i, selected: value} : i)
    })
  }

  return (
    <Sidebar {...rest}>

      <input name="search"
             value={localSearch}
             onChange={handleSearch}
             type="text"
             className="search-input"
             placeholder={t('SEARCH_PLACEHOLDER')}/>

      <Radio name="sort"
             label={t('SORT')}
             onChange={onSort}
             radioButtons={[
               {label: t('BY_DATE'), checked: sort === 'byDate', value: 'byDate'},
               {label: t('BY_NAME'), checked: sort === 'byName', value: 'byName'}
             ]}/>

      <Checkbox name="checkbox"
                label={t('FILTER')}
                onChange={handleSelect}
                checkboxItems={localUsers}
      />

    </Sidebar>
  )
}

export default PublicNotesSidebar

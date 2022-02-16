import React from 'react'
import {useTranslation} from 'react-i18next'
import Sidebar from './common/sidebar'
import Radio from '../../formElements/radio'

const JottersSidebar = ({sort, filter, onSort, onFilter, onAddNewJotter, ...rest}) => {
  const {t} = useTranslation()

  return (
    <Sidebar {...rest}>

      <Radio name="sort"
             label={t('SORT')}
             onChange={onSort}
             radioButtons={[
               {label: t('BY_DATE'), checked: sort === 'byDate', value: 'byDate'},
               {label: t('BY_NAME'), checked: sort === 'byName', value: 'byName'}
             ]}/>

      <Radio name="filter"
             label={t('FILTER')}
             onChange={onFilter}
             radioButtons={[
               {label: t('ALL_JOTTERS'), checked: filter === 'all', value: 'all'},
               {label: t('WITH_PUBLIC_NOTES'), checked: filter === 'withPublicNotes', value: 'withPublicNotes'}
             ]}/>

      {/*<button className="btn btn--primary"*/}
      {/*        onClick={onAddNewJotter}>*/}
      {/*  {t('NEW_JOTTER')}*/}
      {/*</button>*/}
    </Sidebar>
  )
}

export default JottersSidebar

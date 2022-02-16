import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import JottersSidebar from '../pages/sidebar/jottersSidebar'
import Jotters from '../pages/main/jotters/jotters'
import Layout from './common/layout'
import useJotterControlDropdown from '../../hooks/useJotterControlDropdown'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewJotter, deleteJotter, getJottersList, getJottersLoadingStatus, loadJotters, updateJotter
} from '../../store/jotterSlice'
import Spinner from '../common/spinner'
import { getCurrentUser } from '../../store/authSlice'

const JottersLayout = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [sort, setSort] = useState('byDate')
  const [filter, setFilter] = useState('all')
  const jotters = useSelector(getJottersList(filter, sort))
  const jottersIsLoading = useSelector(getJottersLoadingStatus())
  const currentUser = useSelector(getCurrentUser())

  const {
    paramsDropdownBtn, showSettingsCard, hideDeleteConfirm, renderControlDropdown
  } = useJotterControlDropdown(handleUpdateJotter, handleDeleteJotter)

  useEffect(() => {
    dispatch(loadJotters())
  }, [])

  const handleSort = ({value}) => {
    setSort(value)
  }

  const handleFilter = ({value}) => {
    setFilter(value)
  }

  const onAddNewJotter = () => {
    showSettingsCard()
  }

  function handleDeleteJotter(id) {
    dispatch(deleteJotter(id))
    hideDeleteConfirm()
  }

  function handleUpdateJotter(jotter) {
    if (jotter._id) {
      dispatch(updateJotter(jotter))
    } else {
      dispatch(addNewJotter(jotter, currentUser._id))
    }
  }

  return (<>
    <Layout title={jotters ? t('PRIVATE_JOTTERS') : '...'}>
      <JottersSidebar sort={sort}
                      filter={filter}
                      onSort={handleSort}
                      onFilter={handleFilter}
                      onAddNewJotter={onAddNewJotter}/>

      {jottersIsLoading
        ? <Spinner/>

        : <Jotters jotters={jotters}
                   paramsDropdownBtn={paramsDropdownBtn}
                   onAddNewJotter={onAddNewJotter}/>
      }

    </Layout>

    {renderControlDropdown}
  </>)
}

export default JottersLayout

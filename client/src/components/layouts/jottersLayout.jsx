import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import JottersSidebar from '../pages/sidebar/jottersSidebar'
import Jotters from '../pages/main/jotters/jotters'
import Layout from './common/layout'
import { useDispatch, useSelector } from 'react-redux'
import { getJottersList, getJottersLoadingStatus, loadJotters } from '../../store/jotterSlice'
import Spinner from '../common/spinner'
import { updateBreadcrumbs } from '../../store/breadcrumbsSlice'
import { PRIVATE_BREADCRUMBS } from '../../utils/helpers'

const JottersLayout = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [sort, setSort] = useState('byDate')
  const [filter, setFilter] = useState('all')
  const jotters = useSelector(getJottersList(filter, sort))
  const jottersIsLoading = useSelector(getJottersLoadingStatus())

  useEffect(() => {
    dispatch(loadJotters())
    dispatch(updateBreadcrumbs(PRIVATE_BREADCRUMBS))
  }, [])

  const handleSort = ({value}) => {
    setSort(value)
  }

  const handleFilter = ({value}) => {
    setFilter(value)
  }

  return (<>
    <Layout title={jotters ? t('PRIVATE_JOTTERS') : '...'}>
      <JottersSidebar sort={sort}
                      filter={filter}
                      onSort={handleSort}
                      onFilter={handleFilter}/>

      {jottersIsLoading
        ? <Spinner/>

        : <Jotters jotters={jotters}/>
      }
    </Layout>
  </>)
}

export default JottersLayout

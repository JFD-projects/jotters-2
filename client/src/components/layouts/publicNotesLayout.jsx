import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PublicNotesSidebar from '../pages/sidebar/publicNotesSidebar'
import PublicNotesPage from '../pages/main/publicNotes/publicNotesPage'
import Layout from './common/layout'
import selectUsersFromNotes from '../../utils/selectUsersFromNotes'
import { useSelector } from 'react-redux'
import { getLoadingStatus, getPublicNotesList } from '../../store/publicNoteSlice'
import PublicNoteLoader from '../hoc/publicNoteLoader'

const PublicNotesLayout = () => {
  const {t} = useTranslation()
  // const dispatch = useDispatch()
  const [users, setUsers] = useState()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('byDate')
  const publicNotes = useSelector(getPublicNotesList(sort))
  const publicNotesIsLoading = useSelector(getLoadingStatus())

  // useEffect(() => {
  //   dispatch(loadPublicNotes())
  // }, [])

  useEffect(() => {
    if (!publicNotesIsLoading) {
      setUsers(selectUsersFromNotes(publicNotes))
    }
  }, [publicNotesIsLoading])

  const handleSearch = (value) => {
    setSearch(value)
  }

  const handleSort = ({value}) => {
    setSort(value)
  }

  const handleSelect = (localUsers) => {
    setUsers(localUsers)
  }

  const filterNotes = () => {
    let filtered = publicNotes

    if (publicNotes && search) {
      filtered = filtered.filter(note => note.title.toLowerCase().includes(search.toLowerCase()))
    }

    if (publicNotes && users) {
      const selectedUserList = users.filter(user => user.selected === true).map(user => user._id)
      filtered = filtered.filter(note => selectedUserList.includes(note.userId))
    }

    return filtered
  }

  const filteredNotes = filterNotes()

  return (
    <PublicNoteLoader>
      <Layout title={publicNotesIsLoading ? '...' : t('PUBLIC_NOTES')}>
        <PublicNotesSidebar search={search}
                            sort={sort}
                            users={users}
                            onSearch={handleSearch}
                            onSort={handleSort}
                            onSelect={handleSelect}/>
        <PublicNotesPage notes={filteredNotes}/>
      </Layout>
    </PublicNoteLoader>
  )
}

export default PublicNotesLayout

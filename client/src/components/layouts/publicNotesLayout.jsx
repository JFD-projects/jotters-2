import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PublicNotesSidebar from '../pages/sidebar/publicNotesSidebar'
import PublicNotesPage from '../pages/main/publicNotes/publicNotesPage'
import Layout from './common/layout'
// import {sortArrayBy} from '../../utils/helpers'
import selectUsersFromNotes from '../../utils/selectUsersFromNotes'
// import useNotes from '../../hooks/useNotes'
import { useDispatch, useSelector } from 'react-redux'
import { getLoadingStatus, getPublicNotesList, loadPublicNotes } from '../../store/publicNoteSlice'

const PublicNotesLayout = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  // const [notes, setNotes] = useState([])
  const [users, setUsers] = useState()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('byDate')
  const publicNotes = useSelector(getPublicNotesList(sort))
  const publicNotesIsLoading = useSelector(getLoadingStatus())
  // const {fetchPublicNotes} = useNotes()

  useEffect(() => {
    // fetchPublicNotes().then(data => {
    //   setNotes(sortArrayBy(sort, data))
    //   const users = selectUsersFromNotes(data)
    //   setUsers(users)
    // })
    dispatch(loadPublicNotes())
  }, [])

  useEffect(() => {
    if (!publicNotesIsLoading) {
      setUsers(selectUsersFromNotes(publicNotes))
    }
  }, [publicNotesIsLoading])

  // useEffect(() => {
  //   setNotes(sortArrayBy(sort, notes))
  // }, [sort])

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
    <Layout title={publicNotesIsLoading ? '...' : t('PUBLIC_NOTES')}>
      <PublicNotesSidebar search={search}
                          sort={sort}
                          users={users}
                          onSearch={handleSearch}
                          onSort={handleSort}
                          onSelect={handleSelect}/>
      <PublicNotesPage notes={filteredNotes}/>
    </Layout>
  )
}

export default PublicNotesLayout

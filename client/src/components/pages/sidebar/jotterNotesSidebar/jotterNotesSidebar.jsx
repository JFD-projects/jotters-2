import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import NoteItem from './noteItem'
import Spinner from '../../../common/spinner'
import Sidebar from '../common/sidebar'
import { addNewNote, getNotesList, getNotesLoadingStatus } from '../../../../store/noteSlice'

const JotterNotesSidebar = ({jotterId, isMobile, hideSidebar, ...rest}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const notes = useSelector(getNotesList())
  const notesIsLoading = useSelector(getNotesLoadingStatus())

  const onHideMobileSideBar = () => {
    if (isMobile) {
      hideSidebar()
    }
  }

  const handleCreateNewNote = async () => {
    dispatch(addNewNote({jotterId, title: t('MY_NEW_NOTE')}))
  }

  if (notesIsLoading) {
    return <Spinner/>
  }

  return (
    <Sidebar {...{isMobile, hideSidebar, ...rest}}>
      <Link to="/jotters" className="btn btn--primary">
        <svg>
          <use xlinkHref="/sprite.svg#icon-chevron-left"/>
        </svg>
        <span>{t('JOTTERS')}</span>
      </Link>

      {!notes || notes.length === 0
        ? <p className="no-card">
          {t('NO_NOTES')}
        </p>
        : <ul className="items-block">
          {notes.map(note => <NoteItem key={note._id}
                                       note={note}
                                       onHideMobileSideBar={onHideMobileSideBar}/>)}
        </ul>}

      <button className="btn btn--secondary"
              onClick={handleCreateNewNote}>
        {t('NEW_NOTE')}
      </button>

    </Sidebar>
  )
}

export default JotterNotesSidebar

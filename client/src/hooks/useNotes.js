import jotterService from '../services/jotterService'
import noteService from '../services/noteService'
import {sortArrayBy} from '../utils/helpers'
import errorServiceOld from '../services/errorServiceOld'

const useNotes = (notes, setNotes, setSelectedNote) => {
  const {handleError} = errorServiceOld()

  const getJotter = async (id) => {
    try {
      const {data} = await jotterService.getById(id)
      return data
    } catch (err) {
      handleError(err)
    }
  }

  const fetchNotes = async (jotterId) => {
    try {
      const {data} = await noteService.fetchAll(jotterId)
      return data
    } catch (err) {
      handleError(err)
    }
  }

  const fetchPublicNotes = async () => {
    try {
      const {data} = await noteService.fetchPublic()
      return data
    } catch (err) {
      handleError(err)
    }
  }

  const getNote = async (id) => {
    if (notes) {
      return notes.find(n => n._id === id)
    }

    try {
      const {data} = await noteService.getById(id)
      return data
    } catch (err) {
      handleError(err)
    }
  }

  const updateNote = async (note) => {
    try {
      const {data} = await noteService.update(note._id, note)
      setNotes(prev => sortArrayBy('byDate', prev.map(n => (n._id === note._id ? data : n))))
      setSelectedNote(note)
    } catch (err) {
      handleError(err)
    }
  }

  const addNewNote = async (note) => {
    try {
      const {data} = await noteService.add(note)
      setNotes(prev => sortArrayBy('byDate', [...prev, data]))
      return data
    } catch (err) {
      handleError(err)
    }
  }

  const deleteNote = async (note) => {
    try {
      await noteService.delete(note._id)
    } catch (err) {
      handleError(err)
    }
  }

  return {getJotter, fetchNotes, getNote, updateNote, addNewNote, deleteNote, fetchPublicNotes}
}

export default useNotes

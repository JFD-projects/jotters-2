export default function selectUsersFromNotes(notes) {
  if (!notes) {
    return []
  }

  const usernameList = notes.map(note => ({
    _id: note.userId,
    name: note.userName,
    image: note.userImage,
    selected: true
  }))

  return usernameList
  .filter((item, index, self) => (
    index === self.findIndex(i => i._id === item._id)
  ))
  // .reduce((acc, i) => {
  //   return {...acc, [i._id]: {name: i.name, selected:true} }
  // }, {})
}

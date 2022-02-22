import PropTypes from 'prop-types'

export function sortArrayBy(sort, arr) {
  if (!Array.isArray(arr)) return

  const copyArr = [...arr]

  if (sort === 'byDate') {
    return copyArr.sort((a, b) => ( new Date(b.updatedAt) - new Date(a.updatedAt)))
  }

  if (sort === 'byName') {
    return copyArr.sort((a, b) => ((a.title > b.title) ? 1 : -1))
  }
}

sortArrayBy.propTypes = {
  sort: PropTypes.oneOf(['byDate', 'byName']).isRequired,
}


export function filterArrayBy(filter, arr) {
  if (!Array.isArray(arr)) return

  if (filter === 'all') {
    return arr
  }

  const copyArr = [...arr]

  if (filter === 'withPublicNotes') {
    return copyArr.filter(j => j.hasPublicNote === true)
  }
}

filterArrayBy.propTypes = {
  filter: PropTypes.oneOf(['all', 'withPublicNotes']).isRequired,
}

export function generateUserData() {
  return {
    image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
    .toString(36)
    .substring(7)}.svg`,
  }
}

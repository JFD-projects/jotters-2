export function validator(data, config) {
  const errors = {}
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod])
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }

  return errors
}

export function validateValue(value, config) {
  for (const validateMethod in config) {
    const error = validate(validateMethod, value, config[validateMethod])
    if (error) {
      return error
    }
  }

  return null
}

function validate(validateMethod, data, config) {
      if (data === undefined) {
        return null
      }
  switch (validateMethod) {
    case 'isRequired':
      if (typeof data === 'boolean') {
        if (!data) return config.message
      } else if (typeof data === 'object') {
        if (Object.keys(data).length === 0) return config.message
      } else {
        if (data.trim() === '') return config.message
      }
      break
    case 'isEmail':
      const emailRegExp = /^\S+@\S+\.\S+$/g
      if (!emailRegExp.test(data)) return config.message
      break
    case 'hasCapital':
      const capitalRegExp = /[A-Z]+/g
      if (!capitalRegExp.test(data)) return config.message
      break
    case 'hasNumber':
      const numberRegExp = /\d+/g
      if (!numberRegExp.test(data)) return config.message
      break
    case 'min':
      if (data.length < config.value) return config.message
      break
    case 'match':
      if (data !== config.value) return config.message
      break
    default:
      return null
  }
}

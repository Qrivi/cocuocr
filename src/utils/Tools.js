export default class Tools {
  static flatten (arrayOfObjects) {
    return arrayOfObjects.reduce((singleObject, currentObject) => {
      Object.keys(currentObject).forEach(key => {
        singleObject[key] = currentObject[key]
      })
      return singleObject
    }, {})
  }

  static format (readText) {
    return readText.trim() // Trim whitespace
      .replace(/[`‘|\\]/gm, '') // Remove classic misidentified pixels
      .replace(/\n/gm, ', ') // Replace new lines
      .trim() // Trim again
  }

  static sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

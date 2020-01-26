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
      .replace(/,\s*,/gm, ',') // Remove empty parts
      .replace(/v\/d/gmi, 'van de') // Write "van de" in full
      .replace(/, met/gmi, ' met')
      .replace(/, van/gmi, ' van')
      .replace(/, op/gmi, ' op')
      .replace(/, naar/gmi, ' naar')
      .replace(/, volgens/gmi, ' volgens')
      .replace(/, Provencale/gm, ' Provençale')
      .replace(/eggy-/gm, 'eggie')
      .replace(/erwije/gmi, 'erwtje')
      .trim() // Trim again
  }

  static sleep (s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000))
  }
}

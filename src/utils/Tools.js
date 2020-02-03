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
      .replace(/\s?\/\s?/gm, '/') // Remove spaces around slashes
      .replace(/v\/d/gmi, 'van de') // Write "van de" in full
      .replace(/(,? (met|volgens|op|van|naar|uit|en|&),?)/gmi, (m, s, p) => ` ${p.toLowerCase()}`) // Merge parts starting/ending with prepositions
      .replace(/, Provencale/gm, ' Provençale') // Correct spelling
      .replace(/eggy-?/gm, 'eggie') // Correct spelling
      .replace(/erwije/gmi, 'erwtje') // Common misread
      .trim() // Trim again
  }

  static sleep (s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000))
  }
}

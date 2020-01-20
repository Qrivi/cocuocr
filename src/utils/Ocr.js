import Constants from '../constants'
import Axios from 'axios'

import { createWorker, createScheduler } from 'tesseract.js'

export default class Ocr {
  static async readMenu (boxes) {
    let menu = null
    const results = []

    try {
      menu = await Axios.get(Constants.CORDA_MENU_HOMEPAGE)
        .then(response => response.data.match(Constants.CORDA_MENU_REGEX)[0])
        .then(image => Axios.get(image, { responseType: 'arraybuffer' }))
        .then(response => Buffer.from(response.data, 'binary'))
    } catch (error) {
      throw new Error('The Corda Cuisine website appears to be offline')
    }

    const scheduler = createScheduler()
    for (let i = boxes.length; i; i--) {
      const worker = createWorker()
      await worker.load()
      await worker.loadLanguage('nld')
      await worker.initialize('nld')
      scheduler.addWorker(worker)
    }

    for (let i = boxes.length; i; i--) {
      const rectangle = boxes[i - 1]
      results.push({
        day: rectangle.day,
        type: rectangle.type,
        data: await scheduler.addJob('recognize', menu, { rectangle }).then(result => result.data.text.trim())
      })
    }

    scheduler.terminate() // await? 🤔
    return results
  }
}

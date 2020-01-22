import Constants from '../constants'
import { createWorker, createScheduler } from 'tesseract.js'

export default class Ocr {
  async init (menu) {
    this.menu = menu
    this.scheduler = createScheduler()
    for (let i = 0; i !== Constants.TESSERACT_WORKERS; i++) {
      console.log(`[OCR] Creating Tesseract worker ${i + 1} of ${Constants.TESSERACT_WORKERS}...`)
      const worker = createWorker()
      await worker.load()
      await worker.loadLanguage('nld')
      await worker.initialize('nld')
      this.scheduler.addWorker(worker)
      console.log('[OCR] Created!')
    }
  }

  async read (column, logId) {
    for (const [cell] of Object.entries(column)) {
      console.log(`[OCR] Recognizing cell '${cell}'${logId ? ` (${logId})...` : '...'}`)
      column[cell].text = await this.scheduler.addJob('recognize', this.menu, { rectangle: column[cell] }).then(result => result.data.text.trim())
      console.log('[OCR] Recognized!')
    }
    return column
  }

  async kill () {
    console.log('[OCR] Killing the Tesseract scheduler...')
    return this.scheduler.terminate()
  }
}

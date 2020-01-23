import { createWorker, createScheduler } from 'tesseract.js'
import Constants from '../constants'
import Logger from './Logger'

export default class Ocr {
  async init (menu) {
    this.menu = menu
    this.scheduler = createScheduler()
    for (let i = 0; i !== Constants.TESSERACT_WORKERS; i++) {
      Logger.log(`[ocr] Creating Tesseract worker ${i + 1} of ${Constants.TESSERACT_WORKERS}...`, true)
      const worker = createWorker()
      await worker.load()
      await worker.loadLanguage('nld')
      await worker.initialize('nld')
      this.scheduler.addWorker(worker)
      Logger.success('Done!')
    }
  }

  async read (column, logId) {
    for (const [cell] of Object.entries(column)) {
      Logger.log(`[ocr] Recognizing cell '${cell}'${logId ? ` (${logId})...` : '...'}`, true)
      column[cell].text = await this.scheduler.addJob('recognize', this.menu, { rectangle: column[cell] }).then(result => result.data.text.trim())
      Logger.success('Done!')
    }
    return column
  }

  async kill () {
    Logger.log('[ocr] Silently killing the Tesseract scheduler...')
    return this.scheduler.terminate()
  }
}

import { createWorker, createScheduler } from 'tesseract.js'
import Constants from '../constants'
import Logger from '../utils/Logger'
import Tools from '../utils/Tools'

export default class OcrService {
  async init (menu) {
    this.menu = menu
    this.scheduler = createScheduler()

    this.activeWorkers = 0
    this.totalWorkers = (process.env.TESSERACT_WORKERS ? parseInt(process.env.TESSERACT_WORKERS) : Constants.DEFAULT_TESSERACT_WORKERS)

    // Asynchronously create and run workers
    const workers = []
    for (let i = 0; i !== this.totalWorkers; i++) {
      workers.push(async () => this.prepareWorker())
    }
    await Promise.all(workers.map(w => w()))
  }

  async read (column) {
    // Asynchronously create and run jobs
    const jobs = []
    for (const [name, rectangle] of Object.entries(column)) {
      jobs.push(async () => this.prepareJob(name, rectangle))
    }
    return Tools.flatten(await Promise.all(jobs.map(j => j())))
  }

  async kill () {
    Logger.log('[ocr] Silently killing the Tesseract scheduler...')
    this.activeWorkers = 0
    return this.scheduler.terminate()
  }

  async prepareWorker () {
    const worker = createWorker()
    const currentWorker = ++this.activeWorkers
    Logger.log(`[ocr] Asynchronously creating Tesseract worker ${currentWorker} of ${this.totalWorkers}...`)
    await worker.load()
    await worker.loadLanguage('nld')
    await worker.initialize('nld')
    this.scheduler.addWorker(worker)
    Logger.success(`[ocr] Created Tesseract worker ${currentWorker} of ${this.totalWorkers}!`)
  }

  async prepareJob (name, rectangle) {
    Logger.log(`[ocr] Asynchronously recognizing text in ${JSON.stringify(rectangle)} (${name})...`)
    const text = await this.scheduler.addJob('recognize', this.menu, { rectangle }).then(r => Tools.format(r.data.text))
    Logger.success(`[ocr] Found out that "${name}" is "${text}"!`)
    const result = {}
    result[name] = text
    return result
  }
}

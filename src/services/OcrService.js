import fs from 'fs'
import { createWorker, createScheduler } from 'tesseract.js'
import Constants from '../constants'
import Logger from '../utils/Logger'
import Tools from '../utils/Tools'

export default class OcrService {
  async init (menu) {
    this.menu = menu
    this.scheduler = createScheduler()

    this.activeWorkers = 0
    this.totalWorkers = parseInt(process.env.TESSERACT_WORKERS) || Constants.DEFAULT_TESSERACT_WORKERS

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
    return Promise.all(jobs.map(j => j()))
  }

  async kill () {
    Logger.log('OcrService', 'Silently killing the Tesseract scheduler…')
    fs.unlinkSync('./nld.traineddata')
    // Removing the traineddata should not be necessary but for some yet unknown reason Tesseract.js errors out on 2nd or 3rd run if we keep it.
    this.activeWorkers = 0
    return this.scheduler.terminate()
  }

  async prepareWorker () {
    const worker = createWorker()
    const currentWorker = ++this.activeWorkers
    Logger.log('OcrService', `Asynchronously creating Tesseract worker ${currentWorker} of ${this.totalWorkers}…`)
    await worker.load()
    await worker.loadLanguage('nld')
    await worker.initialize('nld')
    this.scheduler.addWorker(worker)
    Logger.success('OcrService', `Created Tesseract worker ${currentWorker} of ${this.totalWorkers}!`)
  }

  async prepareJob (name, rectangle) {
    Logger.log('OcrService', `Asynchronously recognizing text in ${JSON.stringify(rectangle)} (${name})…`)
    const text = await this.scheduler.addJob('recognize', this.menu, { rectangle }).then(r => Tools.format(r.data.text))
    Logger.success('OcrService', `Found out that "${name}" is "${text}"!`)
    const result = {}
    result[name] = text
    return result
  }
}

import chalk from 'chalk'
import moment from 'moment'

export default class Logger {
  static timestamp () {
    return moment().format('DD/MM/YYYY HH:mm:ss')
  }

  static async log (tag, message, keepOpen) {
    return process.stdout.write(`${Logger.timestamp()}  [${tag}] ${message}${keepOpen ? ' ' : '\n'}`)
  }

  static async warning (tag, message, keepOpen) {
    return process.stdout.write(chalk.yellow(`${Logger.timestamp()}  [${tag}] ${message}${keepOpen ? ' ' : '\n'}`))
  }

  static async error (tag, message, keepOpen) {
    return process.stdout.write(chalk.red(`${Logger.timestamp()}  [${tag}] ${message}${keepOpen ? ' ' : '\n'}`))
  }

  static async success (tag, message, keepOpen) {
    return process.stdout.write(chalk.green(`${Logger.timestamp()}  [${tag}] ${message}${keepOpen ? ' ' : '\n'}`))
  }
}

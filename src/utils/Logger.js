import chalk from 'chalk'

export default class Logger {
  static timestamp () {
    return new Date().toLocaleString('en-gb')
  }

  static async log (tag, message, keepOpen) {
    return process.stdout.write(`${this.timestamp()}  [${tag}]  ${message}${keepOpen ? ' ' : '\n'}`)
  }

  static async warning (tag, message, keepOpen) {
    return process.stdout.write(chalk.yellow(`${this.timestamp()}  [${tag}]  ${message}${keepOpen ? ' ' : '\n'}`))
  }

  static async error (tag, message, keepOpen) {
    return process.stdout.write(chalk.red(`${this.timestamp()}  [${tag}]  ${message}${keepOpen ? ' ' : '\n'}`))
  }

  static async success (tag, message, keepOpen) {
    return process.stdout.write(chalk.green(`${this.timestamp()}  [${tag}]  ${message}${keepOpen ? ' ' : '\n'}`))
  }
}

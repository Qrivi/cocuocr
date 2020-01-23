import chalk from 'chalk'

export default class Logger {
  static async log (message, keepOpen) {
    return process.stdout.write(`${message}${keepOpen ? ' ' : '\n'}`)
  }

  static async warning (message, keepOpen) {
    return process.stdout.write(chalk.yellow(`${message}${keepOpen ? ' ' : '\n'}`))
  }

  static async error (message, keepOpen) {
    return process.stdout.write(chalk.red(`${message}${keepOpen ? ' ' : '\n'}`))
  }

  static async success (message, keepOpen) {
    return process.stdout.write(chalk.green(`${message}${keepOpen ? ' ' : '\n'}`))
  }
}

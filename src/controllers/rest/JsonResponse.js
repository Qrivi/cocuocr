export default class JsonResponse {
  constructor () {
    this.creationDate = new Date()
  }

  badRequest (res, message) {
    return this.send(res, 500, {
      error: message || 'Something was not properly programmed and broke.',
    })
  }

  notFound (res, subject) {
    return this.send(res, 404, {
      error: `${subject || 'The requested object'} does not exist.`,
    })
  }

  send (res, statusCode, data) {
    return res.status(statusCode)
      .json({
        statusCode,
        executionTimeInMs: new Date().getTime() - this.creationDate.getTime(),
        ...data,
      })
  }
}

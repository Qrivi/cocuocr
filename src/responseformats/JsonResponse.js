export default class JsonResponse {
  constructor () {
    this.creationDate = new Date()
  }

  unauthorized (res) {
    return this.send(res, 401, {
      error: 'You\'re not authorized to access this resource.',
    })
  }

  notFound (res, subject) {
    return this.send(res, 404, {
      error: `${subject || 'The requested object'} does not exist.`,
    })
  }

  badRequest (res, message) {
    return this.send(res, 500, {
      error: message || 'Something was not properly programmed and broke.',
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

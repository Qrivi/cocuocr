export default class SlackResponse {
  constructor (moment) {
    this.moment = moment
    this.soups = []
    this.dishes = []
    this.days = {
      type: 'static_select',
      placeholder: {
        type: 'plain_text',
        text: `Menu van *${moment.format('dddd D MMMM YYYY')}*`,
      },
      options: [
        {
          text: {
            type: 'plain_text',
            text: 'Maandag',
          },
          value: 'monday',
        },
        {
          text: {
            type: 'plain_text',
            text: 'Dinsdag',
          },
          value: 'tuesday',
        },
        {
          text: {
            type: 'plain_text',
            text: 'Woensdag',
          },
          value: 'wednesday',
        },
        {
          text: {
            type: 'plain_text',
            text: 'Donderdag',
          },
          value: 'thursday',
        },
        {
          text: {
            type: 'plain_text',
            text: 'Vrijdag',
          },
          value: 'friday',
        },
      ],
    }
  }

  addSoup (kind, soup) {
    this.soups.push({
      type: 'mrkdwn',
      text: `*${kind}*\n>${soup}`,
    })
  }

  addDish (kind, dish) {
    this.dishes.push({
      type: 'mrkdwn',
      text: `*${kind}*\n>${dish}`,
    })
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

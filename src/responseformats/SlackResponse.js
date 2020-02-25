export default class SlackResponse {
  constructor (moment) {
    this.soups = []
    this.dishes = []
    this.body = {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Menu van *${moment.format('dddd D MMMM YYYY')}*`,
          },
          accessory: {
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: `Week ${moment.format('W')}`,
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
          },
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

  send (res, statusCode, data) {
    return res.status(statusCode)
      .json({
        statusCode,
        executionTimeInMs: new Date().getTime() - this.creationDate.getTime(),
        ...data,
      })
  }
}

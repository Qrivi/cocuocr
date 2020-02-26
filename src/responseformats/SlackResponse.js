import Axios from 'axios'
import Logger from '../utils/Logger'

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
            text: `Menu van *${moment.locale('nl').format('dddd D MMMM YYYY')}*`,
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

  render () {
    if (this.soups.length) {
      this.body.blocks.push({
        type: 'context',
        elements: [
          {
            type: 'plain_text',
            text: 'Soepjes',
          },
        ],
      })
      this.body.blocks.push({
        type: 'section',
        fields: this.soups,
      })
      this.body.blocks.push({
        type: 'divider',
      })
    }
    if (this.dishes.length) {
      this.body.blocks.push({
        type: 'context',
        elements: [
          {
            type: 'plain_text',
            text: 'Schotels',
          },
        ],
      })
      this.body.blocks.push({
        type: 'section',
        fields: this.dishes,
      })
      this.body.blocks.push({
        type: 'divider',
      })
    }
  }

  send (url) {
    Axios.post(url, this.body)
      .then(() => {
        Logger.success('SlackResponse', 'Response to Slack was sent successfully!')
      })
      .catch(() => {
        Logger.error('SlackResponse', 'Response to Slack returned an error!')
      })
  }
}

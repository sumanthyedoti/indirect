import sgMail from '@sendgrid/mail'

import logger from '../config/logger'

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export function sendInviteToSpace(email: string, spaceName: string) {
  return new Promise((resolve, reject) => {
    const msg = {
      to: email,
      from: 'sumanth.yedoti@gmail.com',
      subject: `You are invited to '${spaceName}' space on inDirect`,
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    sgMail
      .send(msg)
      .then((response) => {
        if (response[0].statusCode === 202) {
          resolve(email)
        } else {
          reject('Sending invitation failed')
        }
      })
      .catch((error) => {
        logger.error(':: ', error)
        reject('Sending invitation failed')
      })
  })
}

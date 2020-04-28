/* eslint-disable valid-jsdoc */
import sendgrid from '@sendgrid/mail';
import { env } from '../config';
// import Toolbox from './toolbox';

const {
  ADMIN_EMAIL, SENDGRID_KEY
} = env;
// const {
//   createVerificationLink
// } = Toolbox;

sendgrid.setApiKey(SENDGRID_KEY);

const Mailer = {
  /**
   * send newsletter to subscribers
   * @param {object} req
   * @param {Array} emails
   * @returns {Promise<boolean>} - Returns true if mail is sent, false if not
   * @memberof Mailer
   */
  async sendNewsletterEmail(req, emails) {
    const newsletterLink = 'ziclinewsletter.netlify.app';
    const mail = {
      to: emails,
      from: ADMIN_EMAIL,
      templateId: 'd-e71e14ada4e24212a9c24b20851b9bff',
      dynamic_template_data: {
        newsletter_link: newsletterLink,
      }
    };
    try {
      await sendgrid.send(mail);
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default Mailer;

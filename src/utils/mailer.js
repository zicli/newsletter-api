/* eslint-disable valid-jsdoc */
import sendgrid from '@sendgrid/mail';
import env from '../config/env';

const {
  ADMIN_EMAIL, SENDGRID_KEY, CLIENT_URL
} = env;

sendgrid.setApiKey(SENDGRID_KEY);

const Mailer = {
  /**
   * send welcome message to subscribers
   * @param {object} req
   * @param {Array} emails
   * @param {URL} newsletterLink
   * @returns {Promise<boolean>} - Returns true if mail is sent, false if not
   * @memberof Mailer
   */
  async sendNewSubscriberMessage(email) {
    const unsubcribeLink = `${CLIENT_URL}/unsubscribe`;
    const mail = {
      to: email,
      from: ADMIN_EMAIL,
      templateId: 'd-8a43cf0796bd4297b917ab6d5951884b',
      dynamic_template_data: {
        unsubcribe_link: unsubcribeLink,
      }
    };
    try {
      await sendgrid.sendMultiple(mail);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * send newsletter to subscribers
   * @param {object} req
   * @param {Array} emails
   * @param {URL} newsletterLink
   * @returns {Promise<boolean>} - Returns true if mail is sent, false if not
   * @memberof Mailer
   */
  async sendNewsletterEmail(emails, newsletterLink) {
    const mail = {
      to: emails,
      from: ADMIN_EMAIL,
      templateId: 'd-e71e14ada4e24212a9c24b20851b9bff',
      dynamic_template_data: {
        newsletter_link: newsletterLink,
      }
    };
    try {
      await sendgrid.sendMultiple(mail);
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default Mailer;

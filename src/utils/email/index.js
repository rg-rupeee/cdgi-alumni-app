const axios = require('axios');
const config = require('config');
const logger = require('../../configs/logger');

const url = config.EMAIL.SENDINBLUE.URI;

exports.sendMail = async ({ userName, userEmail, subject, body }) => {
  const data = {
    sender: {
      name: config.EMAIL.SENDER.NAME,
      email: config.EMAIL.SENDER.EMAILID,
    },
    to: [
      {
        email: userEmail,
        name: userName,
      },
    ],
    subject,
    htmlContent: body,
  };

  let res;
  try {
    res = await axios.request({
      method: 'POST',
      url,
      data,
      headers: {
        'api-key': config.EMAIL.SENDINBLUE.API_KEY,
      },
    });
  } catch (err) {
    logger.error('Error Encountered While Sending Email');
    logger.error(err);
    return { success: false, response: err };
  }
  return { success: true, response: res.data };
};

const constant = {
  OTP: {
    BODY: ({ name, otp }) =>
      `Hi ${name},\nYour OTP is ${otp}.\nPlease do not share this OTP with anyone.`,
    SUBJECT: 'OTP | CDGI Alumni App',
  },
};

module.exports = constant;

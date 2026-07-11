const sendEmail = async (
  email,
  subject,
  message
) => {

  console.log("================================");
  console.log("EMAIL");
  console.log(email);
  console.log(subject);
  console.log(message);
  console.log("================================");

  return true;

};

module.exports = sendEmail;
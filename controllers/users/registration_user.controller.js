const userRegistration = (req, res) => {
  const { email, name, businessType,phoneNumber } = req.body;
  console.log(email, name, businessType);
  res.send(email, name, businessType);
};

module.exports = userRegistration;

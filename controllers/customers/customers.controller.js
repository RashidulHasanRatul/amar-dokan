const Customer = require("../../schema/customers/customers.schema");

const customerRegistration = async (req, res) => {
  const { customerName, mobileNumber, address, productType, price } = req.body;
  const customer = new Customer({
    userId: req.user.userId,
    customerName: customerName,
    mobileNumber: mobileNumber,
    address: address,
    productType: productType,
    price: price,
  });
  await customer.save();
  res.status(201).send("Customers Successfully Added");
};

const getAllCustomers = (req, res) => {
  Customer.find({}, (err, customer) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(customer);
    }
  });
};

const getCustomer = async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req.user.userId });
    return res.status(200).json({ customers });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { customerRegistration, getAllCustomers, getCustomer };

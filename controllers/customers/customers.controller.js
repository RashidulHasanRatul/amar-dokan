const Customer = require("../../schema/customers/customers.schema");
const customerRegistration = async (req, res) => {
  const { customerName, mobileNumber, address, productType, price } = req.body;

  const customer = new Customer({
    customerName: customerName,
    mobileNumber: mobileNumber,
    address: address,
    productType: productType,
    price: price,
  });
  await customer.save();
  res.status(201).send("Customers Successfully Added");
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { customerRegistration, getAllCustomers };

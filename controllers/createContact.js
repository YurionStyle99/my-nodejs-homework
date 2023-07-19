const { Contact, schema } = require("../models/contact");

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ message: "Missing required name field" });
  } else {
    try {
      const newContact = await Contact.create({ name, email, phone });
      res.status(201).json({ contact: newContact, status: 201 });
    } catch (error) {
      res.status(500).json({ message: "Error adding contact" });
    }
  }
};

module.exports = createContact;

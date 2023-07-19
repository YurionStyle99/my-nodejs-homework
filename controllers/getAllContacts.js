const { Contact } = require("../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const contactsList = await Contact.find();
    res.json({
      status: "success",
      code: 200,
      contacts: contactsList,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts" });
  }
};

module.exports = getAllContacts;

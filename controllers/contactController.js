const contacts = require("../models/contacts");

const schema = require("../schemas/schema")

const getAllContacts = async (req, res, next) => {
  try {
    const contactsList = await contacts.listContacts();
    res.json({
      status: "success",
      code: 200,
      contacts: contactsList,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts" });
  }
};

const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    } else {
      res.json({
        status: "success",
        code: 200,
        contact,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contact" });
  }
};

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ message: "Missing required name field" });
  } else {
    try {
      const newContact = await contacts.addContact(name, email, phone);
      res.status(201).json({ contact: newContact, status: 201 });
    } catch (error) {
      res.status(500).json({ message: "Error adding contact" });
    }
  }
};

const deleteContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const deletedContact = await contacts.removeContact(contactId);
    if (!deletedContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    } else {
      res.json({
        status: "success",
        code: 200,
        message: "Contact deleted",
        contact: deletedContact,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact" });
  }
};

const updateContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const updateData = req.body;
  const { error, value } = schema.validate(updateData);

  if (error) {
    res.status(400).json({ message: "Missing fields" });
  } else {
    try {
      const updatedContact = await contacts.updateContact(contactId, value);
      res.json({ contact: updatedContact, status: 200 });
    } catch (error) {
      res.status(404).json({ message: "Not found" });
    }
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};

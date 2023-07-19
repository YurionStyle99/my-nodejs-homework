const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const createContact = require("./createContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateContactStatus = require("./updateContactStatus");

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateContactStatus,
};

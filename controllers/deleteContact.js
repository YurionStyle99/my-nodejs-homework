const { Contact } = require("../models/contact");

const deleteContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (deletedContact === null) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found id=${contactId}`,
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

module.exports = deleteContact;

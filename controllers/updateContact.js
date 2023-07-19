const { Contact, schema } = require("../models/contact");

const updateContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const updateData = req.body;
  const { error } = schema.validate(updateData);

  if (error) {
    res.status(400).json({ message: "Missing fields" });
  } else {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        updateData,
        { new: true }
      );
      if (!updatedContact) {
        res.status(404).json({ message: "Not found" });
      } else {
        res.json({ contact: updatedContact, status: 200 });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating contact" });
    }
  }
};

module.exports = updateContact;

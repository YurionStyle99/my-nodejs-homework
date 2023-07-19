const { Contact } = require("../models/contact");

const updateContactStatus = async (req, res, next) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;

  if (typeof favorite === "undefined") {
    res.status(400).json({ message: "missing field favorite" });
  } else {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        { favorite },
        { new: true }
      );

      if (!updatedContact) {
        res.status(404).json({
          status: "error",
          code: 404,
          message: "Not found",
        });
      } else {
        res.json({
          status: "success",
          code: 200,
          contact: updatedContact,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating contact status" });
    }
  }
};

module.exports = updateContactStatus;

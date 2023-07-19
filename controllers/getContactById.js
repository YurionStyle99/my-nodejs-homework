const { Contact } = require("../models/contact");

const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact with id=${contactId}`,
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

module.exports = getContactById;

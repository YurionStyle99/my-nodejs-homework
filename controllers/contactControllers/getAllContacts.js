const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const favorite = (req.query.favorite = true);

    const skip = (page - 1) * limit;

    let contactsQuery = Contact.find();

    if (favorite) {
      contactsQuery = contactsQuery.where("favorite").equals(true);
    }

    const contactsList = await contactsQuery.skip(skip).limit(limit);
    const totalContacts = await Contact.countDocuments();

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: contactsList,
        total: totalContacts,
        page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts" });
  }
};

module.exports = getAllContacts;

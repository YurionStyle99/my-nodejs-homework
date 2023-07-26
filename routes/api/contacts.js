const express = require("express");

const router = express.Router();

const contactController = require("../../controllers/contactControllers/contactController");

router.get("/", contactController.getAllContacts);
router.get("/:contactId", contactController.getContactById);
router.post("/", contactController.createContact);
router.delete("/:contactId", contactController.deleteContact);
router.put("/:contactId", contactController.updateContact);
router.patch("/:contactId", contactController.updateContactStatus);

module.exports = router;

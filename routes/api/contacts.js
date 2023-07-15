const express = require("express");
const router = express.Router();

const contactController = require("../../controllers/contactController");

router.get("/", contactController.getAllContacts);
router.get("/:contactId", contactController.getContactById);
router.post("/", contactController.createContact);
router.delete("/:contactId", contactController.deleteContact);
router.put("/:contactId", contactController.updateContact);

module.exports = router;

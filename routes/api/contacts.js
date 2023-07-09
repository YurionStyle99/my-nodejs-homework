const express = require("express");

const Joi = require("joi");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  addContact,
} = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: "succes",
    code: 200,
    contacts,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const getContact = await getContactById(contactId);
  if (getContact === null) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    contact: getContact,
  });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    try {
      const newContact = await addContact(name, email, phone);
      res.status(201).json({ contact: newContact, status: 201 });
    } catch (error) {
      res.status(500).json({ message: "Error adding contact" });
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const deleteContact = await removeContact(contactId);
  if (deleteContact === null) {
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
      contact: deleteContact,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const updateData = req.body;
  const { error, value } = schema.validate(updateData);

  if (error) {
    res.status(400).json({ message: "missing fields" });
  } else {
    try {
      const updatedContact = await updateContact(contactId, value);
      res.json({ contact: updatedContact, status: 200 });
    } catch (error) {
      res.status(404).json({ message: "Not found" });
    }
  }
});

module.exports = router;

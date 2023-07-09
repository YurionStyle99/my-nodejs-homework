// const fs = require("fs");

const { promises: fsPromises } = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function handleAsync(fn) {
  try {
    return await fn();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function listContacts() {
  return handleAsync(async () => {
    const data = await fsPromises.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  });
}

async function getContactById(contactId) {
  return handleAsync(async () => {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  });
}


async function removeContact(contactId) {
  return handleAsync(async () => {
    const contacts = await listContacts();
    const removedContact = contacts.find((contact) => contact.id === contactId);
    if (!removedContact) {
      throw new Error("Not found");
    }
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fsPromises.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2)
    );
  });
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);
    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
}

async function updateContact(contactId, updateData) {
  return handleAsync(async () => {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
    if (contactIndex === -1) {
      throw new Error("Not found");
    }
    const updatedContact = { ...contacts[contactIndex], ...updateData };
    contacts[contactIndex] = updatedContact;
    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  addContact
};

const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf8');
  console.table(JSON.parse(data));
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(data);
  const contact = contacts.find(c => c.id === contactId.toString());
  console.log(contact || `Contact with id=${contactId} not found`);
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(data);
  const newContact = { id: `${contacts.length + 1}`, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log('Contact added:', newContact);
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(data);
  const updatedContacts = contacts.filter(c => c.id !== contactId.toString());
  if (updatedContacts.length === contacts.length) {
    console.log(`Contact with id=${contactId} not found`);
    return;
  }
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  console.log(`Contact with id=${contactId} removed`);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
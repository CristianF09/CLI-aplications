const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
const argv = require('yargs').argv; 

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      // Afișează lista completă de contacte
      console.table(await listContacts());
      break;

    case 'get':
      // Afișează un contact după id
      console.log(await getContactById(id));
      break;

    case 'add':
      // Adaugă un contact nou
      console.log(await addContact(name, email, phone));
      break;

    case 'remove':
      // Șterge un contact după id
      console.log(await removeContact(id));
      break;

    default:
      console.warn('Unknown action!');
  }
}


invokeAction(argv);
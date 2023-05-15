import React, {useState} from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import store, {RootState} from '../../Redux/store';
import { addContact, deleteContact, editContact } from '../../Redux/ContactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm';
import ContactCard from './ContactCard';
import { v4 as uuidv4 } from 'uuid';

const queryClient = new QueryClient();

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
}

function Contacts() {
  const [isCreatingContact, setIsCreatingContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleDelete = (contactId: string) => {
    dispatch(deleteContact(contactId));
  };

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setIsCreatingContact(true);
  };

  const handleCreateContact = () => {
    setSelectedContact(null);
    setIsCreatingContact(true);
  };

  const handleSaveContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = { id: uuidv4(), ...contact };
    if (selectedContact) {
      dispatch(editContact({ ...newContact, id: selectedContact.id }));
    } else {
      dispatch(addContact(newContact));
    }
    setIsCreatingContact(false);
  };

  const handleUpdateContact = (contact: Contact) => {
    dispatch(editContact(contact));
    setIsCreatingContact(false);
  };

  return (
      <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Contacts</h1>
      <button
        onClick={handleCreateContact}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Contact
      </button>
      {isCreatingContact && (
        <ContactForm
        initialValues={selectedContact || { id: '', firstName: '', lastName: '', active: false }}
  onSave={selectedContact ? handleUpdateContact : handleSaveContact}
  onClose={() => setIsCreatingContact(false)}
/>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contacts.length === 0 ? (
          <p className="text-center">No contacts</p>
        ) : (
          contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={() => handleDelete(contact.id)}
              onEdit={() => handleEdit(contact)}
            />
          ))
        )}
      </div>
    </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  );
}

export default Contacts;
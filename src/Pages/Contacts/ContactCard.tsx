import React from 'react';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
}

interface ContactCardProps {
  contact: Contact;
  onDelete: () => void;
  onEdit: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">{contact.firstName} {contact.lastName}</h2>
      <p>Status: {contact.active ? 'Active' : 'Inactive'}</p>
      <div className="mt-4">
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
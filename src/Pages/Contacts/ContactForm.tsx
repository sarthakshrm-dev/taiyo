import React, { useState } from 'react';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
}

interface ContactFormProps {
  initialValues: Contact;
  onSave: (contact: Contact) => void;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialValues, onSave, onClose }) => {
  const [contact, setContact] = useState<Contact>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(contact);
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={contact.firstName}
            onChange={handleChange}
            className="border border-gray-300 px-2 py-1 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={contact.lastName}
            onChange={handleChange}
            className="border border-gray-300 px-2 py-1 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            name="active"
            value={contact.active ? 'active' : 'inactive'}
            onChange={handleChange}
            className="border border-gray-300 px-2 py-1 rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={handleCloseClick}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
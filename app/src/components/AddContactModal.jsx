import { useEffect, useState } from "react";

const AddContactModal = ({
  handleAddContact,
  closeModal,
  contactList,
  initialContact,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState(null);


  useEffect(() => {
    if (initialContact) {
      const { name, email, phone, location, picture } = initialContact;
      setName(`${name} `);
      setEmail(`${email}`);
      setPhone(`${phone}`);
      setCity(`${location.city}`);
      setLatitude(`${location.coordinates.latitude}`);
      setLongitude(`${location.coordinates.longitude}`);
      setImage(`${picture.image}`);
    }
  }, [initialContact]);

  const generateUniqueId = () => {
    const existingIds = contactList.map((contact) => parseInt(contact.id));
    const newId = Math.max(...existingIds, 0) + 1;
    return newId.toString();
  };

  const handleSaveOrUpdateContact = () => {
    const newContact = {
      id: initialContact ? initialContact.id : generateUniqueId(),
      name,
      email,
      phone: Phone,
      location: {
        city,
        coordinates: {
          latitude,
          longitude,
        },
      },
      picture: {
        image: image ? URL.createObjectURL(image) : "",
      },
    };

    if (initialContact) {
      // Update the editedContact state for the ProfilePage component
      handleAddContact({ ...initialContact, ...newContact });
    } else {
      handleAddContact(newContact);
    }

    closeModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
};

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="bg-gray-800  p-6 rounded-lg w-auto h-auto max-w-md">
        <div className="mb-4">
          <label for="image" className="block text-white font-semibold">
            Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded  text-white bg-gray-700  w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label for="name" className="block text-white font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded  text-white bg-gray-700  w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label for="email" className="block text-white font-semibold">
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border  rounded  text-white bg-gray-700  w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label for="phone" className="block text-white font-semibold">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border  text-white bg-gray-700  rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label for="city" className="block text-white font-semibold">
            City:
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border rounded  text-white bg-gray-700  w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label for="latitude" className="block text-white font-semibold">
            Latitude:
          </label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="border rounded  text-white bg-gray-700  w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label for="longitude" className="block text-white font-semibold">
            Longitude:
          </label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="border rounded  text-white bg-gray-700  w-full p-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSaveOrUpdateContact}
            className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
          >
            {initialContact ? "Update" : "Save"}
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;

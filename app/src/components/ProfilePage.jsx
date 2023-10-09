import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osm from "../osm-provider";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AddContactModal from "./AddContactModal";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131502.png",
  iconSize: [40, 40],
});
const ProfilePage = ({ contactList, setContactList }) => {
  const { id } = useParams();
  const contact = contactList.find((contact) => contact.id === id);
  const Navigate = useNavigate();
  const [editedContact, setEditedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { latitude, longitude } = contact?.location?.coordinates || {};
  const initialCenter = { lat: latitude || 0, lng: longitude || 0 };
  const [center] = useState(initialCenter);
  const [showMap, setShowMap] = useState(false);
  const ZOOM_LEVEL = 13;
  const mapRef = useRef();

  const handleUpdateContact = async () => {
    try {
      setIsModalOpen(true);
      if (editedContact) {
        // Set the edited contact to update in the modal
        setEditedContact(editedContact);
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDeleteContact = async () => {
    try {
      const updatedContactList = contactList.filter(
        (contact) => contact.id !== id
      );
      setContactList(updatedContactList);

      Navigate("/");
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    setEditedContact(contact);
  }, [contact]);

  if (!editedContact) {
    return <div>Contact not found</div>;
  }

  if (!contact) {
    return <div>Contact not found</div>;
  }

  if (contactList.length === 0) {
    return <div>Contact list is not available.</div>;
  }

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9069/9069049.png"
              className="h-8 mr-3"
              alt="logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Profile view
            </span>
          </a>

          <ul className=" p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50  md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                className="block  text-blue-700  hover:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container mx-auto mt-5 p-5">
        <div class="flex flex-col lg:flex-row gap-5">
          <div class="lg:w-1/2 bg-white rounded-lg   shadow-lg overflow-hidden">
            <div class="relative">
              <img
                alt="user"
                class="w-full h-64 object-cover"
                src={editedContact.picture.image}
              />
              <div class="absolute bottom-0 left-0 p-6">
                <h2 class="text-gray-900 text-2xl font-semibold">
                  {editedContact.name}
                </h2>
              </div>
            </div>
            <div class="p-6">
              <p class="text-gray-700 font-semibold sm:font-bold text-sm mb-2">
                Email: {editedContact.email}
              </p>
              <p class="text-gray-700 lg:font-bold sm:font-bold">
                Phone: {editedContact.phone}
              </p>
              <p class="text-gray-700 lg:font-bold sm:font-bold">
                City: {editedContact.location.city}
              </p>
              <p class="text-gray-700 lg:font-bold sm:font-bold">
                Lat: {editedContact.location.coordinates.latitude}
              </p>
              <p class="text-gray-700 lg:font-bold sm:font-bold">
                Lng: {editedContact.location.coordinates.longitude}
              </p>
            </div>
            <div class="p-6 flex justify-evenly">
              <button
                onClick={handleUpdateContact}
                class="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
              >
                <svg
                 class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Update
              </button>

              {isModalOpen && (
                <AddContactModal
                  initialContact={editedContact}
                  contactList={contactList}
                  handleAddContact={(updatedContact) => {
                    const updatedList = contactList.map((contact) => {
                      if (contact.id === updatedContact.id) {
                        return updatedContact;
                      }
                      return contact;
                    });
                    setContactList(updatedList);
                    localStorage.setItem(
                      "contacts",
                      JSON.stringify(updatedList)
                    );
                    setIsModalOpen(false);
                  }}
                  closeModal={() => setIsModalOpen(false)}
                />
              )}

              <button
                onClick={() => setShowMap((prevState) => !prevState)}
                class="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md"
              >
                <svg
                  alt="Map Point Wave SVG Vector Icon"
                  width="10"
                  height="10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  style={{
                    color: "white",
                    width: "20px",
                    height: "20px",
                    marginRight: "4px",
                  }}
                >
                  <path
                    d="M12 2C8.14 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.14-7-7-7zm0 9.5a2.5 2.5 0 1 1 2.5-2.5 2.5 2.5 0 0 1-2.5 2.5z"
                    fill="white"
                  />
                </svg>
                {showMap ? "Hide Map" : "Locate on Map"}
              </button>

              <button
                onClick={handleDeleteContact}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>

          <div class="lg:w-1/3 mt-5">
            {showMap && (
              <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                <TileLayer
                  url={osm.maptiler.url}
                  attribution={osm.maptiler.attribution}
                />
                {center && (
                  <Marker position={center} icon={customIcon}>
                    <Popup>welcome to: {contact.location.city}</Popup>
                  </Marker>
                )}
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

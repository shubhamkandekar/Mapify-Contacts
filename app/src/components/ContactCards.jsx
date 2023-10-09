// import { useState } from "react";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import AddContactModal from "./AddContactModal";

const ContactCards = ({ contactList, setContactList }) => {
  const navigate = useNavigate();

  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const MAX_CONTACTS = 10;
  const handleAddContact = async (newContact) => {
    try {
      const updatedContactList = [...contactList, newContact].slice(
        0,
        MAX_CONTACTS
      );
      setContactList(updatedContactList);
      localStorage.setItem("contacts", JSON.stringify(updatedContactList));
      setShowAddContactModal(false);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };
 

  const handleViewProfile = (contactId) => {
    navigate(`/profile/${contactId}`);
  };

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
            <form>
              <input
                type={"text"}
                placeholder={"type here to filter..."}
                className={"ml-20  rounded-md p-2 bg-gray-200"}
              />
            </form>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 "
              id="navbar-search"
            >
              <div className="relative mt-3 md:hidden">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                  <path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
              </div>
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="/"
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      <button
        onClick={() => setShowAddContactModal(true)}
        className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md mt-5 ml-4"
      >
        Add Contact
      </button>

      {showAddContactModal && (
        <AddContactModal
          handleAddContact={handleAddContact}
          contactList={contactList}
          closeModal={() => setShowAddContactModal(false)}
        />
      )}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-20">
        {contactList?.map((contact) => (
          <figure
            className="bg-gray-100 text-white h-auto border rounded-lg shadow-lg "
            key={contact.id}
          >
            <img
              alt="user"
              className="w-32 h-32 rounded-full mx-auto mt-7"
              src={contact.picture.image}
            />
            <figcaption className="text-center mt-3">
              <p className="text-gray-700 font-semibold text-xl mb-2">
                {contact.name}
              </p>
              <p className="text-gray-500">
                <span className="font-medium">Email: </span>
                {contact.email}
              </p>
              <p className="text-gray-500">
                <span className="font-medium">Phone: </span>
                {contact.phone}
              </p>
              <p className="text-gray-500">
                <span className="font-medium">City: </span>
                {contact.location.city}
              </p>

              <button
                onClick={() => handleViewProfile(contact.id)}
                className=" bg-blue-500 hover:bg-blue-400 h-8 rounded-sm p-1.5 text-sm font-semibold mb-2"
              >
                View Profile
              </button>
            </figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
};

export default ContactCards;

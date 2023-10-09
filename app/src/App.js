import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactCards from "./components/ContactCards";
import { useEffect, useState } from "react";
import ProfilePage from "./components/ProfilePage";

const App = () => {
  const [contactList, setContactList] = useState([]);
  

  useEffect(() => {
    const initialData = JSON.parse(localStorage.getItem("contacts")) || []; // Retrieve initial data from local storage
    setContactList(initialData); // Set contactList with initialData when component mounts
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contactList)); // Save contactList to local storage whenever it changes
  }, [contactList]);

  return (
    <Router>
      <div className="bg-white h-full ">
       

        <section>
          <Routes>
            <Route
              path="/"
              element={
                <ContactCards
                  contactList={contactList}
                  setContactList={setContactList}
                />
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProfilePage
                  contactList={contactList}
                  setContactList={setContactList}
                />
              }
            />
          </Routes>
        </section>
      </div>
    </Router>
  );
};
export default App;

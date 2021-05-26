import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import contacts from "./contacts.json";


function App() {
  const [contactsArr, setContactsArr] = React.useState(contacts.slice(0, 5));
  
  function addRandomContact() {
    const randomIndex = Math.floor(Math.random() * contacts.length);
  
    setContactsArr([contacts[randomIndex], ...contactsArr]);
  }
  function sortByName() {
    const sortedByName = [...contactsArr].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContactsArr(sortedByName);
  }

  function sortByFame() {
    const sortedByFame = [...contactsArr].sort(
      (a, b) => b.popularity - a.popularity
    );
    setContactsArr(sortedByFame);
  }
  function deleteContact(index) {
    const newArr = [...contactsArr].filter((contact, idx) => idx !== index);
    setContactsArr(newArr);
  }

  return (
    <div className="App">
        <h1>Contacts</h1>
      <button style={{ margin: "30px 10px" }} onClick={addRandomContact}>
        Add Random Contact
      </button>
      <button style={{ margin: "30px 10px" }} onClick={sortByName}>
        Sort by name
      </button>
      <button style={{ margin: "30px 10px" }} onClick={sortByFame}>
        Sort by fame
      </button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {contactsArr.map((contact, index) => {
            return (
              <PresentCelebrity
                {...contact}
                index={index}
                key={`${contact.id} – ${index}`}
                deleteContact={deleteContact}
              ></PresentCelebrity>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PresentCelebrity(props) {
  return (
    <tr key={props.id}>
      <td>
        <img
          src={props.pictureUrl}
          alt={props.name}
          style={{ height: "150px" }}
        ></img>
      </td>
      <td>{props.name}</td>
      <td>{props.popularity.toFixed(2)}</td>
      <td>
        <button onClick={() => props.deleteContact(props.index)}>Delete</button>
      </td>
    </tr>
  );
}


export default App;

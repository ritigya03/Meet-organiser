
import React, { createContext, useState, useEffect } from 'react';
import firebaseApp from './firebaseConfig'; 
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore/lite';

export const SavedMeetingsContext = createContext();

export const SavedMeetingsProvider = ({ children }) => {
  const initialMeetings = JSON.parse(localStorage.getItem('savedMeetings')) || [];
  const [savedMeetings, setSavedMeetings] = useState(initialMeetings);

  const getDeletedMeetingsFromFirebase = async () => {
    const db = getFirestore(firebaseApp); 
    const deletedMeetingsRef = collection(db, 'meetings');
    const q = query(deletedMeetingsRef, where('isDeleted', '==', true));
    const querySnapshot = await getDocs(q);

    const deletedMeetingIds = [];
    querySnapshot.forEach((doc) => {
      deletedMeetingIds.push(doc.id);
    });

    return deletedMeetingIds;
  };

  useEffect(() => {
    const syncSavedMeetings = async () => {
      const deletedMeetingIds = await getDeletedMeetingsFromFirebase();
      setSavedMeetings((prevMeetings) => {
        const updatedMeetings = prevMeetings.filter((meeting) => !deletedMeetingIds.includes(meeting.id));
        localStorage.setItem('savedMeetings', JSON.stringify(updatedMeetings));
        return updatedMeetings;
      });
    };

    syncSavedMeetings();
  }, []);

  const addMeeting = (meeting) => {
    setSavedMeetings((prevMeetings) => {
      const updatedMeetings = [...prevMeetings, meeting];
      localStorage.setItem('savedMeetings', JSON.stringify(updatedMeetings));
      return updatedMeetings;
    });
  };

  const removeMeeting = (meeting) => {
    setSavedMeetings((prevMeetings) => {
      const updatedMeetings = prevMeetings.filter((m) => m.title !== meeting.title);
      localStorage.setItem('savedMeetings', JSON.stringify(updatedMeetings));
      return updatedMeetings;
    });
  };

  return (
    <SavedMeetingsContext.Provider value={{ savedMeetings, addMeeting, removeMeeting }}>
      {children}
    </SavedMeetingsContext.Provider>
  );
};

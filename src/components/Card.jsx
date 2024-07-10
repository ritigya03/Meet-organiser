import React, { useState, useContext, useEffect } from "react";
import { SavedMeetingsContext } from "../SavedMeetingContext";
import { useTheme } from '../ThemeContext';
import "../App.css";

function Card(props) {
  const { savedMeetings, addMeeting, removeMeeting } =
    useContext(SavedMeetingsContext);
  const [isSaved, setIsSaved] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const meetingIsSaved = savedMeetings.some(
      (meeting) => meeting.title === props.title
    );
    setIsSaved(meetingIsSaved);
  }, [savedMeetings, props.title]);

  const toggleSaveMeeting = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      addMeeting({ title: props.title, date: props.date });
    } else {
      removeMeeting({ title: props.title, date: props.date });
    }
  };

  return (
    <div className={theme === 'light' ? 'max-w-sm bg-white border-[2px] rounded-xl shadow-sm p-7 border-neutral-500' : 'max-w-sm bg-white border-[4px] rounded-xl shadow-sm p-7 border-pink-300'}>
      <a href="#" className="block mb-3">
        <div className="flex justify-between">
          <h5 className="text-xl font-bold leading-none tracking-tight text-neutral-900">
            {props.title}
          </h5>
          <button onClick={toggleSaveMeeting}>
            {isSaved ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill={theme === 'light' ? 'black' : 'black'}
                className="bi bi-bookmark-check"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"
                />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill={theme === 'light' ? 'black' : 'black'}
                className="bi bi-bookmark"
                viewBox="0 0 16 16"
              >
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
              </svg>
            )}
          </button>
        </div>
      </a>
      <p className={theme === 'light' ? 'black' : 'black'}>{ props.date}</p>
      <p className="mb-4 text-neutral-500">
        {props.desc}
      </p>
      <button className="inline-flex items-center justify-between w-auto h-10 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-neutral-950 hover:bg-neutral-950/90">
        <span>Join Meetings</span>
        <svg
          className="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default Card;

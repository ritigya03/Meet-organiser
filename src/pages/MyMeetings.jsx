import React, { useContext } from "react";
import { SavedMeetingsContext } from "../SavedMeetingContext";
import CutePanda from '../assets/cutepanda.png';
import { Link } from "react-router-dom";
import "../App.css";
import { useTheme } from '../ThemeContext';

function MyMeetings() {
  const { savedMeetings } = useContext(SavedMeetingsContext);
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen flex flex-col">
      

      <div className="flex-grow">
        <h1 className="font-black text-4xl text-center mt-10">Bookmarked Meetings <Link to={'/    '}>🐼</Link></h1>
        <div className="flex justify-center gap-5 mt-10 px-5 flex-wrap">
          {savedMeetings.length > 0 ? (
            savedMeetings.map((meeting, index) => (
              <div key={index} className={theme === 'light' ? 'max-w-sm bg-white border-[2px] rounded-xl shadow-sm p-7 border-black' : 'max-w-sm bg-white border-[4px] rounded-xl shadow-sm p-7 border-pink-200'}>
                <h5 className="text-xl font-bold leading-none tracking-tight text-neutral-900">{meeting.title}</h5>
                <p className={theme === 'light' ? 'black' : 'black'}>{meeting.date}</p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <Link to={'/'}><img className="w-[350px] h-[400px]" src={CutePanda} alt="" /></Link>
              <h2 className="text-center mt-6 text-2xl">No meetings saved</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function MyMeetingsLink() {
  const { savedMeetings } = useContext(SavedMeetingsContext);

  return (
    <Link to="/my-meetings">
      My Meetings
      {savedMeetings.length > 0 && (
        <span className="meeting-count">{savedMeetings.length}</span>
      )}
    </Link>
  );
}

export default MyMeetings;

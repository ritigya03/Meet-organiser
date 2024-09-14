import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HappyPanda from '../assets/happy-panda.png';
import { useTheme } from '../ThemeContext';
import "../App.css";

function AddMeeting() {
    let titleInput = useRef();
    let dateInput = useRef();
    let descInput = useRef();
    let typeInput = useRef();
    let [loadingStatus, setLoadingStatus] = useState(false);
    let navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    function addMeetingHandler() {
        setLoadingStatus(true);
        let newMeetingData = {
            title: titleInput.current.value,
            date: dateInput.current.value,
            desc: descInput.current.value,
            type: typeInput.current.value
        };

        fetch('https://meetapp01-f4fde-default-rtdb.firebaseio.com/meetings.json', {
            method: 'post',
            body: JSON.stringify(newMeetingData)
        }).then(() => {
            setLoadingStatus(false);
            navigate('/');
        });
    }

    return (
        <div className="min-h-screen  flex flex-col">
            <section className="max-w-screen-sm mx-auto flex-grow text-left px-4 lg:px-8">
                <div className="text-center">
                    <div className="w-full max-w-[400px] mx-auto border-black px-6 py-8 rounded-xl">
                        <div className="flex justify-center">
                            <Link to={'/'}>
                                <img className={theme === 'light' ? 'w-[80px] h-[80px] mb-5' : 'w-[80px] h-[80px] mb-5 bg-pink-100'} src={HappyPanda} alt="Happy Panda" />
                            </Link>
                        </div>
                        <h1 className="text-4xl font-black text-center">Add new meeting</h1>

                        <div className="w-full mt-6">
                        <input 
                            ref={titleInput} 
                            type="text" 
                            placeholder="Meeting Title" 
                            className={`w-full h-10 px-3 py-2 text-sm bg-white border rounded-lg border-neutral-300 ring-offset-background placeholder:text-black focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 ${theme === 'light' ? 'black' : 'black'}`} 
                        />
                        </div>

                        <div className="w-full mt-6">
                            <input ref={dateInput} type="datetime-local" placeholder="Meeting Date" className={`w-full h-10 px-3 py-2 text-sm bg-white border rounded-lg border-neutral-300 ring-offset-background placeholder:text-black focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 ${theme === 'light' ? 'black' : 'black'}`}  />
                        </div>
                        <div className="w-full mt-6">
                            <input ref={typeInput} type="text" placeholder="Topic (e.g., Dev, Operations, Marketing...)" className={`w-full h-10 px-3 py-2 text-sm bg-white border rounded-lg border-neutral-300 ring-offset-background placeholder:text-black focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 ${theme === 'light' ? 'black' : 'black'}`}  />
                        </div>
                        <div className="w-full mt-6">
                            <input ref={descInput} type="text" placeholder="Description" className={`w-full h-10 px-3 py-2 text-sm bg-white border rounded-lg border-neutral-300 ring-offset-background placeholder:text-black focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 ${theme === 'light' ? 'black' : 'black'}`}  />
                        </div>
                        <div className="flex justify-center">
                            <button onClick={addMeetingHandler} className={theme === 'light' ? "bg-black px-6 py-3 mt-5 rounded-lg flex gap-2 items-center text-white" : "bg-pink-200 px-6 py-3 mt-5 rounded-lg flex gap-2 items-center text-black"}>
                                <span>Create Meeting</span>
                                {loadingStatus && <span className="loader"></span>}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AddMeeting;

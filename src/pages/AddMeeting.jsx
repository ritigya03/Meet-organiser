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
        fetch('https://meet-app-dbc6c-default-rtdb.firebaseio.com/meetings.json', {
            method: 'post',
            body: JSON.stringify(newMeetingData)
        }).then(() => {
            setLoadingStatus(false);
            navigate('/');
        });
    }

    return (
        <div className="min-h-screen flex flex-col">
    

            <section className="max-w-screen-l mx-auto flex-grow text-left px-4 lg:px-8">
                <div className="text-center">
                    <div className="w-[400px] text-left mx-auto border-black px-6 py-8 rounded-xl">
                        <div className="flex justify-center">
                            <Link to={'/'}><img className={theme === 'light' ? 'w-[80px] h-[80px] mb-5 ' : 'w-[80px] h-[80px] mb-5 bg-pink-100'} src={HappyPanda} alt="" /></Link>
                        </div>
                        <h1 className="text-4xl font-black text-center">Add new meeting</h1>

                        <div className="w-full mt-6">
                            <input ref={titleInput} type="text" placeholder="Meeting Title" className="flex w-full h-10 px-3 py-6 text-sm bg-white border rounded-lg border-neutral-300 ring-offset-background placeholder:text-black focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
                        </div>
                        <div className="w-full mt-6">
                            <input ref={dateInput} type="datetime-local" placeholder="Meeting Date" className="flex w-full h-10 px-3 py-6 text-sm bg-white border rounded-lg border-neutral-300 ring-offset-background placeholder:text-black focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
                        </div>
                        <div className="w-full mt-6">
                            <input ref={typeInput} type="text" placeholder="Topic(i.e Dev, Operations, Marketing...)" className="flex w-full h-10 px-3 py-6 text-sm bg-white border rounded-lg border-neutral-300 ring-offset-background placeholder:text-black focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
                        </div>
                        <div className="w-full mt-6">
                            <input ref={descInput} type="text" placeholder="Desc" className="flex w-full h-10 px-3 py-6 text-sm bg-white border rounded-lg border-neutral-300 ring-offset-background placeholder:text-black focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
                        </div>
                        <div className="flex justify-center">
                            <button onClick={addMeetingHandler} className={theme === 'light' ? "bg-black px-12 py-4 text-white mt-5 rounded-lg flex gap-4 items-center" : "bg-pink-200 px-12 py-4 text-black weight-bolder mt-5 rounded-lg flex gap-4 items-center"}>
                                <span>Create Meeting</span>
                                <span className={loadingStatus ? "loader" : ""}></span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AddMeeting;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from '../components/Card';
import Panda from '../assets/lazy-panda-edited.jpg'
import { useTheme } from '../ThemeContext';
import "../App.css";


function Index() {
    const option = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const [meetings, setMeetings] = useState([]);
    const [filter, setFilter] = useState('');
    
    useEffect(() => {
        fetch('https://meet-organiser-default-rtdb.firebaseio.com/meetings.json')
        .then(response => response.json())
        .then(data => {
            const tempMeetings = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            setMeetings(tempMeetings);
        });
    }, []);

    const filterHandler = (type) => {
        setFilter(type);
    }
    const { theme, toggleTheme } = useTheme();
    const filteredMeetings = filter ? meetings.filter(meeting => meeting.type === filter) : meetings;

    return (
        <div className="min-h-screen flex flex-col">
            <header className={`${theme === 'light' ? 'py-3 h-[50px] bg-black text-white' : 'py-3 h-[50px] bg-pink-200 text-black'}`}>
                <nav className="w-full max-w-screen-xl mx-auto flex justify-between items-center mb-4 lg:mb-8">
                    <Link to={'/'} className="text-2xl font-extrabold">Meet🐼</Link>
                    <div className="flex gap-4">
                        <Link to={'/add'} className={`${theme === 'light' ? ' text-white' : ' text-black'}`}>Add Meetings</Link>
                        <Link to={'/my-meetings'} className={`${theme === 'light' ? ' text-white' : ' text-black' }`}>My Meetings</Link>
                    </div>
                </nav>
            </header>

            <section className="max-w-screen-l mx-auto flex-grow text-left px-4 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-black mt-10">Upcoming meetings!🐼</h1>
                    <p>Hug a panda to come back home!!</p>
                    <div className="flex justify-center gap-4 mt-5 sm:mb-8 mb-0 flex-wrap">
                    
                    <button
                        onClick={() => filterHandler('')}
                        className={`border ${
                        filter === ''
                        ? `${theme === 'light' ? 'border-pink-500 bg-pink-50' : 'border-pink-500 border-[2px] bg-pink-50 text-black'} border-[2px]`
                        : `border-${theme === 'light' ? 'black' : 'white'}`
                        } px-3 py-1 rounded-lg font-bold mb-2 lg:mb-0 lg:mr-2`}
                    >All</button>
                    <button
                        onClick={() => filterHandler('Academics')}
                        className={`border ${
                        filter === 'Academics'
                        ? `${theme === 'light' ? 'border-pink-500 bg-pink-50' : 'border-pink-500 border-[2px] bg-pink-50 text-black'} border-[2px]`
                        : `border-${theme === 'light' ? 'black' : 'white'}`
                        } px-3 py-1 rounded-lg font-bold mb-2 lg:mb-0 lg:mr-2`}
                    >Academics</button>
                    <button
                        onClick={() => filterHandler('Dev')}
                        className={`border ${
                        filter === 'Dev'
                        ? `${theme === 'light' ? 'border-pink-500 bg-pink-50' : 'border-pink-500 border-[2px] bg-pink-50 text-black'} border-[2px]`
                        : `border-${theme === 'light' ? 'black' : 'white'}`
                        } px-3 py-1 rounded-lg font-bold mb-2 lg:mb-0 lg:mr-2`}
                    >Development</button>
                    <button
                        onClick={() => filterHandler('Marketing')}
                        className={`border ${
                        filter === 'Marketing'
                        ? `${theme === 'light' ? 'border-pink-500 bg-pink-50' : 'border-pink-500 border-[2px] bg-pink-50 text-black'} border-[2px]`
                        : `border-${theme === 'light' ? 'black' : 'white'}`
                        } px-3 py-1 rounded-lg font-bold mb-2 lg:mb-0 lg:mr-2`}
                    >Marketing</button>
                    <button
                        onClick={() => filterHandler('Operations')}
                        className={`border ${
                        filter === 'Operations'
                        ? `${theme === 'light' ? 'border-pink-500 bg-pink-50' : 'border-pink-500 border-[2px] bg-pink-50 text-black'} border-[2px]`
                        : `border-${theme === 'light' ? 'black' : 'white'}`
                        } px-3 py-1 rounded-lg font-bold mb-2 lg:mb-0 lg:mr-2`}
                    >Operations</button>
                    <button
                        onClick={() => filterHandler('Others')}
                        className={`border ${
                        filter === 'Others'
                        ? `${theme === 'light' ? 'border-pink-500 bg-pink-50' : 'border-pink-500 border-[2px] bg-pink-50 text-black'} border-[2px]`
                        : `border-${theme === 'light' ? 'black' : 'white'}`
                        } px-3 py-1 rounded-lg font-bold mb-2 lg:mb-0 lg:mr-2`}
                    >Others</button>      
                        
                       
                        </div> 
                    
                </div>
                <div className="flex flex-wrap gap-5 justify-center">
                    {filteredMeetings.length > 0 ?
                        filteredMeetings.map((meeting) => {
                            const date = new Date(meeting.date);
                            const formattedDate = date.toLocaleDateString('en', option);
                            return <Card key={meeting.id} title={meeting.title} date={formattedDate} desc={meeting.desc} />;
                        }) :
                        <div className="text-center w-full">
                            <h2>No meetings are available</h2>
                            <div className="flex justify-center">
                            <button onClick={() => filterHandler('')}><img className=" w-[500px] h-[350px]" src={Panda} alt="" /></button>
                                {/* <Link to={''}><img className=" w-[500px] h-[350px]" src={Panda} alt="" /></Link> */}
                            
                            </div>
                            
                        </div>
                    }
                </div>
            </section>
        </div>
    );
}

export default Index;
   
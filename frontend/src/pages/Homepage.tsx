import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt } from "react-icons/fa";
import { MdTask } from "react-icons/md";
import { MdOutline30Fps } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

const Homepage = () => {
  const navigate = useNavigate();

  const handleTaskClick = () => {
    navigate('/todo');
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen gap-12">
        <div className='flex flex-col text-center gap-2'>
          <p>Calendar</p>
          <div className="w-40 h-40 bg-normalGreen border-4 border-darkGray flex justify-center items-center hover:bg-darkGray hover:border-cream rounded-lg group cursor-pointer">
            <FaCalendarAlt className="text-8xl text-cream group-hover:text-cream" />
          </div>
        </div>
        <div className='flex flex-col text-center gap-2'>
          <p>Tasks</p>
          <div onClick={handleTaskClick}
            className="w-40 h-40 bg-normalGreen border-4 border-darkGray flex justify-center items-center hover:bg-darkGray hover:border-cream rounded-lg group cursor-pointer">
            <MdTask className="text-8xl text-cream group-hover:text-cream" />
          </div>
        </div>
        <div className='flex flex-col text-center gap-2'>
          <p>Special Days</p>
          <div className="w-40 h-40 bg-normalGreen border-4 border-darkGray flex justify-center items-center hover:bg-darkGray hover:border-cream rounded-lg group cursor-pointer">
            <MdOutline30Fps className="text-8xl text-cream group-hover:text-cream" />
          </div>
        </div>
        <div className='flex flex-col text-center gap-2'>
          <p>Settings</p>
          <div className="w-40 h-40 bg-normalGreen border-4 border-darkGray flex justify-center items-center hover:bg-darkGray hover:border-cream rounded-lg group cursor-pointer">
            <IoSettings className="text-8xl text-cream group-hover:text-cream" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage;
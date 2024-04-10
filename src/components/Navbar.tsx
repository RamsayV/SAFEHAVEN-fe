import { useState } from 'react';
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import SignOutButton from './SignOutButton';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { isLoggedIn } = useAppContext();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold'>
        <Link to="/">SAFEHAVEN</Link>
      </h1>
      {isLoggedIn ? (
        <ul className='hidden md:flex'>
          <li className='p-4'><Link to="/nothing" className="text-white hover:text-gray-300">Chats</Link></li>
          <li className='p-4'><Link to="/memory-map" className="text-white hover:text-gray-300">Map</Link></li>
          <li className='p-4'><Link to="/toilets" className="text-white hover:text-gray-300">Toilets</Link></li>
          <li className='p-4'><SignOutButton /></li>
        </ul>
      ) : (
        <ul className='hidden md:flex'>
          <li className='p-4'><Link to="/sign-in" className="text-white hover:text-gray-300">Login</Link></li>
          <li className='p-4'><Link to="/toilets" className="text-white hover:text-gray-300">Toilets</Link></li>
        </ul>
      )}
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-violet-400 ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold  m-4'>SAFEHAVEN</h1>
          {isLoggedIn ? (
            <>
              <li className='p-4 border-b border-gray-600'><Link to="/nothing" className="text-white">Chats</Link></li>
              <li className='p-4 border-b border-gray-600'><Link to="/memory-map" className="text-white">Map</Link></li>
              <li className='p-4 border-b border-gray-600'><Link to="/toilets" className="text-white">Toilets</Link></li>
              <li className='p-4'><SignOutButton /></li>
            </>
          ) : (
            <>
              <li className='p-4 border-b border-gray-600'><Link to="/sign-in" className="text-white">Login</Link></li>
              <li className='p-4 border-b border-gray-600'><Link to="/toilets" className="text-white">Toilets</Link></li>
            </>
          )}
      </ul>
    </div>
  );
};

export default Navbar;

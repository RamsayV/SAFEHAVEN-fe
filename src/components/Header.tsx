import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"
import SignOutButton from "./SignOutButton"

const Header = () => {
  const {isLoggedIn} = useAppContext()
  return (
    <div className='bg-red-400 py-6'>
        <div className='container mx-auto flex justify-between'>
            <span className='text-3xl text-white font-bold tracking-tight'>
              <Link to="/">SAFEHAVEN</Link>  
            </span>
            {/* <span className='flex space-x-2'>
              {isLoggedIn ? <>
              <Link to="/nothing" className="flex items-center text-red-400 px-3 font-bold bg-white hover:bg-gray-100">
                Chats
              </Link>
              <Link to="/memory-map" className="flex items-center  text-red-400 px-3 font-bold bg-white hover:bg-gray-100">
                Map
              </Link>
              <Link to="/toilets" className="flex items-center  text-red-400 px-3 font-bold bg-white hover:bg-gray-100">
                Toilets
              </Link>
              <SignOutButton />
              </>: <> <Link to="/sign-in" className="flex bg-white items-center text-black-200 px-3 font-bold hover:bg-gray-100">
                    Login
                </Link>
                <Link to="/toilets" className="flex items-center  text-red-400 px-3 font-bold bg-white hover:bg-gray-100">
                Toilets
              </Link>
              </>
                } */}
{/*                
            </span> */}
        </div>

    </div>
  )
}

export default Header
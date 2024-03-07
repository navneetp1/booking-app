import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {

    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-gradient-to-r from-red-800 to-red-500 text-white py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to='/'>chillHolidays.com</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? (<>
                        
                        <Link className='flex item-center rounded-xl text-black px-3 py-1 font-bold bg-yellow-200 hover:bg-yellow-400' 
                              to='/my-bookings'>My Bookings</Link>
                        <Link className='flex item-center rounded-xl text-black px-3 py-1 font-bold bg-yellow-200 hover:bg-yellow-400' 
                              to='/my-hotels'>My Hotels</Link>
                        <SignOutButton/>
                    </>
                    ):(  
                     <Link to='/sign-in' 
                          className='flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 '>
                        Sign In
                    </Link>
                    )}
                  
                </span>
            </div>
        </div>
    )
}
export default Header;
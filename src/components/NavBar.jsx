import React from "react";
import { Link } from "react-router-dom";

function NavBar(){
    return(
        <div className=" bg-blue-400">
            <div className="ml-5 flex flex-row gap-5 text-center">
                <h1 className="font-bold text-5xl italic">Su<span className="text-orange-400">man</span></h1>
                <nav className="flex flex-row gap-4 mt-[1%] absolute ml-[80%] text-center items-center justify-center font-semibold cursor-pointer">
                    <p><Link to='/home'>Home</Link></p>
                    <p><Link to='/skills'>Skills</Link></p>
                    <p>About</p>
                </nav>
            </div>
        </div>
    )
}
export default NavBar
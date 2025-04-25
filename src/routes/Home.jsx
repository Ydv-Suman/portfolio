import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import image from "../assets/image.jpeg";
import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';



function Home(){
    return(
        <div>
            <div className="absolute top-[35%] ml-[10%]">
                <p className="font-semibold font-serif text-5xl text-gray-500">Hey! I am Suman, <br/>a web developer</p>
                <p className="font-semibold text-gray-500 mt-[5%]">Creative and detail-oriented web developer passionate<br/> 
                about building responsive, user-friendly websites and<br/> modern web applications.</p>
            </div>

            <div className="absolute top-[5%] right-[20%] w-[100%] h-[95%] bg-cover bg-center z-[-1]"
                style={{ backgroundImage: `url(${image})` }}
            >
            </div>


            <div className="absolute top-[80%] ml-[80%]">
                <p className="font-semibold text-center text-xl mb-[4%]">FOLLOW ME</p>
                <div className="flex flex-row gap-5">
                    <p>
                        <a href="https://www.instagram.com/ydv__suman" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-pink-600 text-3xl hover:text-pink-400 cursor-pointer" />
                          </a>
                    </p>
                    <p>
                        <a href="https://www.facebook.com/ydv.smn" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-blue-600 text-3xl hover:text-blue-400 cursor-pointer" />
                        </a>
                    </p>
                    <p>
                        <a href="www.linkedin.com/in/suman-ydv" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-blue-700 text-3xl hover:text-blue-500 cursor-pointer" />
                        </a>
                    </p>
                    <p>
                        <a href="https://github.com/Ydv-Suman" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-gray-800 text-3xl hover:text-gray-600 cursor-pointer" />
                        </a>
                    </p>
                </div>
            </div>
            

        </div>
    )
}
export default Home;

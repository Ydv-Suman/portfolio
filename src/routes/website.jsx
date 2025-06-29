import { Link } from "react-router-dom";
import image from "../assets/image.jpeg";
import skills from "../skills.json";
import gif from "../assets/giphy.gif";
import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';

function Website() {
  return (
    <div className="bg-blue-900 min-h-screen font-sans">

      <div className="flex justify-between items-center px-5 py-4 bg-blue-800 shadow-md">
        <p className="text-4xl font-bold font-serif text-white">SUMAN</p>
        <div className="flex gap-2.5 text-lg text-white font-semibold">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <Link to="/skills" className="hover:text-gray-900">Skills</Link>
          <Link to="/projects" className="hover:text-gray-900">Projects</Link>
          <Link to="/contact" className="hover:text-gray-900">Contact</Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-evenly px-10 py-20 gap-6 mt-[10%]">
        <div className="max-w-xl">
          <p className="text-xl font-semibold leading-relaxed text-white">
            Hi! I am <span className="text-yellow-300">Suman Yadav,<br />
              Full-Stack Explorer<br />
              Aspiring Data Scientist<br /><br />
            </span>
            <span className="font-normal">
              I'm a tech enthusiast passionate about transforming data into real-world insights
              and scalable solutions. <br />Currently diving deep into <span className="text-teal-300">
                Data Science, Machine Learning, and AI, I've built a strong foundation in web
                development and algorithmic problem-solving.
              </span>
            </span>
          </p>
          <p className="font-semibold font-serif items-center ml-5 mt-3 text-center w-25 h-8 rounded-2xl border-4 border-green-400 ">
            <button className="cursor-pointer ">Hire Me</button>
          </p>
          <div className="flex gap-4 mt-10">
            <Link to="https://github.com/Ydv-Suman" target="_blank">
              <FaGithub className="text-white text-2xl hover:text-blue-500" />
            </Link>
            <Link to="https://www.linkedin.com/in/suman-ydv" target="_blank">
              <FaLinkedin className="text-white text-2xl hover:text-blue-500" />
            </Link>
            <Link to="https://facebook.com/ydv.smn" target="_blank">
              <FaFacebook className="text-white text-2xl hover:text-blue-500" />
            </Link>
            <Link to="https://instagram.com/ydv__suman" target="_blank">
              <FaInstagram className="text-white text-2xl hover:text-blue-500" />
            </Link>
          </div>
        </div>

        <img
          src={image}
          alt="profile"
          className="w-75 h-75 object-cover rounded-full border-4 border-white shadow-lg"
        />
      </div>

      {/* SKILLS */}

      <div className="px-4 md:px-10 py-10 mt-[15%]">
        <h1 className="text-center font-bold text-4xl text-white animate-bounce mb-12">Skills</h1>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-center lg:items-start">
          {/* Skills List - Left Side */}
          <div className="grid grid-cols-1 gap-8 flex-1">
            {/* Languages */}
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-purple-400 mb-4">Languages</h3>
              <div className="flex flex-wrap gap-3">
                {skills.language.map((lang, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-white rounded-full border-2 border-purple-500 hover:border-purple-300 hover:bg-purple-900 hover:bg-opacity-30 transition-all duration-300 hover:scale-105"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Libraries */}
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4">Libraries & Frameworks</h3>
              <div className="flex flex-wrap gap-3">
                {skills.Libraries.map((lib, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-white rounded-full border-2 border-blue-500 hover:border-blue-300 hover:bg-blue-900 hover:bg-opacity-30 transition-all duration-300 hover:scale-105"
                  >
                    {lib}
                  </span>
                ))}
              </div>
            </div>

            {/* Markup */}
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-green-400 mb-4">Markup & Styling</h3>
              <div className="flex flex-wrap gap-3">
                {skills.Markup.map((markup, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-white rounded-full border-2 border-green-500 hover:border-green-300 hover:bg-green-900 hover:bg-opacity-30 transition-all duration-300 hover:scale-105"
                  >
                    {markup}
                  </span>
                ))}
              </div>
            </div>

            {/* Other */}
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-orange-400 mb-4">Other Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.Other.map((other, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-white rounded-full border-2 border-orange-500 hover:border-orange-300 hover:bg-orange-900 hover:bg-opacity-30 transition-all duration-300 hover:scale-105"
                  >
                    {other}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* GIF */}
          <div className="w-full lg:w-1/3 flex-shrink-0 rounded-xl overflow-hidden border-2 border-gray-700 hover:border-purple-500 mt-[15%] ml-[6%] transition-all duration-300">
            <img
              src={gif}
              alt="Coding animation"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      );

      {/* PROJECTS */}

      <div className="mt-[15%]">
        <h1 className="text-center font-bold text-4xl text-white animate-bounce mb-8">PROJECTS</h1>
      </div>

    </div>
  );
}

export default Website;

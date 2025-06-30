import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../assets/image.jpeg";
import skills from "../skills.json";
import gif from "../assets/giphy.gif";
import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';

const GITHUB_USERNAME = "Ydv-Suman";

function Website() {
  const [repos, setRepos] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(repo => !repo.fork);
        setRepos(filtered);
      })
      .catch((err) => console.error("GitHub API error:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill all fields.");
      return;
    }
    setStatus("Message sent! Thank you.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleScroll = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-blue-900 min-h-screen font-sans">

      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 py-4 bg-blue-800 shadow-md">
        <p className="text-4xl font-bold font-serif text-white">SUMAN</p>
        <nav className="flex gap-2.5 text-lg text-white font-semibold">
          {["home", "skills", "projects", "about", "contact"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => handleScroll(e, section)}
              className="hover:text-gray-900 capitalize"
            >
              {section}
            </a>
          ))}
        </nav>
      </div>

      {/** Home */}

      <section id="home" className="flex flex-col md:flex-row items-center justify-evenly px-10 py-20 gap-6 pt-[180px]">
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
          <p>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="font-bold ml-[10%] mt-[4%] cursor-pointer px-4 py-2 text-white rounded-full border-2 border-green-500 hover:border-green-300 hover:bg-green-900 hover:bg-opacity-30 transition-all duration-300 hover:scale-105"
            >
              Hire Me
            </button>
          </p>
          <div className="flex gap-4 mt-8 ml-[5%]">
            <a href="https://github.com/Ydv-Suman" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-white text-2xl hover:text-blue-500" />
            </a>
            <a href="https://www.linkedin.com/in/suman-ydv" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-white text-2xl hover:text-blue-500" />
            </a>
            <a href="https://facebook.com/ydv.smn" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-white text-2xl hover:text-blue-500" />
            </a>
            <a href="https://instagram.com/ydv__suman" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white text-2xl hover:text-blue-500" />
            </a>
          </div>
        </div>

        <img
          src={image}
          alt="profile"
          className="w-75 h-75 object-cover rounded-full border-4 border-white shadow-lg"
        />
      </section>

      {/* SKILLS */}

      <section id="skills" className="px-4 md:px-10 py-10 mt-[12%]">
        <h1 className="text-center font-bold text-4xl text-white animate-bounce mb-12">Skills</h1>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-center lg:items-start">
          <div className="grid grid-cols-1 gap-8 flex-1">
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

          <div className="w-full lg:w-1/3 flex-shrink-0 rounded-xl overflow-hidden border-2 border-gray-700 hover:border-purple-500 mt-[15%] ml-[6%] transition-all duration-300">
            <img
              src={gif}
              alt="Coding animation"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* PROJECTS */}

      <section id="projects" className="mt-[15%]">
        <h1 className="text-center font-bold text-4xl text-white animate-bounce mb-8">PROJECTS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-16 pb-20">
          {repos.slice(0, 6).map((repo) => (
            <div
              key={repo.id}
              className="bg-gray-800 text-white p-6 rounded-xl shadow-lg border-2 border-blue-500 hover:border-yellow-400 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
              <p className="text-sm text-gray-300 mb-4">
                {repo.description ? repo.description : "No description available."}
              </p>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-400 hover:text-yellow-300 font-medium"
              >
                🔗 View on GitHub
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}

      <section id="about" className="mt-[15%] px-10 pb-16">
        <h1 className="font-bold text-4xl text-white text-center animate-bounce delay-1000">ABOUT ME</h1>
        <p className="text-lg text-white leading-relaxed text-justify mx-auto max-w-4xl mt-6">
          Hello! I’m <span className="text-yellow-300 font-semibold">Suman Yadav</span>, a tech enthusiast, problem-solver, and lifelong learner from Monroe, Louisiana. I’m currently pursuing my Bachelor’s in Computer Science at the <span className="text-teal-300">University of Louisiana</span>, where I’m building a strong foundation in both <span className="text-teal-300 font-medium">software development</span> and <span className="text-purple-300 font-medium">data science</span>.
          <br /><br />
          My journey into technology began with curiosity — wondering how websites work, how data flows, and how machines learn. Since then, I’ve explored a variety of domains, from designing responsive UIs with <span className="text-pink-300 font-medium">React</span> and <span className="text-pink-300 font-medium">Tailwind</span> to building Java-based backend systems and diving deep into <span className="text-purple-300 font-medium">machine learning models</span> using Python libraries like <span className="text-green-300 font-medium">Pandas, Scikit-learn, and Matplotlib</span>.
          <br /><br />
          I’m particularly passionate about solving real-world problems through code. Whether it's a data-driven ML model for health prediction or a full-stack web app for task management, I strive to build solutions that are practical, user-centric, and scalable.
          <br /><br />
          My experience spans <span className="text-orange-300 font-medium">hackathons, projects, and academic research</span>. These experiences have helped me not only improve technically, but also taught me how to communicate ideas, collaborate with diverse teams, and adapt quickly in fast-paced environments.
          <br /><br />
          Outside of coding, I enjoy reading about AI ethics, experimenting with new APIs, and participating in online coding challenges. I believe in continuous learning, and I’m always looking for the next opportunity to grow — as a developer, as a data scientist, and as a person.
          <br /><br />
          I’m currently open to internships, freelance opportunities, and collaborations where I can apply my skills, learn from industry challenges, and contribute meaningfully to real-world projects.
          <br /><br />
          <span className="text-green-300 font-semibold">Let’s connect and create something amazing together.</span>
        </p>
      </section>

      {/** Contact */}
      <section id="contact" className="mt-[15%] px-10 pb-16">
        <h1 className="font-bold text-4xl text-white text-center animate-bounce delay-1000">Contact</h1>
        <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-20 max-w-4xl mx-auto">

          <a
            href="/Yadav_Suman_Resume.pdf"
            download
            className="font-bold cursor-pointer px-6 py-3 text-white rounded-full border-2 border-green-500 hover:border-green-300 hover:bg-green-900 hover:bg-opacity-30 transition-all duration-300 hover:scale-105"
          >
            ⬇️ Resume
          </a>

          <form
            action="https://formsubmit.co/sumanydv615@gmail.com"
            method="POST"
            className="max-w-md mx-auto bg-gray-500 p-6 rounded-xl text-white mt-10"
          >
            {/* Disable CAPTCHA */}
            <input type="hidden" name="_captcha" value="false" />

            {/* Redirect after submission (optional) */}
            <input
              type="hidden"
              name="_next"
              value="https://yourdomain.com/thank-you"
            />

            <h2 className="text-2xl mb-4 font-semibold">Contact Me</h2>

            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                required
                className="w-full mt-1 p-2 rounded-md text-black"
                placeholder="Your full name"
              />
            </label>

            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                required
                className="w-full mt-1 p-2 rounded-md text-black"
                placeholder="Your email address"
              />
            </label>

            <label className="block mb-4">
              Message:
              <textarea
                name="message"
                required
                className="w-full mt-1 p-2 rounded-md text-black"
                rows="5"
                placeholder="Your message"
              ></textarea>
            </label>

            <button
              type="submit"
              className="bg-green-500 px-4 py-2 rounded-full hover:bg-green-600 transition"
            >
              Send Message
            </button>
          </form>


        </div>
      </section>
    </div>
  );
}

export default Website;

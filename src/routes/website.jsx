import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../assets/image.jpeg";
import skills from "../skills.json";
import gif from "../assets/giphy.gif";
import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';

const GITHUB_USERNAME = "Ydv-Suman";

function Website() {
  const [repos, setRepos] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    // Here you would typically send the form data to a backend
    console.log("Form submitted:", formData);
    setStatus("Message sent! Thank you.");
    setFormData({ name: "", email: "", message: "" });

    // You might want to actually send the data to an API here
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => setStatus("Message sent! Thank you."))
    // .catch(error => setStatus("Error sending message."));
  };

  const handleScroll = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 min-h-screen font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-white tracking-wider">
              SUMAN
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["home", "skills", "projects", "about", "contact"].map((section) => (
                <Link
                  key={section}
                  to={`#${section}`}
                  onClick={(e) => handleScroll(e, section)}
                  className="text-white/90 hover:text-white capitalize text-sm font-medium transition-colors duration-200 hover:scale-105 transform"
                >
                  {section}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/10 backdrop-blur-md rounded-lg mt-2 p-4">
              {["home", "skills", "projects", "about", "contact"].map((section) => (
                <Link
                  key={section}
                  to={`#${section}`}
                  onClick={(e) => handleScroll(e, section)}
                  className="block text-white/90 hover:text-white capitalize py-2 text-sm font-medium transition-colors duration-200"
                >
                  {section}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Hi! I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Suman Yadav</span>
                </h1>
                <h2 className="text-xl sm:text-2xl text-blue-300 font-semibold">
                  Full-Stack Explorer
                </h2>
                <h3 className="text-lg sm:text-xl text-purple-300 font-medium">
                  Aspiring Data Scientist
                </h3>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                I'm a tech enthusiast passionate about transforming data into real-world insights
                and scalable solutions. Currently diving deep into
                <span className="text-teal-300 font-medium"> Data Science, Machine Learning, and AI</span>,
                I've built a strong foundation in web development and algorithmic problem-solving.
              </p>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleScroll({ preventDefault: () => { } }, "contact")}
                  className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-blue-600 rounded-full hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Hire Me
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <a
                  href="https://github.com/Ydv-Suman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-gray-800 rounded-full hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FaGithub className="mr-2 w-5 h-5" />
                  GitHub
                </a>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 animate-pulse">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img src={image} alt="Suman Yadav" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 opacity-20 animate-spin-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-purple-400 rounded-full mr-3"></span>
                  Languages
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.language.map((lang, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-white bg-purple-500/20 border border-purple-400/30 rounded-full hover:bg-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105 transform"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-3"></span>
                  ML and Data Science
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.MlDataScience.map((ml, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-white bg-blue-500/20 border border-blue-400/30 rounded-full hover:bg-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-105 transform"
                    >
                      {ml}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
                    <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                    Web Developement
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.WebDevelopement.map((web, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-white bg-green-500/20 border border-green-400/30 rounded-full hover:bg-green-500/30 hover:border-green-400 transition-all duration-300 hover:scale-105 transform"
                      >
                        {web}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-orange-400 mb-6 flex items-center">
                    <span className="w-3 h-3 bg-orange-400 rounded-full mr-3"></span>
                    Tools
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.tools.map((tools, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-white bg-orange-500/20 border border-orange-400/30 rounded-full hover:bg-orange-500/30 hover:border-orange-400 transition-all duration-300 hover:scale-105 transform"
                      >
                        {tools}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img src={gif} alt="Coding animation" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">PROJECTS</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.slice(0, repos.length).map((repo) => (
              <div
                key={repo.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 transform group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                    {repo.name}
                  </h3>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {repo.description || "No description available."}
                </p>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-white font-medium transition-colors duration-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">ABOUT ME</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto"></div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 lg:p-12 border border-white/20">
            <div className="prose prose-lg max-w-none text-gray-300 leading-relaxed">
              <p className="mb-6">
                Hello! I'm <span className="text-yellow-400 font-semibold">Suman Yadav</span>, a tech enthusiast, problem-solver, and lifelong learner from Monroe, Louisiana. I'm currently pursuing my Bachelor's in Computer Science at the <span className="text-teal-400">University of Louisiana</span>, where I'm building a strong foundation in both <span className="text-teal-400 font-medium">software development</span> and <span className="text-purple-400 font-medium">data science</span>.
              </p>

              <p className="mb-6">
                My journey into technology began with curiosity — wondering how websites work, how data flows, and how machines learn. Since then, I've explored a variety of domains, from designing responsive UIs with <span className="text-pink-400 font-medium">React</span> and <span className="text-pink-400 font-medium">Tailwind</span> to building Java-based backend systems and diving deep into <span className="text-purple-400 font-medium">machine learning models</span> using Python libraries like <span className="text-green-400 font-medium">Pandas, Scikit-learn, and Matplotlib</span>.
              </p>

              <p className="mb-6">
                I'm particularly passionate about solving real-world problems through code. Whether it's a data-driven ML model for health prediction or a full-stack web app for task management, I strive to build solutions that are practical, user-centric, and scalable.
              </p>

              <p className="mb-6">
                My experience spans <span className="text-orange-400 font-medium">hackathons, projects, and academic research</span>. These experiences have helped me not only improve technically, but also taught me how to communicate ideas, collaborate with diverse teams, and adapt quickly in fast-paced environments.
              </p>

              <p className="mb-6">
                Outside of coding, I enjoy reading about AI ethics, experimenting with new APIs, and participating in online coding challenges. I believe in continuous learning, and I'm always looking for the next opportunity to grow — as a developer, as a data scientist, and as a person.
              </p>

              <p className="mb-6">
                I'm currently open to internships, freelance opportunities, and collaborations where I can apply my skills, learn from industry challenges, and contribute meaningfully to real-world projects.
              </p>

              <p className="text-green-400 font-semibold text-xl">
                Let's connect and create something amazing together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Contact</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold text-white mb-6">Let's work together</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always interested in new opportunities and exciting projects.
                Feel free to reach out if you'd like to collaborate or just say hello!
              </p>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
                <a
                  href="/Yadav_Suman_Resume.pdf"
                  download
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-blue-600 rounded-full hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>

                <div className="flex justify-center space-x-4">
                  <a href="https://github.com/Ydv-Suman" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
                    <FaGithub className="w-8 h-8" />
                  </a>
                  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
                    <FaLinkedin className="w-8 h-8" />
                  </a>
                  <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
                    <FaInstagram className="w-8 h-8" />
                  </a>
                  <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <FaFacebook className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />

                <div>
                  <label className="block text-white font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
                    placeholder="Your email address"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>

                {status && (
                  <p className="text-center text-sm font-medium text-green-400 mt-4">
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0 text-center">
              © 2025 Suman Yadav. Built with React & Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Website;
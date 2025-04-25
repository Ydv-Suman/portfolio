import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import skill from "../skills.json";

const Skills = () => {
    return (
      <div className="p-10">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-600">My Skills</h2>
        <div className="flex flex-row justify-center gap-6 cursor-pointer">
          {skill.map(({ id, name, level, image }) => (
            <div
              key={id}
              className="bg-white shadow-lg rounded-lg overflow-hidden text-center p-4 hover:shadow-xl transition duration-300"
            >
              <div className="w-20 h-20 bg-blue-100 text-blue-700 rounded-full mx-auto flex items-center justify-center mb-4 text-xl font-bold">
                {name[0]}
              </div>
              <h3 className="text-xl font-semibold mb-1">{name}</h3>
              <p className="text-sm text-gray-600">{level}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Skills;
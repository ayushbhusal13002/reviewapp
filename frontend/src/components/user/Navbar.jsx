import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Container from "../Container";
import { useTheme } from "../hooks";

export default function Navbar() {
  const { toggleTheme } = useTheme();

  return (
    <div>
      <div className="bg-secondary shadow-sm shadow-gray-500">
        <Container className="p-2">
          <div className="flex justify-between items-center">
            <Link to="/">
              <img src="./logo.png" alt="" className="h-10" />
            </Link>
            <ul className="flex items-center space-x-4">
              <li>
                <button
                  onClick={toggleTheme}
                  className="bg-dark-subtle p-1 rounded"
                >
                  <BsFillSunFill className="text-secondary" size={24} />
                </button>
              </li>
              <li>
                <input
                  type="text"
                  className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
                  placeholder="Search..."
                />
              </li>
              <Link to="/auth/sign-in" className="text-white font-semibold">
                Login
              </Link>
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
}

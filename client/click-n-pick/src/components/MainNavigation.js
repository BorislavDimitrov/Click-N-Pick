import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarLogo from "../img/navbarLogo.jpg";
import { GetUserImageUrl, RemoveUserImageUrl } from "../Utility/user";
import { isAdmin } from "../Utility/auth";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { GetAuthToken, RemoveAuthToken } from "../Utility/auth";

function MainNavigation() {
  const navigate = useNavigate();
  let [open, setOpen] = useState(false);

  const profileImageUrl = GetUserImageUrl();
  const token = GetAuthToken();

  function handleOnClick() {
    RemoveAuthToken();
    RemoveUserImageUrl();
    navigate("/");
  }

  return (
    <div className="shadow-md w-full">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-11">
        <div className="font-bold cursor-pointer flex items-center">
          <a className="font-bold text-xl  flex items-center " href="/">
            <img src={NavbarLogo} alt="navbar logo" />
            <span className="text-sm">Click N`Pick</span>
          </a>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        <ul
          className={`pl-9 pr-28 md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto left-0 w-full md:w-auto md:pl-0  transition-all duration-500 z-50 ease-in ${
            open ? "top-19" : "top-[-490px]"
          }`}
        >
          <li className="md:ml-8 md:my-0 my-7 font-semibold">
            <a
              href="/"
              className="text-gray-800 hover:text-blue-400 duration-500"
            >
              Home
            </a>
          </li>

          <li className="md:ml-8 md:my-0 my-7 font-semibold">
            <a
              href="/Products/Search"
              className="text-gray-800 hover:text-blue-400 duration-500"
            >
              Search
            </a>
          </li>

          {token && (
            <li className="md:ml-8 md:my-0 my-7 font-semibold">
              <a
                href="/products/create"
                className="text-gray-800 hover:text-blue-400 duration-500"
              >
                Publish
              </a>
            </li>
          )}

          {!token && (
            <li className="md:ml-8 md:my-0 my-7 font-semibold">
              <a
                href="/register"
                className="text-gray-800 hover:text-blue-400 duration-500"
              >
                Register
              </a>
            </li>
          )}
          {!token && (
            <li className="md:ml-8 md:my-0 my-7 font-semibold">
              <a
                href="/login"
                className="text-gray-800 hover:text-blue-400 duration-500"
              >
                Login
              </a>
            </li>
          )}

          {isAdmin() === true && (
            <li className="group relative dropdown md:ml-8 md:my-0 my-7 font-semibold cursor-pointer">
              Admin
              <div className="group-hover:block absolute hidden h-auto z-50">
                <ul className=" w-28 bg-white shadow px-3 py-3">
                  <li className=" py-2">
                    <a
                      href="/Administration/Categories"
                      className={
                        "text-gray-800 hover:text-blue-400 duration-500"
                      }
                    >
                      Categories
                    </a>
                  </li>
                  <li className="py-2">
                    <a
                      href="https://localhost:7235/hangfire"
                      className={
                        "text-gray-800 hover:text-blue-400 duration-500"
                      }
                    >
                      <button> Hangfire dashboard</button>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          )}

          {token && (
            <li className="group relative dropdown md:ml-8 md:my-0 my-7 font-semibold cursor-pointer">
              <div className="w-10 h-10">
                <img
                  // src={ProfilePic}
                  src={profileImageUrl}
                  className=" rounded-full border-solid border-2 border-grey w-10 h-10 object-fit hover:border-gray-950"
                  alt="profile pic"
                />
              </div>
              <div className="group-hover:block absolute hidden h-auto z-50">
                <ul className=" w-32 bg-white shadow-xl px-3 py-3">
                  <li className=" py-2">
                    <a
                      href="/Identity/UserSettings"
                      className={
                        "text-gray-800 hover:text-blue-400 duration-500"
                      }
                    >
                      Settings
                    </a>
                  </li>
                  <li className="py-2 border-t-2">
                    <a
                      href="/products/myProducts"
                      className={
                        "text-gray-800 hover:text-blue-400 duration-500"
                      }
                    >
                      My Products
                    </a>
                  </li>
                  <li className="py-2 border-t-2">
                    <a
                      href="/delivery/ShipmentsToReceive"
                      className={
                        "text-gray-800 hover:text-blue-400 duration-500"
                      }
                    >
                      Shipments to receive
                    </a>
                  </li>

                  <li className="py-2 border-t-2">
                    <a
                      href="/delivery/ShipmentsToSend"
                      className={
                        "text-gray-800 hover:text-blue-400 duration-500"
                      }
                    >
                      Shipments to send
                    </a>
                  </li>
                  <li className="py-2">
                    <button
                      type="button"
                      className="text-white bg-indigo-700 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={handleOnClick}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default MainNavigation;

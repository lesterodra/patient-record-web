"use client";

import { useState } from "react";
import { usePathname, redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { GoPeople } from "react-icons/go";
import { SlBookOpen } from "react-icons/sl";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineManageAccounts } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";

const NavBar = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [accountToggled, setAccountToggled] = useState<boolean>(false);
  const pathname = usePathname();

  const isActive = (pagePath: string): string =>
    pathname.split("/").includes(pagePath) ||
    (pathname === "/" && pagePath === "/")
      ? "bg-cyan-100 rounded"
      : "hover:bg-cyan-50";

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setIsToggled((prev: boolean) => !prev)}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/" className="flex ml-2 md:mr-24">
                <Image
                  src="/eyecare_logo.jfif"
                  alt="logo"
                  width="40"
                  height="40"
                  className="mr-3"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  DRS SAVE EYE CARE CENTER
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  {/* <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      src="/user.png"
                      alt="logo"
                      width="60"
                      height="60"
                      className="w-8 h-8 rounded-full"
                    />
                  </button> */}
                  {/* <button
                    onClick={() => {
                      router.push("/api/auth/signout");
                    }}
                  >
                    Logout
                  </button> */}
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isToggled ? "transform-none" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li className={isActive("dashboard")}>
              <a
                href="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <RxDashboard />
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li className={isActive("patients")}>
              <a
                href="/patients"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <GoPeople />
                <span className="flex-1 ml-3 whitespace-nowrap">Patients</span>
              </a>
            </li>
            <li className={isActive("records")}>
              <a
                href="/records"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <SlBookOpen />
                <span className="flex-1 ml-3 whitespace-nowrap">Records</span>
              </a>
            </li>
            <li className={isActive("users")}>
              <a
                href="/users"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <AiOutlineUserAdd />
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="account-dropdown"
                data-collapse-toggle="account-dropdown"
                onClick={() => {
                  setAccountToggled((prev) => !prev);
                }}
              >
                <MdOutlineManageAccounts />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Account
                </span>
                <IoIosArrowDown
                  className={`${accountToggled && "rotate-180"}`}
                />
              </button>
              <ul
                id="account-dropdown"
                className={`${
                  !accountToggled && !pathname.includes("settings") && "hidden"
                } py-2 space-y-2`}
              >
                <li className={isActive("settings")}>
                  <a
                    href="/settings"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="/api/auth/signout"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </li>

            {/* <li className={isActive("logs")}>
              <a
                href="/Logs"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CiBoxList />
                <span className="flex-1 ml-3 whitespace-nowrap">Logs</span>
              </a>
            </li> */}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default NavBar;

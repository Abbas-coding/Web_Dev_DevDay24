import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav class="flex items-center justify-between flex-wrap bg-teal p-4 pl-10 bg-[#f2f0f3] border shadow-sm">
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <span class="font-semibold font-Poppins text-xl text-[#000]">
          ValtSec
        </span>
      </div>
      <div class="flex-grow flex justify-end lg:w-auto mr-6 ">
        {/* <div className={`${styles.noramlFlex}`}>
          <div className="relative cursor-pointer mr-[15px]">
            {isAuthenticated ? (
              <Link to="/profile">
                <img
                  src={`${backend_url}${user.avatar}`}
                  className="w-[37px] h-[37px] rounded-full"
                  alt=""
                />
              </Link>
            ) : (
              <Link to="/login">
                <CgProfile size={30} color="rgb(255 255 255 /83%)" />
              </Link>
            )}
          </div>
        </div> */}
        <div>
          <Link
            to="/login"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal hover:bg-[#000] mt-4 lg:mt-0"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;

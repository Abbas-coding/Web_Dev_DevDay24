import React from 'react'
import styles from '../styles/styles'
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`grid grid-flow-row md:grid-cols-2 min-h-[65vh] 800px:min-h-[60vh] p-[70px] w-full bg-no-repeat ${styles.noramlFlex}`}
    
    >
      <div className=' mr-2 col-sm-12 object-contain flex'>
        <img src="https://d38cf3wt06n6q6.cloudfront.net/tyasuitefront/webgpcs/images/project-management-tool.png" alt="hero" />
      </div>
      <div className={`${styles.section} block col-sm-12`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[50px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Project Management & Version <br /> Control Tool
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#00000ba]">
          Manage your projects, code along with version control functionality.
        </p>
        <Link to="/login" className="inline-block">
            <div className={`${styles.button} bg-[#000] mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Login
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero

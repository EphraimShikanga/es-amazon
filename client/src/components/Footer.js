import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
const Footer = ({ pos }) => {
  return (
    <footer
      className={`footer ${pos}  inset-x-0 bottom-0 mt-4 bg-stone-900`}
    >
      {/* Icons */}
      <div className="flex mx-2 justify-center icons">
        <div className=" flex mt-8 text-2xl md:text-4xl gap-8 md:gap-20">
          <a
            href="https://github.com/EphraimShikanga"
            rel="noreferrer"
            target="_blank"
          >
            <AiFillGithub />
          </a>
          <a
            className="text-sky-700"
            href="https://www.linkedin.com/in/ephraim-shikanga/"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
      {/* Copyright */}
      <div className="copyright flex justify-center text-slate-400 pb-4 pt-4">
        EphraimShikanga Ⓒ 2024
      </div>
    </footer>
  );
};

export default Footer;

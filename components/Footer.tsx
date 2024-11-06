import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full px-4 py-8 border-t bg-white">
      <div className="max-w-4xl mx-auto  pt-4 flex justify-center">
        <div className="grid sm:grid-cols-3 grid-cols-2 w-[660px]  gap-4 text-sm mb-4">
          <Link href="#" className="text-gray-700 font-bold">
            Contact Us
          </Link>
          <Link href="#" className="text-gray-700 font-bold">
            About Us
          </Link>
          <Link href="#" className="text-gray-700 font-bold">
            Privacy Policy
          </Link>
          <Link href="#" className="text-gray-700 font-bold">
            Terms Companies
          </Link>
          <Link href="#" className="text-gray-700 font-bold">
            Terms Reviewers
          </Link>
          <div className=" text-gray-500">
            © Expeerly AG, {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

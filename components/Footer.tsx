import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full px-4 py-8 bg-white">
     
      <div className="sm:w-[460px] w-auto mx-auto text-start sm:text-center mb-12">
        <h2 className="text-2xl text-center font-extrabold mb-4">
          How Expeerly works?
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Expeerly is a place for consumers to get insights about what other shoppers 
          think of products and services. The video reviews are real and authentic 
          shared by our community of reviewers from our globe.
        </p>
        <Link 
          href="#" 
          className="inline-block w-full text-center sm:w-[300px] px-8 py-2 rounded-full bg-white text-pink-500 border-2 border-pink-500 hover:bg-pink-50 transition-colors"
        >
          Learn more
        </Link>
      </div>

      <div className="max-w-4xl mx-auto  border-t pt-4 flex justify-center">
        <div className="grid sm:grid-cols-3 grid-cols-2 w-[660px]  gap-4 text-sm mb-4">
          <Link href="#" className="text-gray-700 font-bold">Contact Us</Link>
          <Link href="#" className="text-gray-700 font-bold">About Us</Link>
          <Link href="#" className="text-gray-700 font-bold">Privacy Policy</Link>
          <Link href="#" className="text-gray-700 font-bold">Terms Companies</Link>
          <Link href="#" className="text-gray-700 font-bold">Terms Reviewers</Link>
          <div className=" text-gray-500">
          © Expeerly AG, {new Date().getFullYear()}
        </div>
        </div>
        
        
        
      </div>
    </footer>
  );
};

export default Footer;
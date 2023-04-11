import * as React from 'react';
import Link from 'next/link';

export interface INavbarProps {
}

export function Navbar (props: INavbarProps) {
  return (
    <>
    <nav className="bg-gradient-to-r from-black to-gray-900">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="text-white text-xl font-bold">FilmFinder</div>
          </Link>
          <button className="text-white bg-transparent border border-white py-2 px-4 rounded">
            Log In
          </button>
        </div>
      </nav>
      
  </>
  );
}

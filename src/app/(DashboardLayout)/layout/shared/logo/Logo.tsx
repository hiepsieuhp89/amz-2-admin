import React from 'react';
import Link from "next/link";
import Image from "next/image";
const Logo = () => {
return (
  <Link 
    href="/" 
    className="relative block w-full mt-4 h-14"
  >
    <Image 
      quality={100}
      draggable={false} 
      fill
      className="object-contain w-full h-full"
      src="/images/logos/logo.png" 
      alt="logo"  
    />
  </Link>
);
};

export default Logo;
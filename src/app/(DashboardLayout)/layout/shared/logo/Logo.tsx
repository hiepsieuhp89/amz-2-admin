import React from 'react';
import Link from "next/link";
import Image from "next/image";
const Logo = () => {
  return (
    <Link
      href="/"
      className="relative block w-full h-16 pt-6"
    >
      <Image
        quality={100}
        draggable={false}
        fill
        className="object-contain w-full h-full pt-4"
        src="/images/logos/logo.png"
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
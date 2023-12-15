import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/pheclogo.png"
          className="sm:w-12 sm:h-12 w-8 h-8"
          width={34}
          height={34}
        />
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          phec
        </h1>
      </Link>
      {/* <a
        href="https://phec.astreak.in/"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="Brand Icon"
          src="/name.png"
          className="sm:w-8 sm:h-[27px] w-8 h-[28px]"
          width={32}
          height={28}
        />
      </a> */}
    </header>
  );
}

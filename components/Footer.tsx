import Link from "next/link";
import { Icons } from "./icons";

export default function Footer() {
  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3">
      <div>
        Powered by{" "}
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Astreak{" "}
        </a>
        •{" "}
        <a
          href="https://forms.gle/r6rYUcqZWnKVvxbW7"
          target="_blank"
          rel="noreferrer"
          className="hover:underline transition underline-offset-2"
        >
          Feature request
        </a>
      </div>

      <div className="flex space-x-4 pb-4 sm:pb-0">
        <Link
          href="https://twitter.com/theskaai"
          className="group"
          aria-label="TaxPal on Twitter"
        >
          <Icons.twitx className="mr-2 h-5 w-5" />
        </Link>
        <Link
          href="https://github.com/theakashshukla/"
          className="group"
          aria-label="TaxPal on GitHub"
        >
          <Icons.gitHub className="mr-2 h-5 w-5" />
        </Link>
        <Link
          href="https://peerlist.io/theakashshukla"
          className="group"
          aria-label="TaxPal on GitHub"
        >
          <Icons.peerlist className="mr-2 h-5 w-5" />
        </Link>
      </div>
    </footer>
  );
}

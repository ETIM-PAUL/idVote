import Link from "next/link";

const HomeNav = () => {
  return (
    <nav
      className="relative flex w-full items-center justify-between nav_col py-2 sm:py-5 sm:px-16 px-4"
      data-te-navbar-ref
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex">
          <Link
            href="/"
            className="text-3xl geostar_font uppercase text-[#fefefe]"
          >
            idVote
          </Link>

          <div
            className="!visible mt-2 hidden mono_font text-xl items-center md:mt-0 md:!flex md:basis-auto"
            id="navbarSupportedContent3"
            data-te-collapse-item
          >
            <div
              className="list-style-none mr-auto flex flex-col pl-0 md:mt-1 md:flex-row text-white"
              data-te-navbar-nav-ref
            >
              <span></span>
            </div>
          </div>
        </div>

        <button
          className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 md:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent3"
          aria-controls="navbarSupportedContent3"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <div
          className="!visible mt-2 hidden bg-[#cdcfde] py-3 px-3 rounded-2xl flex-gro basis-[100%] items-center md:mt-0 md:!flex md:basis-auto hover:cursor-pointer"
          id="navbarSupportedContent3"
          data-te-collapse-item
        >
          <a
            href="#apps"
            className="p- mono_font text-black text-xl transition duration-200 hover:ease-in-out motion-reduce:transition-none md:px-2"
            data-te-nav-link-ref
          >
            Launch App
          </a>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;

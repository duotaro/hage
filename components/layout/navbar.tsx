"use client";
 
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { Japan } from "../shared/icons";
import { useState, useEffect } from "react";
import DropdownLang from "./dropdown-lang";
import { useParams } from "next/navigation";


const darkModeClass = "dark"

export default function NavBar({ session}: { 
  session: Session | null
 }) {
  // const dict = await getLocales(lang)
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [isDark, setIsDark] = useState(false)
  const scrolled = useScroll(50);
  const param = useParams()

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    const body = document.getElementById("main-body")
    if(!body){
      return
    }
    if(!isDark) {
      body.classList.add(darkModeClass);
    } else {
      body.classList.remove(darkModeClass);
    }
  }


  useEffect(() => {
	  
  },[])


  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href={`/${param.lang}`} className="flex items-center font-display text-2xl">
            <p className="p-2">Hage マシ</p>
          </Link>
          <div className="grid grid-cols-3 gap-1">
            <div className="">
              {session ? (
                <UserDropdown session={session} />
              ) : (
                <button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                >
                  Sign In
                </button>
              )}
            </div>
            {/* ダークモード */}
            <div className="p-1">
              {isDark && 
                <a onClick={toggleDarkMode}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3V1m0 18v-2M5.05 5.05 3.636 3.636m12.728 12.728L14.95 14.95M3 10H1m18 0h-2M5.05 14.95l-1.414 1.414M16.364 3.636 14.95 5.05M14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
                </svg>
                </a>
              }
              {!isDark && 
              <a onClick={toggleDarkMode}>
                <svg className="w-6 h-6 text-gray-800 dark:text-dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.509 5.75c0-1.493.394-2.96 1.144-4.25h-.081a8.5 8.5 0 1 0 7.356 12.746A8.5 8.5 0 0 1 8.509 5.75Z"/>
                </svg>
                </a>
              }
            </div>
            {/* 言語切り替え */}
            <div className="">
              <DropdownLang />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

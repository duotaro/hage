"use client";
import { signOut } from "firebase/auth";
import { LayoutDashboard, LogOut } from "lucide-react";
import Popover from "../../component/shared/popover";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FormEvent, useState } from 'react';
import { User, createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import Link from 'next/link';
import {initializeFirebaseApp} from '../../lib/firebase/firebase'
import { useFirebaseContext, SET_USER, SET_FIREBASE_APP, SET_FIREBASE_AUTH, SET_LOADING } from '@/context/firebase.context';
import Utils from '@/utils/utils';


export default function UserDropdown({ user }: { user: User }) {
  const { state, dispatch } = useFirebaseContext()
  const { email, photoURL } = user || {};
  const [openPopover, setOpenPopover] = useState(false);
  const param = useParams()


  if (!email) return null;

  /**
   * 新規登録
   */
  const signOutClickHandler = async (e : FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const firebase = state.firebase || initializeFirebaseApp();
    dispatch({type: SET_FIREBASE_APP, value: firebase})
    const auth = state.firebaseAuth || getAuth(firebase);
    dispatch({type: SET_FIREBASE_AUTH, value: auth})
    dispatch({type: SET_LOADING, value: true})

    signOut(auth).then((res) => {
      dispatch({type: SET_USER, value: null})
      dispatch({type: SET_LOADING, value: false})
    }).catch((error) => {
      dispatch({type: SET_LOADING, value: false})
      Utils.errorMessage(`${error}`)
    })
}

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            <Link
              className="flex items-center justify-start space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              href={`/${param.lang}/dashboard`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </Link>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={(e) => signOutClickHandler(e)}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={photoURL || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  );
}

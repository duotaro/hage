import Navbar from "./navbar";
import { User } from "firebase/auth";

export default function Nav({ user }: { 
  user: User | null
 }) {

  return <Navbar user={user}></Navbar>
}

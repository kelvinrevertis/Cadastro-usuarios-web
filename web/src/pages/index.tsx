import { AuthContextProvider } from "../contexts/AuthContext"
import Link from "next/link"
import { SignIn } from "./signin"

export default function Home() {
  return (
    <SignIn/>
      )
}

export const getServerSideProps = async () => {
  try {
    const response = await fetch('http://localhost:3333/')
    const data = await response.json()

    console.log(data)

    return {
      props: {}
    }
  } catch (error) {
    console.log(error)
    return {
      props:{}
    }
  }
}




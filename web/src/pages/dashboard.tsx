import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"


function Dashboard() {
    const auth = useContext(AuthContext)

    return (
       // <div><h1>Olá {auth.user?.name}</h1></div>
        <div><h1>Olá</h1></div>
    )
}

export default Dashboard
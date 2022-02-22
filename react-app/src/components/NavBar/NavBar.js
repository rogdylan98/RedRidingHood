import { NavLink } from "react-router-dom"
import LogoutButton from "../auth/LogoutButton"
import './NavBar.css'
import SearchBar from "./SearchBar"
const NavBar = () => {
    return (
        <nav className="logged-in-nav">
            <div className="main-container-div">
                <NavLink className='logged-in-logo-navlink' exact to='/'>
                    <div className="logged-in-logo">
                        <span>Red Riding Hood</span>
                    </div>
                </NavLink>
                <div className="searchbar-div">
                    <SearchBar />
                </div>
                <div>
                    <LogoutButton />
                </div>
            </div>
        </nav>
    )
}

export default NavBar

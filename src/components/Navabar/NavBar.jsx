import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/todo-logo.png";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from 'sweetalert2';


const NavBar = () => {
    const { user, logOut, setUser } = useContext(AuthContext);
    const navItems = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/task-management"}>Task Management</NavLink></li>
        <li><NavLink to={"/about"}>About</NavLink></li>
    </>

    const handleLogOut = () => {
        logOut()
        .then(() => {
            Swal.fire({
                title: "Good job!",
                text: "Logout successful!",
                icon: "success"
              });
              setUser(null);
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.message,
                footer: '<a href="#">Why do I have this issue?</a>'
              });
        }) 
    }

    return (
        <div className="navbar bg-base-100 container mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content font-medium mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost sm:text-xl text-base">
                    <img className="md:w-12 w-8" src={logo} alt="" />
                    <p>Todo Taker</p>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div>
                            <div className="dropdown py-2">
                                <div tabIndex={0} role="button" className="">
                                    <div className="avatar online cursor-pointer relative">
                                        <div className="md:w-12 md:h-12 w-8 h-8 rounded-full">
                                            <img className="object-cover" src={user?.photoURL ? user?.photoURL : "https://img.freepik.com/premium-vector/3d-simple-user-icon-isolated_169241-7120.jpg?size=626&ext=jpg&ga=GA1.1.781375590.1703222359&semt=ais"} />
                                        </div>
                                    </div>
                                </div>
                                <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-primary text-primary-content right-0">
                                    <div className="card-body">
                                        <h3 className="card-title text-white text-center mx-auto">{user?.displayName}</h3>
                                        <button onClick={handleLogOut} className="md:btn-sm mx-auto text-center btn btn-xs text-white md:text-white md:bg-cyan-500 bg-cyan-500 hover:text-black">
                                            Log Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> : <Link to={"/login"} className="btn">Login</Link>
                }
            </div>
        </div>
    );
};

export default NavBar;
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import {
  SiFramer,
  SiTailwindcss,
  SiReact,
  SiJavascript,
  SiCss3,
} from "react-icons/si";
import { AuthContext } from "../Provider/AuthProvider";
import App from "../App";


const SideNav = () => {
  const [selected, setSelected] = useState(0);
    const {user} = useContext(AuthContext);

  return (
    // NOTE: In prod, you'd likely set height to h-screen and fix to the viewport
    <nav className="h-[500px] w-fit  p-4 flex flex-col items-center gap-2">
      {/* Temp logo from https://logoipsum.com/ */}
        <img className="md:w-14 md:h-14 w-10 h-10 object-cover rounded-xl" src={user?.photoURL ? user?.photoURL : "https://img.freepik.com/premium-vector/3d-simple-user-icon-isolated_169241-7120.jpg?size=626&ext=jpg&ga=GA1.1.781375590.1703222359&semt=ais"} alt="" />
      <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
        <SiTailwindcss />
      </NavItem>
      <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
        <SiReact />
      </NavItem>
      <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
        <SiJavascript />
      </NavItem>
      <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
        <SiFramer />
      </NavItem>
      <NavItem selected={selected === 4} id={4} setSelected={setSelected}>
        <SiCss3 />
      </NavItem>
    </nav>
  );
};

const NavItem = ({ children, selected, id, setSelected }) => {
  return (
    <motion.button
      className="p-3 text-xl bg-slate-800 hover:bg-slate-700 rounded-md transition-colors relative"
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="block relative z-10">{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0 rounded-md bg-indigo-600 z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const TaskManagement = () => {
    return (
      <div className=" text-slate-100 flex container mx-auto">
        {/* <SideNav /> */}
        <div className="w-full">
          <div className="h-fit m-4 rounded border-2 border-dashed border-slate-600  md:text-2xl text-lg font-bold text-black text-center py-5">Manage Your Tasks</div>
          <div className="h-fit m-4 rounded border-2 border-dashed border-slate-600 relative">
            <App></App>
          </div>
        </div>
      </div>
    );
  };

export default TaskManagement;
'use client'
import "../../styles/admin/sidebar.css"
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import { usePathname } from "next/navigation";

type SideProps = {
    cls?: string
}



export default function SideBar({ cls }: SideProps){


    const pathname = usePathname();


    const menuItems = [
        { href: '/admin', icon: <IoHomeOutline className="icn" />, label: 'Dashboard' },
        { href: '/admin/categories', icon: <MdOutlineDesktopWindows className="icn" />, label: 'Categories' },
        { href: '/admin/wilayas', icon: <FiTruck className="icn" />, label: 'Wilayas' },
      ];


    return(
        <div className={"sidebar" + " " + cls}>
             <div className="titleDiv">
               <h1 className="title">Admin</h1>
               </div>
               <ul className="ul">
      {menuItems.map((item) => (
        <li key={item.href}>
          <a className={`tags ${(pathname.includes(item.href) && item.href != "/admin") ? 'active' : ''}`} href={item.href}>
            {item.icon}
            {item.label}
          </a>
        </li>
      ))}
    </ul>
        </div>
    )
}
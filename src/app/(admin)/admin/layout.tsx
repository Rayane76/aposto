import "bootstrap/dist/css/bootstrap.min.css";
import NavAdmin from "@/app/components/admin/NavAdmin";
import SideBar from "@/app/components/admin/SideBar";
import "../../styles/admin/layout.css"


export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body style={{backgroundColor:"#fff"}}>
        <div style={{display:"flex"}}>
        <NavAdmin />
        <SideBar cls="lytSide" />
      {children}
      </div>
          </body>
      </html>
    );
  }
import * as React from "react";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";


export default function Nav() {
  const [user, setuser] = React.useState("");
  const [fullname, setfullname] = React.useState("");
  const logoutconfirm = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      try {
        await axios.post("/api/logout", {
          withCredentials: true, // ส่ง Cookies ไปด้วย
        });

        axios.post("/api/removedevice", {username:localStorage.getItem("nameuser")}).then((res) => {
          if (res.status === 200) {
            window.location.href = "/auth/login";
            Swal.fire({
              title: "Logout success!",
              icon: "success",
            });
          }
        });
      } catch (err) {
        window.location.href = "/auth/login";
      }
    }
  };

  React.useEffect(() => {

    const validateToken = async () => {
      try {
        const response = await axios.get("/api/validate-token", {
          withCredentials: true,
        });
        if (response.data.valid) {
          // ถ้า Token ถูกต้อง อัพเดท User
          setfullname(response.data.user);
          setuser(response.data.user.split("")[0]);
        }
      } catch (error) {
        // ถ้า Token ไม่ถูกต้อง ให้ลบ Token ออกจาก Cookies
        console.log(error);
        axios.post("/api/removedevice", {username:localStorage.getItem("nameuser")}).then((res) => {
          if (res.status === 200) {
            window.location.href = "/auth/login";
          }
        });
        
      }
    };
    
    validateToken();
  }, []);


  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Image
          src="/logo/icon.png"
          className="w-[45px] h-[45px]"
          alt="logo"
          width={80}
          height={80}
        />
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Construction Calculator</a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <span className="text-3xl">{user}</span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow text-slate-950 bg-white"
          >
            {/* <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li> */}
            <li onClick={() => logoutconfirm()}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";
import * as React from "react";
import { Eye, EyeOff, Shield } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";

const NavyLoginPremium = () => {
  const [username, setusername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function getIPAddress() {
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP:", error);
    }
  }

  async function getAddress() {
    try {
      const ip = await getIPAddress();
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
      axios
        .post("/api/remember-device", { ipdevice: data.ip, username: username })
        .then((res) => {
          localStorage.setItem("nameuser", username);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "เข้าสู่ระบบสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.href = "/";
        });

      return data;
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username: username,
      password: password,
    };
    axios
      .post("/api/login", data)
      .then((res) => {
        if (res.status === 200) {
          getAddress();
        }
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ไม่พบข้อมูลผู้ใช้งาน!",
        });
      });
  };

  return (
    <div className="w-full h-full flex items-center justify-center ">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-100/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-800/5 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-xl relative">
        {/* Subtle Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 via-amber-200/20 to-amber-100/20 rounded-2xl p-1">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100/10 via-amber-200/10 to-amber-100/10 rounded-2xl blur-xl"></div>
        </div>

        {/* Content Container */}
        <div className="relative bg-slate-900/60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-amber-100/80 to-amber-200/80 rounded-full flex items-center justify-center mb-6 shadow-lg">
              {/* <Shield className="w-12 h-12 text-slate-900" /> */}
              <Image
                src="/logo/icon.png"
                className="w-[90px] h-[90px]"
                alt="logo"
                width={80}
                height={80}
              />
            </div>
            <h1 className="text-3xl font-bold text-amber-50 mb-2 text-center">
              ระบบเข้าสู่ระบบ
            </h1>
            <p className="text-amber-200/80 text-lg">Construction Calculator</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* {error && (
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-200">
                {error}
              </Alert>
            )} */}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-100/80">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-amber-100/10 rounded-lg focus:ring-2 focus:ring-amber-200/20 focus:border-amber-200/20 text-amber-50 placeholder-slate-400 backdrop-blur-sm transition-all"
                  placeholder="กรอกข้อมูลผู้ใช้"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-100/80">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-amber-100/10 rounded-lg focus:ring-2 focus:ring-amber-200/20 focus:border-amber-200/20 text-amber-50 placeholder-slate-400 backdrop-blur-sm transition-all"
                  placeholder="กรอกรหัสผ่าน"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-200/80 hover:text-amber-100 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {loading == true ? (
              <button
                type="button"
                className="w-full bg-gradient-to-r from-amber-100/80 to-amber-200/80 text-slate-900 py-3 px-4 rounded-lg shadow-lg font-medium"
              >
                กำลังเข้าสู่ระบบ...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-100/80 to-amber-200/80 text-slate-900 py-3 px-4 rounded-lg hover:from-amber-200/80 hover:to-amber-300/80 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg font-medium"
              >
                เข้าสู่ระบบ
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-4 left-4 text-amber-100/20 text-sm">
        Royal Thai Navy
      </div>
    </div>
  );
};

export default NavyLoginPremium;

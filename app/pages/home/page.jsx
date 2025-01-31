"use client";
// import Data from "../assets/data.json";
import * as React from "react";
import axios from "axios";
import Carousel from "../../../components/Carousel";
import Image from "next/image";
import { Box } from "@mui/material";
import Nav from "../../../components/layout/Nav";
import CardChart from "../../../components/CardChart";


export default function homePage() {
  const [data, setData] = React.useState([]);


  const fetchData = async () => {
    try {
      // setload(true);
      const res = await axios.get(
        "https://script.google.com/macros/s/AKfycbwdE_O8vwGvY6UlOxSKukBgoPOgPwrDs5zYWyiyxT8XKvzju9ui9paonXKxpK4Ve955/exec?action=gethubData&username=adminDB&password=Ad1234n"
      );
      setData(res.data);
    } catch (error) {
      // setload(false);
      console.log(error);
    } finally {
      // setload(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  

  return (
    <Box
      sx={{
        backgroundImage: `url("/head/h02.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "2",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          top: "0",
        }}
      >
        <Nav />
        <Box className="w-full flex justify-center">
        <CardChart actual={data.length}/>
        </Box>
        <Carousel data={data}/>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.8)",
          position: "absolute",
          zIndex: "1",
        }}
      ></Box>

      {/* {showMD ? <Detail id={valId} closeModal={closeModal} /> : <div></div>}

      <div className="p-3" style={{backgroundColor: "#ffd3b7"}}>
        <div className="head-text">
          <div className="group-text">
            <p className="text-head">Construction</p>
            <p className="text-head">Calculator</p>
          </div>
          <div className="section-icon">
            <img src={Icon} alt="icon"></img>
          </div>
        </div>
        <div className="content-card-top">
          <div className="cardTop">
            <div className="cardTop-body">
              <div className="cardTop-title">
                <p className="text-2xl">ลักษณะอาคารทั้งหมด</p>
                <div className="text-3xl flex icon-value">
                  <img src={iconcard || Building} alt="icon"></img>
                  <p className="text-3xl">
                    {Data.length}/<sub>25</sub>
                  </p>
                </div>
              </div>

              <div className="chart-top">
                <PieChart
                  series={[{ data, innerRadius: 150 }]}
                  {...size}
                  slotProps={{
                    legend: { hidden: true },
                  }}
                >
                  <PieCenterLabel>{numCount}/25</PieCenterLabel>
                </PieChart>
              </div>
            </div>
          </div>
        </div>

        <div className="content-slide">
          <div className="slid-group">
            <div
              className={"card-slide" + selBu}
              onClick={() => select_slide("bu")}
            >
              <div className="card-slide-head">
                <img
                  className="icon-card-slide"
                  src={Building}
                  alt={Building}
                ></img>
              </div>
              <div className="card-slide-body">
                <p>อาคาร</p>
              </div>
            </div>

            <div
              className={"card-slide" + selhome}
              onClick={() => select_slide("home")}
            >
              <div className="card-slide-head">
                <img className="icon-card-slide" src={home} alt={home}></img>
              </div>
              <div className="card-slide-body">
                <p>บ้าน</p>
              </div>
            </div>

            <div
              className={"card-slide" + selroung}
              onClick={() => select_slide("roung")}
            >
              <div className="card-slide-head">
                <img className="icon-card-slide" src={roung} alt={roung}></img>
              </div>
              <div className="card-slide-body">
                <p>โรง</p>
              </div>
            </div>

            <div
              className={"card-slide" + selgrab}
              onClick={() => select_slide("grab")}
            >
              <div className="card-slide-head">
                <img className="icon-card-slide" src={grab} alt={grab}></img>
              </div>
              <div className="card-slide-body">
                <p>กราบ</p>
              </div>
            </div>

            <div
              className={"card-slide" + selother}
              onClick={() => select_slide("other")}
            >
              <div className="card-slide-head">
                <img className="icon-card-slide" src={other} alt={other}></img>
              </div>
              <div className="card-slide-body">
                <p>อื่นๆ</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group-search">
          <p className="text-list">รายการทั้งหมด</p>
          <label className="input input-bordered flex items-center gap-2 sm:w-[135px] md:w-[200px] mx-1">
            <input
              type="text"
              className="grow"
              placeholder="ค้นหา"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        <div className="pb-3">
          <div className="h-52 overflow-auto gap-3 flex flex-row flex-wrap justify-center xl:h-full md:h-full p-3">
            {Data.filter(
              (item) => item.name.includes(search) && item.group == typeSel
            ).map((item, index) => {
              var iconname;
              switch (item.group) {
                case "อาคาร":
                  iconname = Building;
                  break;
                case "โรง":
                  iconname = roung;
                  break;
                case "กราบ":
                  iconname = grab;
                  break;
                case "บ้าน":
                  iconname = home;
                  break;
                case "อื่นๆ":
                  iconname = other;
                  break;
              }

              return (
                <div
                  className="group-list hover:cursor-pointer"
                  key={index}
                  onClick={() => callDetail(item.id)}
                >
                  <img className="icon-list" src={iconname} alt="icon"></img>

                  <p className="w-40">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </Box>
  );
}

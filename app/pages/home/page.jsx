"use client";
import grab from "../../../public/icon/grab.png"; // Fixed path
import home from "../../../public/icon/home-.png";
import other from "../../../public/icon/other-100.png";
import Building from "../../../public/icon/building.png";
import roung from "../../../public/icon/roung-.png";
// import Data from "../assets/data.json";
import * as React from "react";
import Icon from "../../../public/icon/krom.png";
import Detail from "../../../components/Detail";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import Carousel from "../../../components/Carousel";
import Image from "next/image";
import { Box } from "@mui/material";
import Nav from "../../../components/layout/Nav";
import DrawerList from "../../../components/Drower";

export default function homePage() {
  const [search, setSearch] = React.useState("");
  const [showMD, setshowMD] = React.useState(false);
  const [valId, setValid] = React.useState("");
  const [selBu, setselBu] = React.useState(" card-active");
  const [selhome, setselhome] = React.useState("");
  const [selother, setselother] = React.useState("");
  const [selroung, setselroung] = React.useState("");
  const [selgrab, setselgrab] = React.useState("");
  const [Data, setData] = React.useState([]);
  const [typeSel, setTypeSel] = React.useState("อาคาร");
  const [count, setCount] = React.useState([]);
  const [iconcard, seticoncard] = React.useState();
  const [numCount, setnumCount] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [nameHead, setNameHead] = React.useState("");

  const fetchData = async () => {
    try {
      // setload(true);
      const res = await axios.get(
        "https://script.google.com/macros/s/AKfycbwdE_O8vwGvY6UlOxSKukBgoPOgPwrDs5zYWyiyxT8XKvzju9ui9paonXKxpK4Ve955/exec?action=gethubData&username=adminDB&password=Ad1234n"
      );
      setData(res.data);
      countType(res.data);
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

  function callDetail(id) {
    // navigate("/modal", { replace: true })
    setValid(id);
    setshowMD(true);
    // document.getElementById("my_modal_3").showModal();
  }

  function closeModal() {
    setshowMD(false);
  }

  function select_slide(sel) {
    switch (sel) {
      case "bu":
        setselBu(" card-active");
        setselhome("");
        setselgrab("");
        setselother("");
        setselroung("");
        setTypeSel("อาคาร");
        seticoncard(Building);
        setnumCount(count[2]);
        break;
      case "home":
        setselhome(" card-active");
        setselBu("");
        setselgrab("");
        setselother("");
        setselroung("");
        setTypeSel("บ้าน");
        seticoncard(home);
        setnumCount(count[0]);
        break;
      case "grab":
        setselgrab(" card-active");
        setselBu("");
        setselhome("");
        setselother("");
        setselroung("");
        setTypeSel("กราบ");
        seticoncard(grab);
        setnumCount(count[1]);
        break;
      case "other":
        setselother(" card-active");
        setselBu("");
        setselhome("");
        setselroung("");
        setselgrab("");
        setTypeSel("อื่นๆ");
        seticoncard(other);
        setnumCount(count[4]);
        break;
      case "roung":
        setselroung(" card-active");
        setselBu("");
        setselhome("");
        setselgrab("");
        setselother("");
        setTypeSel("โรง");
        seticoncard(roung);
        setnumCount(count[3]);
        break;
    }
  }

  const data = [
    { value: numCount, label: "Actual", color: "#FF6500" },
    { value: 25 - numCount, label: "Remain", color: "#ff65004a" },
  ];

  const size = {
    width: 600,
    height: 400,
  };

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 52,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  function countType(arr) {
    let num_home = arr.filter((item) => item.group == "บ้าน");
    let num_grab = arr.filter((item) => item.group == "กราบ");
    let num_build = arr.filter((item) => item.group == "อาคาร");
    let num_roung = arr.filter((item) => item.group == "โรง");
    let num_other = arr.filter((item) => item.group == "อื่นๆ");
    setnumCount(num_build.length);
    setCount([
      num_home.length,
      num_grab.length,
      num_build.length,
      num_roung.length,
      num_other.length,
    ]);
  }

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
        <Carousel setShow={setShow} setNameHead={setNameHead} />
        {show == "100%" ? (
          <Accordition show={show} nameHead={nameHead} />
        ) : (
          <div></div>
        )}
        {
        show &&
        <DrawerList setShow={setShow}/>
        }
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

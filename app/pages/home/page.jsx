"use client";
import * as React from "react";
import axios from "axios";
import Carousel from "../../../components/Carousel";
import { Box } from "@mui/material";
import Nav from "../../../components/layout/Nav";
import CardChart from "../../../components/CardChart";


export default function Homepage() {
  const [data, setData] = React.useState([]);


  const fetchData = async () => {
    try {
      // setload(true);
      const res = await axios.get(
        process.env.NEXT_PUBLIC_SERVERHOST + "&action=gethubData"
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
    if (typeof window !== 'undefined') {
        // ใช้งาน module
        fetchData();
    }
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
          height: "100vh",
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
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.8)",
          position: "absolute",
          zIndex: "1",
        }}
      ></Box>
    </Box>
  );
}

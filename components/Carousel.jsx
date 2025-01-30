"use client";
import * as React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import CardMenu from "./Card";
import Input from "@mui/joy/Input";

import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';


const BlogCarousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [state, setState] = React.useState(false);
  const [selectGroup, setSelectGroup] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [max, setMax] = React.useState(25);
  const [layout, setLayout] = React.useState(undefined);
  const [header, setHeader] = React.useState("รายการ");
  
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const blogPosts = [
    {
      id: 1,
      title: "อาคารพัก",
      category: "อาคาร",
      description: "รวมข้อมูลแบบอาคารพักประทวน นายทหาร สัญญาบัตร แพทย์ บก.",
      image:
        "https://lh3.googleusercontent.com/d/1G2qgl997SkLFPJN5b6KCKhDfjpEVvQp7",
    },
    {
      id: 2,
      title: "บ้านพักเดี่ยว และ แฝด",
      category: "บ้าน",
      description: "รวมข้อมูลแบบบ้านพักเดี่ยว และ แฝด",
      image:
        "https://lh3.googleusercontent.com/d/14NnhPVBT_1vubPlcDje5RCiKXutk6RSh",
    },
    {
      id: 3,
      title: "โรงเลี้ยง โรงเก็บ โรงพละ โรงจอดรถ",
      category: "โรง",
      description: "รวมข้อมูลแบบ โรงเลี้ยง โรงเก็บ โรงพละ โรงจอดรถ",
      image: "/head/h20.jpeg",
    },
    {
      id: 4,
      title: "กราบ บก. กราบพักทหาร",
      category: "กราบ",
      description: "รวมข้อมูลแบบกราบ บก. กราบพักทหาร",
      image: "/head/h25.jpeg",
    },
    {
      id: 5,
      title: "Other",
      category: "อื่นๆ",
      description: "Other",
      image: "/head/h22.jpeg",
    },
  ];

  const itemsPerPage =
    window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const visiblePosts = blogPosts.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              role="article"
              onClick={() => {
                setState(true), setSelectGroup(post.category);
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.description}
                </p>
                <span className="relative bottom-0 mb-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {`${data.filter(item => item.group == post.category).length} / ${max}`}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-3 rounded-full shadow-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-transform duration-200 hover:scale-110"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-3 rounded-full shadow-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-transform duration-200 hover:scale-110"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>

        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentIndex === index ? "bg-blue-600 w-4" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <Drawer
        key={"bottom"}
        anchor={"bottom"}
        open={state}
        onClose={() => {
          setState(false);
        }}
      >
        <Box className="p-8">
          <Input size="lg" placeholder="ค้นหารายการ..." 
          onChange={handleSearch} value={search}
          />
        </Box>
        <Box className="p-[8px] justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto h-[100%]">
          {data
            .filter((item) => item.group.includes(selectGroup) && item.name.includes(search))
            .map((item, index) => {
              return (
                <CardMenu key={index} title={item.name} group={selectGroup} setLayout={setLayout} setHeader={setHeader}/>
              );
            })}
        </Box>
      </Drawer>

      <Modal open={!!layout} onClose={() => setLayout(undefined)}>
        <ModalDialog layout={layout}>
          <ModalClose />
          <DialogTitle>{header}</DialogTitle>
          <DialogContent>
            <div>
              This is a <code>{layout}</code> modal dialog. Press <code>esc</code> to
              close it.
            </div>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default BlogCarousel;

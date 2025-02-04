// import data from "../assets/data.json";
import * as React from "react";
import Image from "next/image";
import "../app/style/style.css";

export default function Detailpage({data,select}) {
  const [resData, setresData] = React.useState([]);
  const [imgArr, setimgArr] = React.useState([]);


React.useEffect(() => {
    // console.log(data.filter((item) => item.name === select));
    setresData(
    data.filter((item) => item.name === select)[0]
   )
   setimgArr(
    data.filter((item) => item.name === select)[0].image
   )
  }, []);

  return (
    <>
      {
        resData == "" ? <div></div> :
        <div className="contents-detail">
          <div className="icon-head">
            <Image
              className="img-icon"
              src="/logo/android-chrome-512x512.png"
              alt="logo"
              width={100}
              height={100}
            />
          </div>

          <div className="img-header">
            {resData.head != "" ? (
              <a href={resData.head} target="_blank">
                <img
                className="imgdetail"
                src={resData.head}
                alt={resData.id}
              ></img>
              </a>
            ) : (
              <div></div>
            )}
          </div>

          <div className="detail-content">
            <table className="table">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="tdtable">อาคาร :</td>
                  <td>{resData.name}</td>
                </tr>
                <tr>
                  <td className="tdtable">ลักษณะอาคาร :</td>
                  <td className="textheight">{resData.detail}</td>
                </tr>
                <tr>
                  <td className="tdtable">พื้นที่มีผนังล้อม :</td>
                  <td>{resData.area_1}</td>
                </tr>
                <tr>
                  <td className="tdtable">พื้นที่ไม่มีผนังล้อม :</td>
                  <td>{resData.area_2}</td>
                </tr>
                <tr>
                  <td className="tdtable">พื้นที่รวมของอาคาร :</td>
                  <td>{resData.area_3}</td>
                </tr>
                <tr>
                  <td className="tdtable">พื้นที่ใช้คำนวณราคา :</td>
                  <td>{resData.area_4}</td>
                </tr>
                <tr>
                  <td className="tdtable">ราคาอาคาร :</td>
                  <td>{resData.price}</td>
                </tr>
                <tr>
                  <td className="tdtable">ราคาต่อ ตร.ม. :</td>
                  <td>{resData.price_2}</td>
                </tr>
                <tr>
                  <td className="tdtable">แบบหมายเลข :</td>
                  <td>{resData.modal_num}</td>
                </tr>
                <tr>
                  <td className="tdtable">สาธารณูปโภค :</td>
                  <td>{resData.utilities}</td>
                </tr>
                <tr>
                  <td className="tdtable">ราคาครุภัณฑ์ :</td>
                  <td>{resData.price_othe}</td>
                </tr>
                <tr>
                  <td className="tdtable">ราคาต่อ UNIT :</td>
                  <td>{resData.price_unit}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="file-viewer">
            {resData.url_pdf != "" ||
            resData.url_xlsx != "" ||
            resData.url_docx != "" ? (
              <p className="textFile">เอกสารประกอบ</p>
            ) : (
              <p></p>
            )}
            <div className="groupFile">
              {resData.url_pdf != "" ? (
                <a 
                onClick={() => window.open(resData.url_pdf, "_blank")}
                key={resData.url_pdf}
                >
                  <Image
                  className="iconfile hover:cursor-pointer"
                  src="/icon/pdf.png"
                  alt={resData.url_pdf}
                  width={80}
                  height={80}
                />
                </a>
              ) : (
                <p></p>
              )}

              {resData.url_xlsx != "" ? (
                <a
                 onClick={() => window.open(resData.url_xlsx, "_blank")}
                  key={resData.url_xlsx}
                >
                  <Image
                  className="iconfile hover:cursor-pointer"
                  src="/icon/excel.png"
                  alt={resData.url_xlsx}
                  width={80}
                  height={80}
                />
                </a>
              ) : (
                <p></p>
              )}

              {resData.url_docx != "" ? (
                <a
                  onClick={() => window.open(resData.url_docx, "_blank")}
                  key={resData.url_docx}
                >
                  <Image
                  className="iconfile hover:cursor-pointer"
                  src="/icon/word.png"
                  alt={resData.url_docx}
                  width={80}
                  height={80}
                />
                </a>
              ) : (
                <p></p>
              )}
            </div>
          </div>

          <div className="modal-viewer">
            {imgArr.map((item, index) => {
              return (
                <a href={item.toString()} target="_blank" key={index}>
                  <img className="imgdetail" src={item} alt={"รูปภาพเสียหาย"}></img>
                </a>
              );
            })}
          </div>
        </div>
      }
    </>
  );
}

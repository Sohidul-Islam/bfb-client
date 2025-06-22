import React, { useRef, useState } from "react";
import Header from "../Header/Header";
import VerifiedCard from "../VerifiedCard/VerifiedCard";
import db from "../../utilities/db.control";

const VerificationForm = () => {
  const [verifiedData, setVerifiedData] = useState([]);
  const { getCertificate } = db;
  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getId = useRef("");
  const VerificationData = [
    {
      Certificate_Id: "BFB2303001",
      Ref_No: "BD-02-03-23-BFB 3169-18-01",
      firstName: "Owahidul Hoque",
      lastName: "Chowdhury",
      date_of_issue: "02/03/2023",
      Certificate_No: "01",
      Duration_of_Experience: "4 years",
      List_of_Combine_Certificate_Name:
        "1. Certificate of appreciation District Administration Chattogram",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
  ];

  const OnBlurverifiedHandler = (e) => {
    const certificateIdRegex = /^BFB\d{2}(0[1-9]|1[0-2])\d+$/;
    if (certificateIdRegex.test(e.target.value)) {
      setMessage(`${e.target.value} is valid`);
      setOpen(true);
      // setValid(false)
      setValid(true);

      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } else {
      setMessage(
        `Invalid ID! Please follow it - BFB230301 (BFB<yy><mm><anydigit>)`
      );
      setOpen(true);
      setValid(false);
      setVerifiedData([]);
      setIsOpen(false);
    }
  };

  const verifiedHandler = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsLoading(true);
      getCertificate(getId.current.value).then((data) => {
        if (data != null) {
          setVerifiedData(data);
          setIsOpen(true);
        } else {
          setVerifiedData([]);
          setIsOpen(true);
        }
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center my-4">
        <div className={`w-[80vw] h-[300px] p-4 shadow-md`}>
          <form onSubmit={verifiedHandler}>
            <div className="text-stone-800">
              <label
                htmlFor="#certificate_id"
                className="text-[26px] font-bold"
              >
                Certificate ID
              </label>
              {open === true && (
                <p className={`${isValid ? "text-green-500" : "text-red-500"}`}>
                  {message}
                </p>
              )}
            </div>
            <div className="border-2 placeholder-shown:border-gray-500 focus:border-gray-500 rounded-md">
              <input
                onChange={OnBlurverifiedHandler}
                id="certificate_id"
                ref={getId}
                type={"text"}
                className="p-4  w-full rounded-md focus:outline-none"
                placeholder="Enter your Certificate ID..."
                required
              />
            </div>
            <br></br>
            <button
              className="hover:text-[#334154] disabled:opacity-50 hover:border hover:border-[#334154]  hover:bg-white border-spacing-1 duration-500 shadow-md bg-[#334154] px-4 py-2 focus: text-white rounded-md my-2"
              type={"submit"}
              disabled={isLoading}
            >
              {!isLoading ? "Verify" : "Verifing..."}
            </button>
          </form>
        </div>
        {isValid && (
          <div className="w-full md:w-[800px] relative overflow-x-auto sm:rounded-lg">
            {isOpen && (
              <VerifiedCard data={verifiedData}
                isLoading={isLoading}
                inputId={getId.current.value} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default VerificationForm;

import { Alert, Collapse, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PreLoader from "../PreLoader/PreLoader";
import CloseIcon from "@mui/icons-material/Close";
const VerifiedCard = ({ data, inputId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
      setOpen(true);
    }, 2000);
  }, [data]);

  const VerificationData = [
    {
      Certificate_id: "BFB2303001",
      Ref_No: "BD-02-03-23-BFB 3169-18-01",
      firstName: "Owahidul Hoque",
      lastName: "Chowdhury",
      date_of_issue: "02/03/2023",
      Certificate_No: "01",
      Duration_of_Experience: "4 years",
      List_of_Combine_Certificate_Name:
        "1. Certificate of appreciation District Administration Chattogram",
      description: "",
    },
  ];

  const TableContainer = styled.table`
    border-collapse: separate;
    border-spacing: 10px 10px;
    width: 100%;
    & td {
      width: 50%;
      // border: 1px solid #ddd;
      padding: 8px;
      // border-radius:0px 20px 20px 0px;
      box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    & th {
      // width:50%;
      // border: 1px solid #ddd;
      padding: 8px;
      // border-radius:20px 0px 0px 20px;
      box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    & tr:nth-child(even) {
      background-color: #f2f2f2;
      transition: all 0.5s ease-in-out;
    }
    & tr:hover {
      background-color: #ddd;
    }
    & th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #334154;
      padding: 16px;
      color: white;
      text-align: center;
      text-transform: capitalize;
      transition: all 0.5s ease-in-out;
    }
  `;
  return (
    <div className="my-10">
      <div
        id=""
        className="w-full shadow-md shadow-inner flex flex-col justify-center p-4"
      >
        {isOpen ? (
          <PreLoader size={100} />
        ) : (
          <div>
            <Collapse in={open}>
              <Alert
                severity={`${
                  Object.keys(data).length > 0 ? "success" : "error"
                }`}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {Object.keys(data).length > 0
                  ? `Congratulations! ${inputId} verified successfully`
                  : `${inputId} is Not Verified`}
              </Alert>
            </Collapse>
            {Object.keys(data).length > 0 ? (
              <div className="text-box">
                {
                  Object.keys(data).map((key, index) => (
                    <TableContainer key={index} id="customers">
                      <tbody>
                        {key !== "_id" && (
                          <tr>
                            <th>
                              <strong>
                                {key.replaceAll("_", " ").toUpperCase()}
                              </strong>
                            </th>
                            <td>{data[key]}</td>
                          </tr>
                        )}
                      </tbody>
                    </TableContainer>
                  ))
                  //     data.map((item, index) =>
                  // <TableContainer key={index} id="customers">
                  //     <tbody>

                  //         <tr>
                  //             <th><strong>Certificate Id</strong></th>
                  //             <td>{item.certificate_id}</td>
                  //         </tr>
                  //         <tr>
                  //             <th><strong>Ref No</strong></th>
                  //             <td>{item.ref_no}</td>
                  //         </tr>
                  //         <tr>
                  //             <th><strong>Date of issue</strong></th>
                  //             <td>{item.date_of_issue}</td>
                  //         </tr>
                  //         <tr>
                  //             <th><strong>Name</strong></th>
                  //             <td>{item.firstName + " " + item.lastName}</td>
                  //         </tr>
                  //         <tr>
                  //             <th><strong>Duration of Experience</strong></th>
                  //             <td>{item.duration_of_experience}</td>
                  //         </tr>
                  //         <tr>
                  //             <th><strong>List of Combine Certificate Name</strong></th>
                  //             <td>{item.list_of_combine_certificate_name}</td>
                  //         </tr>
                  //         <tr>
                  //             <th><strong>description</strong></th>
                  //             <td>{item.description ? item.description : "no description"}</td>
                  //         </tr>
                  //     </tbody>
                  // </TableContainer>
                  // )
                }
              </div>
            ) : (
              <div className="my-2">
                <h3 className="text-center font-bold">
                  Please Input Your Certificate ID properly !
                </h3>
                <h3 className="text-center">
                  Thank you for your interest in Better Future Bangladesh. For
                  any further guidance on the required procedures, we encourage
                  you to reach out to our IT Department. Our dedicated
                  professionals are committed to providing prompt and effective
                  support, and we look forward to hearing from you.
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifiedCard;

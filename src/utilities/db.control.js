import axios from "axios";

// get

const getAUser = async (email) => {
  try {
    let url = "https://certificate-verification-server.vercel.app";
    url += "/users?email=" + email;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
const getAllAdmin = async () => {
  try {
    let url = "https://certificate-verification-server.vercel.app";
    url += "/admin/all";
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
const getCertificate = async (id) => {
  try {
    let url = "https://certificate-verification-server.vercel.app";
    url += "/certificates?id=" + id;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
const getPayment = async () => {
  try {
    let url = "https://certificate-verification-server.vercel.app";
    url += "/payment";
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
const getAllCertificates = async () => {
  try {
    let url = "https://certificate-verification-server.vercel.app";
    url += "/certificates/all";
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
const getCertificatesById = async (id) => {
  try {
    let url = "https://certificate-verification-server.vercel.app";
    url += "/certificates?id=" + id;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

// post
const makePayment = async (payment) => {
  try {
    let url = "https://certificate-verification-server.vercel.app";
    url += "/payment";
    payment["isVerified"] = "on-process";
    const response = await axios.post(url, payment);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

// put
const getPaymentById = async (paymentId, data) => {
  try {
    // console.log(data);
    const url = `https://certificate-verification-server.vercel.app/payment/${paymentId}`;
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const UpdateCertificatesById = async (certificates_id, data) => {
  try {
    // console.log(data);
    const certificate = {
      certificate_id: data.certificate_id,
      ref_no: data.ref_no,
      firstname: data.first_name,
      lastname: data.last_name,
      date_of_issue: data.date_of_issue,
      duration_of_experience: data.duration_of_experience,
      list_of_combine_certificate_name:
        data.list_of_combine_certificate_name === undefined
          ? ""
          : data.list_of_combine_certificate_name,
      description: data.description === undefined ? "" : data.description,
    };
    const url = `https://certificate-verification-server.vercel.app/certificates/${certificates_id}`;
    const response = await axios.put(url, certificate);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const UpdateUserById = async (user_id, data) => {
  try {
    // console.log(data);
    const userInfo = {
      displayName: data.displayName,
      email: data.email,
      role: data.role,
    };
    const url = `https://certificate-verification-server.vercel.app/user/update/${user_id}`;
    const response = await axios.put(url, userInfo);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
// delete
const deleteACertificates = async (id) => {
  try {
    // console.log(data);
    const url = `https://certificate-verification-server.vercel.app/certificates/${id}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const deleteAadmin = async (id) => {
  try {
    // console.log(data);
    const url = `https://certificate-verification-server.vercel.app/admin/delete/${id}`;
    const response = await axios.put(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const deleteAPayment = async (id) => {
  try {
    // console.log(data);
    const url = `https://certificate-verification-server.vercel.app/payment/${id}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const run = {
  getAUser,
  getAllAdmin,
  getCertificate,
  makePayment,
  getPayment,
  getPaymentById,
  getAllCertificates,
  deleteACertificates,
  deleteAPayment,
  deleteAadmin,
  UpdateCertificatesById,
  getCertificatesById,
  UpdateUserById,
};

export default run;

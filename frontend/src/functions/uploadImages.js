import axios from "axios";

//application/x-www-form-urlencoded is the most used
//multipart/form-data is used for transfering images and large quantity of data
// resource => https://golangbyexample.com/multipart-form-data-content-type-golang/
export const uploadImages = async (formData, path, token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/uploadImages`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

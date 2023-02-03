import client from "./client";

const getReq = (lat, lon) => client.get(`/req/pending/${lat}/${lon}`);

const myRequests = (id) => client.get(`/user/requests/${id}`);
const setReq = (id, donorId) => client.put(`/user/accepted/${id}`, { donorId });
const getAcceptedReq = (donorId) => client.get(`/user/acceptedList/${donorId}`);
const getDonorDetail = (id) => client.get(`/user/donorDetail/${id}`);
const addReq = (info, onUploadProgress) => {
  return client.post("/req", info, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  getReq,
  addReq,
  myRequests,
  setReq,
  getAcceptedReq,
  getDonorDetail,
};

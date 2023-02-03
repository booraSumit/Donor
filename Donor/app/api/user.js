import client from "./client";

const register = (userInfo) => client.post("/register", userInfo);
const deleteUser = (userId) => client.delete(`/user/delete/${userId}`);

export default { register, deleteUser };

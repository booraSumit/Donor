const client = require("./client");

const endpoint = "/test";

const test = () => client.get(endpoint);

export default {
  test,
};

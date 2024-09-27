import axios from "axios";

const get = async(url) => {
    const result = await axios.get(url);
    return result;
};

export const http = {
  get
};


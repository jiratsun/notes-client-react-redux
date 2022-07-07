import axios from "axios";

export default axios.create({
    baseURL: "https://notes-server-guest.as.r.appspot.com/",
});

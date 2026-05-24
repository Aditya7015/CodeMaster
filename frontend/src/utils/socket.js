// utils/socket.js
import { io } from "socket.io-client";

const socket = io("https://codemaster-backend-1m59.onrender.com/", {
  withCredentials: true
});
export default socket;
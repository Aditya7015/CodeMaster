// utils/socket.js
import { io } from "socket.io-client";

const socket = io("https://codemaster-sfk0.onrender.com", {
  withCredentials: true
});
export default socket;
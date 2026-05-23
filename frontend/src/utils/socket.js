// utils/socket.js
import { io } from "socket.io-client";

const socket = io("https://codmaster-backend.onrender.com", {
  withCredentials: true
});
export default socket;
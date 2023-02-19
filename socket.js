import { io } from "socket.io-client";
const socket = io.connect("https://tripapp-backend.up.railway.app/");

export default socket;

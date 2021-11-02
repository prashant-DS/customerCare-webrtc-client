import { ActionTypes } from "./types";

const socketCreated = (payload) => ({
  type: ActionTypes.SOCKET_CREATED,
  payload,
});

const socketConnected = () => ({
  type: ActionTypes.SOCKET_CONNECTED,
});

const socketDisconnected = () => ({
  type: ActionTypes.SOCKET_DISCONNECTED,
});

const roomConnected = () => ({
  type: ActionTypes.ROOM_CONNECTED,
});

const roomDisconnected = () => ({
  type: ActionTypes.ROOM_DISCONNECTED,
});

export {
  socketCreated,
  socketConnected,
  socketDisconnected,
  roomConnected,
  roomDisconnected,
};

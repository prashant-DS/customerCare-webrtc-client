import {
  roomConnected,
  roomDisconnected,
  socketConnected,
  socketDisconnected,
} from "../../utils/socketManager/ducks/action";

const onSocketConnect = (events, dispatch) => {
  dispatch(socketConnected());
  console.log("socket connected");
};

const onSocketConnectError = (events, dispatch) => {
  console.log("connect error:", events[0].message);
};

const onSocketDisconnect = (events, dispatch) => {
  dispatch(socketDisconnected());
  console.log(`socket disconnected: due to ${events[0]}`);
};

const onMessageReceived = (events, dispatch) => {
  console.log("message received -", events[0]);
};

const onRoomEstablished = (events, dispatch) => {
  const { room, customerId } = events[0];
  dispatch(roomConnected());
  console.log(
    `Room established with customer: ${customerId} in the room: ${room}`
  );
};

const onRoomDestroyed = (events, dispatch) => {
  const { room, customerId } = events[0];
  dispatch(roomDisconnected());
  console.log(`Room ${room} destroyed with customer: ${customerId}`);
};

export const socketEventsSubscriber = {
  connect: onSocketConnect,
  connect_error: onSocketConnectError,
  disconnect: onSocketDisconnect,
  message: onMessageReceived,
  room_established: onRoomEstablished,
  room_destroy: onRoomDestroyed,
};

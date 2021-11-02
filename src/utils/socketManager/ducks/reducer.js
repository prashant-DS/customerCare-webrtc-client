const { ActionTypes } = require("./types");

const INITIAL_STATE = {
  socket: null,
  socketConnected: false,
  roomConnected: false,
};

function socketManagerReducer(state = INITIAL_STATE, { type, payload }) {
  let oldState = { ...state };
  switch (type) {
    case ActionTypes.SOCKET_CREATED:
      oldState.socket = payload.socket;
      return oldState;

    case ActionTypes.SOCKET_CONNECTED:
      oldState.socketConnected = true;
      return oldState;
    case ActionTypes.SOCKET_DISCONNECTED:
      oldState.socketConnected = false;
      return oldState;
    case ActionTypes.ROOM_CONNECTED:
      oldState.roomConnected = true;
      return oldState;
    case ActionTypes.ROOM_DISCONNECTED:
      oldState.roomConnected = false;
      return oldState;
    default:
      return oldState;
  }
}

export default socketManagerReducer;

import io from "socket.io-client";

function socketManager(memberType, id, socketEventsSubscriber) {
  const socket = io("https://ancient-taiga-83272.herokuapp.com/", {
    reconnection: false,
    autoConnect: false,
    query: {
      memberType: memberType,
      memberId: id,
    },
  });

  socketEventsSubscriber(socket);

  return socket;
}

export default socketManager;

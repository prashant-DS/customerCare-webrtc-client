export const addDispatchInSocketEventsSubscriber =
  (socketEvents, dispatch) => (socket) => {
    Object.keys(socketEvents).forEach((key) =>
      socket.on(key, (...eventArgs) => socketEvents[key](eventArgs, dispatch))
    );
  };

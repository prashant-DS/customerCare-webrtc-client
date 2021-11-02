import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import socketManager from "../../utils/socketManager/index.js";
import { socketEventsSubscriber } from "./socketEvents.js";
import { addDispatchInSocketEventsSubscriber } from "../../utils/index.js";
import { socketCreated } from "../../utils/socketManager/ducks/action.js";
import useWebRtc from "../../custoomHooks/useWebRtc.js";
import { userMediaConstraints } from "../../constants/index.js";

function Customer() {
  const dispatch = useDispatch();
  const { customerId } = useParams();
  const socket = useSelector((state) => state.socketManager.socket);

  useWebRtc(socket, "selfStream", userMediaConstraints, true);

  useEffect(() => {
    if (!socket) {
      const skt = socketManager(
        "customer",
        customerId,
        addDispatchInSocketEventsSubscriber(socketEventsSubscriber, dispatch)
      );
      dispatch(socketCreated({ socket: skt }));
    }
  }, [customerId, dispatch, socket]);

  return (
    <div>
      <h1>Your ID is {customerId}</h1>
      <button onClick={() => socket.connect()} disabled={!socket}>
        <h3>Start</h3>
      </button>
      <video id="selfStream" autoPlay playsInline controls={true}></video>
    </div>
  );
}

export default Customer;

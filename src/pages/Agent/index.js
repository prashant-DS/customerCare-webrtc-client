import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userMediaConstraintsForAgent } from "../../constants/index.js";
import useWebRtc from "../../custoomHooks/useWebRtc.js";
import { addDispatchInSocketEventsSubscriber } from "../../utils/index.js";
import { socketCreated } from "../../utils/socketManager/ducks/action.js";
import socketManager from "../../utils/socketManager/index.js";
import { socketEventsSubscriber } from "./socketEvents.js";

function Agent() {
  const dispatch = useDispatch();
  const { agentId } = useParams();
  const socket = useSelector((state) => state.socketManager.socket);
  const socketConnected = useSelector(
    (state) => state.socketManager.socketConnected
  );
  const roomConnected = useSelector(
    (state) => state.socketManager.roomConnected
  );
  useWebRtc(socket, "customerStream", userMediaConstraintsForAgent, false);

  useEffect(() => {
    if (!socket) {
      const skt = socketManager(
        "agent",
        agentId,
        addDispatchInSocketEventsSubscriber(socketEventsSubscriber, dispatch)
      );
      dispatch(socketCreated({ socket: skt }));
    }
  }, [agentId, dispatch, socket]);

  const onCallCompleteClick = () => {
    console.log("Sending Call Complete event");
    socket.emit("call_complete");
  };

  return (
    <div>
      <h1>Your ID is {agentId}</h1>
      <button
        onClick={() => socket.connect()}
        disabled={!socket || socketConnected}
      >
        <h3>Start</h3>
      </button>
      <button
        onClick={() => socket.disconnect()}
        disabled={!socket || !socketConnected || roomConnected}
      >
        <h3>Stop</h3>
      </button>
      <br />
      <button
        onClick={onCallCompleteClick}
        disabled={!socket || !socketConnected || !roomConnected}
      >
        <h3>Call Complete</h3>
      </button>
      <br />
      <video
        id="customerStream"
        autoPlay
        playsInline
        controls={false}
      ></video>
    </div>
  );
}

export default Agent;

import { useEffect, useState } from "react";
import { rtcConfiguration } from "../constants";
import { initiateSelfStream } from "../utils/mediaDevices";

function useWebRtc(socket, videoElementId, mediaConstraints, playSelfStream) {
  const [peerConnection, setPeerConnection] = useState(
    new RTCPeerConnection(rtcConfiguration)
  );
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const [localStream, setLocalStream] = useState(null);
  const [iceCandidates, setIceCandidates] = useState([]);
  const [sendIceCandidate, setSendIceCandidate] = useState(false);

  useEffect(() => {
    if (peerConnection && socket) {
      peerConnection.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          console.log(" newly found ice-candidate ");
          if (!sendIceCandidate) {
            setIceCandidates([...iceCandidates, event.candidate]);
          } else {
            let ice = iceCandidates.concat(event.candidate);
            while (ice.length > 0) {
              console.log("sending ice candidates");
              socket.emit("new-ice-candidate", ice.shift());
            }
            setIceCandidates(ice);
          }
        }
      });

      peerConnection.addEventListener("signalingstatechange", (event) => {
        if (peerConnection.signalingState === "stable") {
          setSendIceCandidate(true);
        }
      });

      peerConnection.addEventListener("connectionstatechange", (event) => {
        if (peerConnection.connectionState === "connected") {
          console.log("Peers connected!");
        }
      });

      peerConnection.addEventListener("track", async (event) => {
        console.log("track added");
        remoteStream.addTrack(event.track, remoteStream);
        remoteStream.getTracks().forEach((tr) => console.log(tr));
      });
    }
  }, [iceCandidates, peerConnection, remoteStream, sendIceCandidate, socket]);

  useEffect(() => {
    if (socket && localStream) {
      // agent
      socket.on("initiateVideoCall", async () => {
        localStream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, localStream);
        });
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit("webrtcOffer", offer);
        console.log("connection offer created and emitted");
      });

      // customer
      socket.on("webrtcOffer", async (offer) => {
        console.log("connection offer Received");
        peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        localStream.getTracks().forEach((track) => {
          if (track.kind === "video")
            peerConnection.addTrack(track, localStream);
        });
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("webrtcAnswer", answer);
        console.log("offer answer created and emitted");
      });

      // agent
      socket.on("webrtcAnswer", (answer) => {
        console.log("offer answer Received");
        peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      });

      // both
      socket.on("new-ice-candidate", async (iceCandidate) => {
        try {
          await peerConnection.addIceCandidate(iceCandidate);
        } catch (e) {
          console.error("Error adding received ice candidate", e);
        }
      });
    }
  }, [socket, peerConnection, localStream]);

  const initiateStream = async (
    constraint,
    videoElement,
    playSelfStream,
    remoteStream,
    peerConnection
  ) => {
    const localStream = await initiateSelfStream(constraint);
    if (playSelfStream) {
      videoElement.srcObject = localStream;
    } else {
      videoElement.srcObject = remoteStream;
    }
    setLocalStream(localStream);
    localStream.getTracks().forEach((tr) => console.log(tr));
  };

  useEffect(() => {
    const videoElement = document.querySelector(`#${videoElementId}`);
    initiateStream(
      mediaConstraints,
      videoElement,
      playSelfStream,
      remoteStream,
      peerConnection
    );
  }, [
    videoElementId,
    playSelfStream,
    mediaConstraints,
    peerConnection,
    remoteStream,
  ]);
}

export default useWebRtc;

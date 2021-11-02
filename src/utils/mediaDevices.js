import { displayMediaConstraints, userMediaConstraints } from "../constants";

const openUserMediaDevices = async (constraints) => {
  return await navigator.mediaDevices.getUserMedia(constraints);
};

const openDisplayMediaDevices = async (constraints) => {
  return await navigator.mediaDevices.getDisplayMedia(constraints);
};

export const initiateSelfStream = async (constraints) => {
  try {
    const stream = await openUserMediaDevices(constraints);
    // const stream = await openDisplayMediaDevices(displayMediaConstraints);
    console.log("Got MediaStream:", stream);
    return stream;
  } catch (error) {
    console.error("Error accessing media devices.", error);
  }
};

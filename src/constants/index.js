export const userMediaConstraints = {
  audio: true,
  video: true,
};

export const userMediaConstraintsForAgent = {
  audio: true,
  video: true,
};

export const displayMediaConstraints = {
  video: {
    cursor: "always" | "motion" | "never",
    displaySurface: "application" | "browser" | "monitor" | "window",
  },
};

// Free public STUN servers provided by Google.
export const rtcConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
  ],
};

export const cursorData = {
  angle: 0,
  animate: true,
  setMode: (mode) => {}, // cursor || door
  getMode: () => {}, // cursor || door
  lockCursor: () => {},
  unlockCursor: () => {},
};

export const powerState = {
  enabled: false,
  powerChangeReactions: [], // [(powerAmount: number 0 => 1) => {}]
};
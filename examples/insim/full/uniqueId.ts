let CURRENT_REQ_ID = 1;

export function generateUniqueReqId() {
  if (CURRENT_REQ_ID === 255) {
    CURRENT_REQ_ID = 0;
  } else {
    CURRENT_REQ_ID++;
  }

  return CURRENT_REQ_ID;
}

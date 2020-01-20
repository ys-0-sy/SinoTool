// actions.js

export const setEvent = event => ({
  type: "SET_EVENT",
  event: event
});

export const setEventImgUrl = (index, imgUrl) => ({
  type: "SET_EVENT_IMGURL",
  index: index,
  imgUrl: imgUrl
});

export const setGuerrillaList = event => ({
  type: "SET_GUERRILLALIST",
  event: event
});

export const setGuerrillaListImgUrl = (index, imgUrl) => ({
  type: "SET_GUERRILLALIST_IMGURL",
  index: index,
  imgUrl: imgUrl
});

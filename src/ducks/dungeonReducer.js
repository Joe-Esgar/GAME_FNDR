const initalState = [];

const SET_DUNGEONS = "SET_DUNGEONS";

export default function reducer(state = initalState, action) {
  switch (action.type) {
    case SET_DUNGEONS:
      return [...action.payload];
    default:
      return state;
  }
}

export function set_Dungeons(dungeons) {
  return {
    type: SET_DUNGEONS,
    payload: dungeons
  };
}

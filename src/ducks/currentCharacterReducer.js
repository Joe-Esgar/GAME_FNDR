const initialState = {
  currentCharacter: 0
};

const SET_CURRENT_CHARACTER = "SET_CURRENT_CHARACTER";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_CHARACTER:
      return { ...state, currentCharacter: action.payload };
    default:
      return state;
  }
}

export function setCurrentCharacter(currentCharacter) {
  console.log("HI ZACH IM A CURRENT CHARACTER:", currentCharacter);
  return {
    type: SET_CURRENT_CHARACTER,
    payload: currentCharacter
  };
}

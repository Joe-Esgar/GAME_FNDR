const initialState = {
  characters: []
};

const SET_CHARACTERS = "SET_CHARACTERS";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHARACTERS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export function setCharacters(characters) {
  return {
    type: SET_CHARACTERS,
    payload: characters
  };
}

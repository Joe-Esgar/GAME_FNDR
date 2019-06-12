const initialState = {
  user: null,
  profile_pic: "",
  username: ""
};

const SET_USER = "SET_USER";
const SET_USERNAME = "SET_USERNAME";
const SET_PROFILE_PIC = "SET_PROFILE_PIC";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case SET_PROFILE_PIC:
      return { ...state, profile_pic: action.payload };
    default:
      return state;
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function set_Username(username) {
  return {
    type: SET_USERNAME,
    payload: username
  };
}

export function set_Profile_Pic(profile_pic) {
  return {
    type: SET_PROFILE_PIC,
    payload: profile_pic
  };
}

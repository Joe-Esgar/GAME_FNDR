import React from "react";

export default function CharacterSelector(props) {
  return <option value={props.chId}>{props.name}</option>;
}

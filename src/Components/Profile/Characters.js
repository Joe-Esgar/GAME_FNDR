import React from "react";

export default function(props) {
  const { chId, name, charClass, description, bio, id, deleteChar } = props;

  return (
    <div>
      <div className="charbox">
        <ul>
          <li>{name}</li>
          <li>{charClass}</li>
          <li>{description}</li>
          <li>{bio}</li>
          <button onClick={() => deleteChar(chId, id)} />
        </ul>
      </div>
    </div>
  );
}

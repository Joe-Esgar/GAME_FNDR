import React from "react";

export default function(props) {
  const { chId, name, charClass, description, bio, id, deleteChar } = props;

  return (
    <div>
      <div className="charbox">
        <ul>
          <h2>Character Name:</h2>
          <li>{name}</li>
          <h2>Character Class:</h2>
          <li>{charClass}</li>
          <h2>Character Description:</h2>
          <li>{description}</li>
          <h2>Character Bio:</h2>
          <li>{bio}</li>
          <button onClick={() => deleteChar(chId, id)}>Delete</button>
        </ul>
      </div>
    </div>
  );
}

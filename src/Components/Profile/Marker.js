import React from "react";
import "./Marker.scss";

export default function Marker(props) {
  const { lat, lng, mapOnClick, id, image } = props;
  return (
    <img
      src={image}
      onClick={() => mapOnClick(id)}
      className="points"
      lat={lat}
      lng={lng}
      alt="map pin"
    />
  );
}

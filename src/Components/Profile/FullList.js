import React from "react";

export default function FullList(props) {
  const { name, address } = props;
  console.log(name);
  return (
    <div className="fulllist">
      {name} {address}
    </div>
  );
}

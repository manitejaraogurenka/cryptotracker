import React from "react";
import { Circles } from "react-loader-spinner";

function LoaderSpinner({ height, width }) {
  return (
    <div className="loader_container">
      <Circles height={height} width={width} color={"#9201BD"} visible={true} />
    </div>
  );
}

export default LoaderSpinner;

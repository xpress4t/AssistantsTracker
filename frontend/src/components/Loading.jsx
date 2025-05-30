import * as React from 'react';
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient
            id="loadingGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#loadingGradient)" } }}
      />
    </React.Fragment>
  );
};

export default Loading;

//mostrar solo cuando loading es true

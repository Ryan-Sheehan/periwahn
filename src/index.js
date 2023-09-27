import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { useMediaQuery } from "react-responsive";

function Overlay() {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          fontStyle: "italic",
          top: 20,
          left: 40,
          right: isMobile ? 40 : "auto",
          fontSize: "16px",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        <span>the haunting of periwahn, </span>
        <span style={{ opacity: "20%" }}>october 2023</span>
      </div>
      <div
        style={{
          position: "absolute",
          fontStyle: "italic",
          bottom: 20,
          right: 20,
          top: 40,
          left: isMobile ? 20 : "auto",
          fontSize: "12px",
          textAlign: isMobile ? "center" : "right",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            maxWidth: isMobile ? "100%" : "240px",
          }}
        >
          Come to Margot's great grandparents farm to celebrate halloweekend.
          Bring a costume (or 2 or 3) and anything you need to sleep (another
          costume maybe, up to you). We will have over 100 acres to roam. There
          will be a big fire. Your friends will be there. If you do not have a
          car, you can take a bus to Dartmouth and someone will pick you up. If
          you need to coordinate a ride, reach out (: There will be a grill.
          Bring some of your own food and/or food to share. Others are welcome—
          just let me know.
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <Overlay />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

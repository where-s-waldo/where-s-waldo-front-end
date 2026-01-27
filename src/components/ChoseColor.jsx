import { useState } from "react";
import { optionsMap } from "./ImgPreload";

const ChooseColor = ({ color, setColor }) => {
  const [open, setOpen] = useState(false);
  const colorOptions = ["black", "yellow", "red", "blue"];

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        src={optionsMap["changeColor"]}
        alt="Change Color"
        height={40}
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: 0,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            zIndex: 10,
          }}
        >
          {colorOptions.map((c) => (
            <div
              key={c}
              onClick={() => {
                setColor(c);
                setOpen(false);
              }}
              style={{
                padding: "5px 10px",
                cursor: "pointer",
                background: 'rgb(135, 192, 205)',
                border: `2px solid ${c}`,
                color: c,
                textDecoration: `${c === color ? "underline" : "none"}`
              }}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChooseColor
import "./styles.css";
import { useState } from "react";
import { useRef } from "react";
import circle from "./images/circle.png";
import cross from "./images/cross.png";
export default function App() {
  let array = ["", "", "", "", "", "", "", "", ""];
  let count = 0;
  const [restart, setRestart] = useState(false);
  const [green, setGreen] = useState(false);
  const [red, setRed] = useState(false);
  const title = useRef();
  const clickBox = (e, i) => {
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src=${circle} alt="circle"/>`;
      array[i] = "g";
      count = count + 1;
    } else if (count % 2 !== 0) {
      e.target.innerHTML = `<img src=${cross} style="height: 100px; width: 100px;" alt="cross"/>`;
      array[i] = "r";
      count = count + 1;
    }
    console.log(array);
    evaluate();
  };
  const evaluate = () => {
    if (
      (array[0] === "g" && array[1] === "g" && array[2] === "g") ||
      (array[0] === "g" && array[3] === "g" && array[6] === "g") ||
      (array[0] === "g" && array[4] === "g" && array[8] === "g") ||
      (array[1] === "g" && array[4] === "g" && array[7] === "g") ||
      (array[2] === "g" && array[5] === "g" && array[8] === "g") ||
      (array[3] === "g" && array[4] === "g" && array[5] === "g") ||
      (array[6] === "g" && array[7] === "g" && array[8] === "g") ||
      (array[2] === "g" && array[4] === "g" && array[6] === "g")
    ) {
      console.log("green");
      setGreen(true);
      title.current.innerHTML = "Congragulations circle won";
      const boxes = document.querySelectorAll(".row1");
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      setRestart(true);
    }
    if (
      (array[0] === "r" && array[1] === "r" && array[2] === "r") ||
      (array[0] === "r" && array[3] === "r" && array[6] === "r") ||
      (array[0] === "r" && array[4] === "r" && array[8] === "r") ||
      (array[1] === "r" && array[4] === "r" && array[7] === "r") ||
      (array[2] === "r" && array[5] === "r" && array[8] === "r") ||
      (array[3] === "r" && array[4] === "r" && array[5] === "r") ||
      (array[6] === "r" && array[7] === "r" && array[8] === "r") ||
      (array[2] === "r" && array[4] === "r" && array[6] === "r")
    ) {
      setRed(true);
      title.current.innerHTML = "Congragulations cross won";
      const boxes = document.querySelectorAll(".row1");
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      setRestart(true);
    }
    if (count === 9) {
      const boxes = document.querySelectorAll(".row1");
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      setRestart(true);
      if (!green && !red) {
        title.current.innerHTML = "No one won ,please restart the game";
      }
      if (green) {
        title.current.innerHTML = "Congragulations circle won";
      }
      if (red) {
        title.current.innerHTML = "Congragulations cross won";
      }
    }
  };
  const restartfun = () => {
    array = ["", "", "", "", "", "", "", "", ""];
    count = 0;
    const boxes = document.querySelectorAll(".row1");
    boxes.forEach(
      (box) => (
        (box.innerHTML = ""),
        (box.style.cursor = "pointer"),
        (box.style.pointerEvents = "")
      )
    );
    title.current.innerHTML = "Tic Tac Toe";
    setRestart(false);
    setGreen(false);
    setRed(false);
  };

  return (
    <div
      className="container"
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 ref={title}>Tic Tac Toe</h1>
      <div className="board" style={{ display: "flex" }}>
        <div className="firstrow">
          <div className="row1" onClick={(e) => clickBox(e, 0)}></div>
          <div className="row1" onClick={(e) => clickBox(e, 1)}></div>
          <div className="row1" onClick={(e) => clickBox(e, 2)}></div>
        </div>
        <div className="secondrow">
          <div className="row1" onClick={(e) => clickBox(e, 3)}></div>
          <div className="row1" onClick={(e) => clickBox(e, 4)}></div>
          <div className="row1" onClick={(e) => clickBox(e, 5)}></div>
        </div>
        <div className="thirdrow">
          <div className="row1" onClick={(e) => clickBox(e, 6)}></div>
          <div className="row1" onClick={(e) => clickBox(e, 7)}></div>
          <div className="row1" onClick={(e) => clickBox(e, 8)}></div>
        </div>
      </div>
      {restart && (
        <button
          type="button"
          className="btn btn-success button"
          onClick={restartfun}
        >
          Restart
        </button>
      )}
    </div>
  );
}

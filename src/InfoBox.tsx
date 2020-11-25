import * as React from "react";

const style = {
  border: "3px solid orange"
};
const preTagStyle = { display: "inline-block" };
export const InfoBox = () => {
  const [hidden, setHidden] = React.useState(false);
  return (
    <div style={style} hidden={hidden}>
      <button
        style={{ backgroundColor: "black", color: "white" }}
        onClick={() => setHidden(true)}
      >
        <b>x</b>
      </button>
      <br />
      <div style={{ paddingLeft: "10px" }}>
        The JS-code implemneted here i.e{" "}
        <pre style={preTagStyle}>tree-strcuture</pre> and{" "}
        <pre style={preTagStyle}>right-click-menu</pre> are respectively
        inspired by below "react-libraries"
        <ul>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.npmjs.com/package/react-hyper-tree"
            >
              react-hyper-tree
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.npmjs.com/package/react-contexify"
            >
              react-contextify
            </a>
          </li>
        </ul>
        I have written <b>"my own version"</b> of the same
      </div>
    </div>
  );
};

import React from "react";
export function MethodSelection(props) {
  return (
    <div className={props.margin ? "container-sm d-flex justify-content-center my-3" : "container-sm d-flex  justify-content-center"}>
      {props.items.map((value, index, array) => {
        return (
          <div className="form-check form-check-inline" key={index}>
            <label className="form-check-label" htmlFor="inputSelectionCA">
              <input
                className="form-check-input"
                type="radio"
                name={value.key}
                id={index}
                checked={props.index === index}
                onChange={(e) => {}}
                onClick={() => props.onChangeMethod(index)}
              ></input>
              {value.key}
            </label>
          </div>
        );
      })}
    </div>
  );
}

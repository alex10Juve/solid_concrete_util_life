import React from "react";
export function MethodSelectionACI(props) {
    return (
        <div className="container-sm d-flex  justify-content-center">
            <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="inputSelectionCA">
                    <input className="form-check-input" type="radio" name="methodSelection" id="inputSelectionCA" checked={props.method === 0 }
                       onChange={(e)=> {}} onClick={() => props.onChangeMethod(0)}>
                    </input>
                {"Vida util Remanente"}</label>
            </div>
            <div className="form-check form-check-inline" >
                <label className="form-check-label" htmlFor="inputSelectionEHE">
                    <input className="form-check-input" type="radio" name="methodSelection" id="inputSelectionEHE"
                        onChange={(e)=> {}} checked={props.method === 1} onClick={() => props.onChangeMethod(1)}>
                    </input>
                    {"Vida util aproximada"}
                </label>
            </div>
            <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="inputSelectionACI">
                    <input className="form-check-input" type="radio" name="methodSelection" id="inputSelectionACI" checked={props.method === 2}
                       onChange={(e)=> {}} onClick={() => props.onChangeMethod(2)}>
                    </input>
                    {"Vida util"}
                </label>
            </div>
        </div>
    );
}
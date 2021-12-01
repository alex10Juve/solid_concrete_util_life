import React from "react";
import { MetodoCalculo } from '../lib/general';
export function MethodSelection(props) {

    return (
        <div className="container-sm d-flex  justify-content-center">
            <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="inputSelectionCA">
                    <input className="form-check-input" type="radio" name="methodSelection" id="inputSelectionCA" checked={props.method === 0 }
                       onChange={(e)=> {}} onClick={() => props.onChangeMethod(0)}>
                    </input>
                {MetodoCalculo[0].name}</label>
            </div>
            <div className="form-check form-check-inline" >
                <label className="form-check-label" htmlFor="inputSelectionEHE">
                    <input className="form-check-input" type="radio" name="methodSelection" id="inputSelectionEHE"
                        onChange={(e)=> {}} checked={props.method === 1} onClick={() => props.onChangeMethod(1)}>
                    </input>
                    {MetodoCalculo[1].name}
                </label>
            </div>
            <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="inputSelectionACI">
                    <input className="form-check-input" type="radio" name="methodSelection" id="inputSelectionACI" checked={props.method === 2}
                       onChange={(e)=> {}} onClick={() => props.onChangeMethod(2)}>
                    </input>
                    {MetodoCalculo[2].name}
                </label>
            </div>
        </div>
    );
}
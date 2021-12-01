import React from "react";
import { ToggleButton } from "react-bootstrap";
import { MetodoCalculoEHE } from "../solidConcreteLib";
export function EHESelection(props) {
    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-sm-4">
                    <ToggleButton
                        type="radio"
                        name="coverEquivalent"
                        value={MetodoCalculoEHE[0]}
                        onClick={(e) => props.onChangeMethod(0)}
                        >
                    {MetodoCalculoEHE[0]}
                    </ToggleButton>
                </div>
                <div className="col-sm-4">
                    <ToggleButton
                        type="radio"
                        name="chloridePenetration"
                        value={MetodoCalculoEHE[1]}
                        onClick={(e) => props.onChangeMethod(1)}
                        >
                    {MetodoCalculoEHE[1]}
                    </ToggleButton>
                </div>
                <div className="col-sm-4">
                    <ToggleButton
                        type="radio"
                        name="carbonation"
                        value={MetodoCalculoEHE[2]}
                        onClick={(e) => props.onChangeMethod(2)}
                        >
                    {MetodoCalculoEHE[2]}
                    </ToggleButton>
                </div>
            </div>
        </div>
    );
}
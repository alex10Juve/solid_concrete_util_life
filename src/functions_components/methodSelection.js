import React from "react";
import { ToggleButton} from "react-bootstrap";
import { MetodoCalculo} from "../solidConcreteLib";
export function MethodSelection(props){

    
    return(
        <div className="container my-4">
            <div className="row">
                <div className="col-sm-4">
                    <ToggleButton
                        type="radio"
                        name="radioCA"
                        value={MetodoCalculo[0].value}
                        onClick={() => props.onChangeMethod(MetodoCalculo[0].value)}
                        overla
                    >
                        {MetodoCalculo[0].name}
                    </ToggleButton>
                </div>
                <div className="col-sm-4">
                <ToggleButton
                        type="radio"
                        name="radioEHE-08"
                        value={MetodoCalculo[1].value}
                        onClick={() => props.onChangeMethod(MetodoCalculo[1].value)}
                    >
                        {MetodoCalculo[1].name}
                    </ToggleButton>
                </div>
                <div className="col-sm-4">
                <ToggleButton
                        type="radio"
                        name="radioACI=365"
                        value={MetodoCalculo[2].value}
                        onClick={() => props.onChangeMethod(MetodoCalculo[2].value)}
                    >
                        {MetodoCalculo[2].name}
                    </ToggleButton>
                </div>
            </div>
            <div className="row my-2">
                    <h4>{props.method}</h4>
            </div>
        </div>
    );
}
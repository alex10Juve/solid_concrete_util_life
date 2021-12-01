import React, { useState } from "react";
export function AmbientalFactorSelectionByChloride(props){
    
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);

    return(
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" onClick={toggling}>Agresividad del medio</button>
            {isOpen && (
                <ul className="dropdown-menu show mx-lg-3">
                {props.ambientalFactors.map((type,index)=> (
                    <li key={index} className="dropdown-item" onClick={(e) => {props.onChangeAmbientalFactor(index);
                                                                               toggling()}
                                                                     }>{type.name}
                     </li>
                ))}
             </ul>
            )}
            <h6 className="my-2">{props.ambientalFactors[props.currentAmbientalFactor].name}</h6>
        </div>
    );
}
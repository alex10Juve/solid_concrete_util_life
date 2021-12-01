
import React, { useState } from "react";


export function CementSelection(props) {
    const style = {
        width: "100%",
        
    }
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);

    return (
        <div className="dropdown" style={style}>
            <button className="btn btn-secondary dropdown-toggle" type="button" onClick={toggling}>
                Tipo de cemento
            </button>
            {isOpen &&(
                <ul className="dropdown-menu show mx-lg-3" aria-labelledby="dropdownMenuButton1">
                   {props.typesCement.map((type,index)=> (
                       <li key={index} className="dropdown-item" onClick={(e) => {props.onChangeCement(index);
                                                                                  toggling()}
                                                                        }>{type.name}
                        </li>
                   ))}
                </ul>
            )}
            <h6 className="my-2">{props.typesCement[props.currentCement].name}</h6>
        </div>
    );
}
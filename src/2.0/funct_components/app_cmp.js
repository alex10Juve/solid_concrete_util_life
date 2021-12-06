import React, { useState } from "react";
import { MetodoCalculo } from "../lib/general";
import { EntryValues } from "./entryValues_cmp";
import { Presentation } from "./presentation_cmp";
import { MethodSelection } from "./selectionMethod_cmp";

export function Main() {

    const [currentMethodIndex, setCurrentMethodIndex] = useState(0);
    const [index, setIndex] = useState(0);
    return (
        <div className="container-sm">
            <Presentation>

            </Presentation>

            <MethodSelection onChangeMethod={(newMethod) => setCurrentMethodIndex(newMethod)} method={currentMethodIndex}>

            </MethodSelection>

            <EntryValues method={MetodoCalculo[currentMethodIndex].value}></EntryValues>

            
        </div>
    );
}
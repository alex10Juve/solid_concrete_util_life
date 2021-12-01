import React, { useState } from "react";
import { MetodoCalculo } from "../lib/general";
import  CustomDropdownList  from "./dropdownList_cmp";
import { EntryValues } from "./entryValues_cmp";
import { Presentation } from "./presentation_cmp";
import { MethodSelection } from "./selectionMethod_cmp";


const TESTITEMS = [
    { value: "a" },
    { value: "b" },
    { value: "c" }
]

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
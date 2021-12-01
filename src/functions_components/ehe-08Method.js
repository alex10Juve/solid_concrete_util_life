import React, { useState } from "react";
import { EHE08Chloride } from "./EHE-08Chloride";
import { EHE08Carbonation, EHE08EntryFields } from "./EHE-08Carbonation"
import { EHE08EquivalentCover } from "./EHE-08EquivalentCover";
import { EHESelection } from "./methodSelectionEhe";
export function EHE08() {
    const [indexMethod, setIndexMethod] = useState(0);

    function SwitchMethod() {
        if (indexMethod === 0) {
            return <EHE08Chloride></EHE08Chloride>
        }
        else if (indexMethod === 1) {
            return <EHE08Carbonation></EHE08Carbonation>
        }
        else
            return <EHE08EquivalentCover></EHE08EquivalentCover>

    }
    return (
        <div>
            <EHESelection onChangeMethod={(index) => setIndexMethod(index)}></EHESelection>
            {SwitchMethod()}
        </div>
    );
}
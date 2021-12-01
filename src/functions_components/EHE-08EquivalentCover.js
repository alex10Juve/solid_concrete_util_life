import React, { useState } from "react";
import { ToggleButton } from "react-bootstrap";
import CustomDropdownList from "../2.0/funct_components/dropdownList_cmp";

const SpeedCarbonationTable = [
    { value: "<= 2,0", lambda: 0.5 },
    { value: "<= 1,0", lambda: 1.0 },
    { value: "<= 0,7", lambda: 1.5 },
    { value: "<= 0,5", lambda: 2.0 },
]

const GeneralexpositionClass = [
    { value: "Normal humedad alta" },
    { value: "Normal humedad media" },
    { value: "Marina Aera" }
]

const SpeedChloridePenetration = [
    { value: "<= 3,4", lambda: 0.5 },
    { value: "<= 1,7", lambda: 1.0 },
    { value: "<= 1,1", lambda: 1.5 },
    { value: "<= 0,9", lambda: 2.0 },
]

const Capilarity = [
    { value: "<= 0,40", lambda: 0.5 },
    { value: "<= 0,20", lambda: 1.0 },
    { value: "<= 0,15", lambda: 1.5 },
    { value: "<= 0,10", lambda: 2.0 },
]



export function EHE08EquivalentCover() {
    const [indexSpeedCarbonation, setindexSpeedCarbonation] = useState(0);
    const [indexGeneralExpostionClass, setIndexGeneralExpostionClass] = useState(0);
    const [indexSecondaryTable, setIndexSecondaryTable] = useState(0);
    const [modelChloride, setModelChloride] = useState(null);
    const [calculated, setCalculted] = useState(false);
    const [cover, setCover] = useState();

    function GetLambda(index, expositionClass) {
        if (expositionClass === 2)
            return Capilarity[index].lambda;
        else
            return SpeedCarbonationTable[index].lambda;
    }

    return (
        <div className="container">
            <div className="row mx-auto">
                <div className="col-sm-2 offset-sm-1 offset-lg-2">
                    <form className="my-4">
                        <div className="mb-3">
                            <label for="coverInput" className="form-label">Espesor(mm)</label>
                            <input type="number" className="form-control text-lg-center" id="coverInput" aria-describedby="coverInputHelp" onChange={(e) => setCover(e.target.value)}></input>
                            <div id="coverInputHelp" className="form-text">Espesor de mortero</div>
                        </div>
                        <div className="mb-3">
                            <CustomDropdownList
                                currentIndex={indexGeneralExpostionClass}
                                items={GeneralexpositionClass}
                                header="Clase general de exposicion"
                                onChangeIndex={(indexGeneralClass) => setIndexGeneralExpostionClass(indexGeneralClass)}>
                            </CustomDropdownList>
                        </div>
                        {(indexGeneralExpostionClass === 0 || indexGeneralExpostionClass === 1) && (
                            <CustomDropdownList
                                currentIndex={indexSpeedCarbonation}
                                items={SpeedCarbonationTable}
                                header="Clase general de exposicion"
                                onChangeIndex={(indexSpeed) => setindexSpeedCarbonation(indexSpeed)}>
                            </CustomDropdownList>
                        )}
                    </form>

                </div>
            </div >
            {indexGeneralExpostionClass === 2 && (
                <div className="row mx-auto d-flex">
                    <div className="col-sm-4 d-flex">
                        <ToggleButton type="radio"
                            name="chloridePenetration"
                            value="chloridePenetration"
                            onClick={(e) => setModelChloride(true)}>
                            {"Por velocidad de pentracion de cloruros"}
                        </ToggleButton>
                    </div>
                    <div className="col-sm-4 d-flex">
                        <ToggleButton type="radio"
                            name="capilarity"
                            value="capilarity"
                            onClick={(e) => setModelChloride(false)}>
                            {"Por capilaridad"}
                        </ToggleButton>
                    </div>
                    <div className="col-sm-4 d-flex">
                    </div>
                </div>
            )}
            {modelChloride === true && indexGeneralExpostionClass === 2 && (
                <div className="row mx-auto my-2">
                    <div className="col-sm-4">
                        <CustomDropdownList header="Velocidad de pentracion de cloruros"
                            currentIndex={indexSecondaryTable}
                            items={SpeedChloridePenetration}
                            onChangeIndex={(newIndex) => setIndexSecondaryTable(newIndex)}></CustomDropdownList>
                    </div>
                </div>
            )}
            {modelChloride === false && indexGeneralExpostionClass === 2 && (
                <div className="row mx-auto my-2">
                    <div className="col-sm-4">
                        <CustomDropdownList header={"Capilaridad"}
                            items={Capilarity}
                            currentIndex={indexSecondaryTable}
                            onChangeIndex={(newIndex) => setIndexSecondaryTable(newIndex)}>
                        </CustomDropdownList>
                    </div>
                </div>
            )}
            {(modelChloride !== null || indexGeneralExpostionClass === 0) && (
                <div className="row mx-auto">
                    <div className="col-sm-1 offset-sm-1 my-3 offset-lg-5">
                        <button className="btn btn-outline-secondary" type="button" onClick={(e) => setCalculted(!calculated)}>{calculated ? "Reiniciar" : "Calcular"}</button>
                    </div>
                </div>
            )}
            {calculated && (
                <div>
                    <h5>
                        ({indexGeneralExpostionClass === 0 ? cover * SpeedCarbonationTable[indexSpeedCarbonation].lambda : cover * GetLambda(indexSecondaryTable,indexGeneralExpostionClass)})
                    </h5>
                </div>
            )}
        </div >
    );
}
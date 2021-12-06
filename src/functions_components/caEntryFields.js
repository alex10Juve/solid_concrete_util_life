import { CementSelection } from "./cementSelection";
import React, { useState } from "react";
import { TipoCemento, CarmenAndradeTi, CarmenAndradeTp, ExposicionPorClorurosParaFactorAmbiental } from "../2.0/lib/methodCarmenAndrade";
import { AmbientalFactorSelectionByChloride } from "./ambientalFactorSelection";

export function CAEntryFields() {
    const [typeCement, setCementType] = useState(0);
    const [resistivity, setresistivity] = useState(0);
    const [t0, setT0] = useState(0.0767);
    const [t, setT] = useState(50);
    const [cover, setCover] = useState(0);
    const [calculated, setCalculted] = useState(false);
    const [fa,setFa] = useState(0);

    // Prueba de calculo
    // TODO move to a component
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-2 offset-sm-0 offset-lg-2">
                    <form>
                        <div className="mb-3">
                            <label for="coverInput" className="form-label">Recubrimiento(cm)</label>
                            <input type="number" className="form-control text-lg-center" id="coverInput" aria-describedby="coverInputHelp" onChange={(e) => setCover(e.currentTarget.value)}></input>
                            <div id="coverInputHelp" className="form-text">Area de recubrimiento</div>
                        </div>
                        <div className="mb-3">
                            <label for="initializationTime" className="form-label">Tiempo de iniciacion(dias)</label>
                            <input type="number" className="form-control text-lg-center" id="initializationTime" aria-describedby="initializationTimeHelp" defaultValue={28}
                                onChange={(e) => setT0(e.currentTarget.value / 365)}></input>
                            <div id="initializationTimeHelp" className="form-text">Tiempo de iniciacion</div>
                        </div>
                        <div className="mb-3">
                            <label for="resistivityInput" className="form-label">Resistividad</label>
                            <input type="number" className="form-control text-lg-center" id="resistivityInput" aria-describedby="resistivityInputHelp" onChange={(e) => setresistivity(e.currentTarget.value)}></input>
                            <div id="resistivityInputHelp" className="form-text">Resistividad efectiva</div>

                        </div>
                        <div className="mb-3">
                            <label for="tInput" className="form-label">Tiempo de envejecimiento</label>
                            <input type="number" className="form-control text-lg-center" id="tInput" aria-describedby="tInputHelp" onChange={(e) => setT(e.currentTarget.value)} defaultValue={50}></input>
                            <div id="tInputHelp" className="form-text">Tiempo de envejecimiento</div>

                        </div>
                        <CementSelection typesCement={TipoCemento} onChangeCement={(newCement) => setCementType(newCement)}
                            currentCement={typeCement}>
                        </CementSelection>
                        
                        <AmbientalFactorSelectionByChloride ambientalFactors={ExposicionPorClorurosParaFactorAmbiental} 
                                                            onChangeAmbientalFactor={(newFa)=> setFa(newFa)}
                                                            currentAmbientalFactor={fa}
                        ></AmbientalFactorSelectionByChloride>
                    </form>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 offset-sm-0 offset-lg-2">
                    <button className="btn btn-outline-secondary" type="button" onClick={(e) => setCalculted(!calculated)}>{calculated ? "Reiniciar" : "Calcular"}</button>
                </div>
                <div className="col-sm-2 offset-sm-0 offset-lg-2">
                    {calculated && (

                        <div>
                            <h5>Tiempo de iniciacion:{CarmenAndradeTi(TipoCemento[typeCement].q.valor,
                                TipoCemento[typeCement].rcl.valor,
                                resistivity,
                                cover, t, t0, ExposicionPorClorurosParaFactorAmbiental[fa].fa.valor)}</h5>
                            <h5>Tiempo de propagacion:{CarmenAndradeTp(resistivity, t, t0, TipoCemento[typeCement].q.valor)}</h5>

                            <h5>Tiempo de vida util: {CarmenAndradeTp(resistivity, t, t0, TipoCemento[typeCement].q.valor) +
                                CarmenAndradeTi(TipoCemento[typeCement].q.valor,
                                    TipoCemento[typeCement].rcl.valor,
                                    resistivity,
                                    cover, t, t0, ExposicionPorClorurosParaFactorAmbiental[fa].fa.valor)}</h5>
                        </div>

                    )}
                </div>
            </div>

        </div>
    );
}
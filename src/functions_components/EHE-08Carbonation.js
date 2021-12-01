import React, { useState } from "react";
import { Cair, Cenv, Coeffs, MetodoCarbonatacionTiEHE08, MetodoCarbonatacionTpEHE08, Vcorr } from "../lib/metodoEhe-08";

// This version of the component is depreacated and should only use
// for tests and learning purposes.

export function EHE08Carbonation() {
    const [modelChloride, setModelChloride] = useState(true);
    const [isOpenCenv, setIsOpenCenv] = useState(false);
    const [isOpenCair, setIsOpenCair] = useState(false);
    const [isOpenCoeffs, setIsOpenCoeffs] = useState(false);
    const [isOpenVcor, setIsOpenVcorr] = useState(false);
    const [cenvIndex, setCenvIndex] = useState(0);
    const [cairIndex, setCairIndex] = useState(0);
    const [coeffsIndex, setCoeffsIndex] = useState(0);
    const [vCorrIndex, setVcorrIndex] = useState(0);
    const [calculated, setCalculted] = useState(false);
    const [shieldRatio, setShieldRatio] = useState(0);
    const [cover, setCover] = useState(0);
    const [fck, setFck] = useState(0);

    const toggling = (item) => {
        if (item === "Cenv")
            setIsOpenCenv(!isOpenCenv);
        else if (item === "Cair")
            setIsOpenCair(!isOpenCair);

        else if (item === "Coeff")
            setIsOpenCoeffs(!isOpenCoeffs);
        else
            setIsOpenVcorr(!isOpenVcor);
    }

    return (
        <div className="container">
            {/* <div className="header">Valores de entrada</div> */}
            <div className="row mx-auto">
                <div className="col-sm-2 offset-sm-1 offset-lg-2">
                    <form className="my-4">
                        <div className="mb-3">
                            <label for="coverInput" className="form-label">Recubrimiento(cm)</label>
                            <input type="number" className="form-control text-lg-center" id="coverInput" aria-describedby="coverInputHelp" onChange={(e) => setCover(e.target.value)}></input>
                            <div id="coverInputHelp" className="form-text">Area de recubrimiento</div>
                        </div>
                        <div className="mb-3">
                            <label for="compressResistance" className="form-label">Fck(Mpa)</label>
                            <input type="number" className="form-control text-lg-center" id="compressResistance" aria-describedby="compressResistanceHelp" onChange={(e) => setFck(e.currentTarget.value)}></input>
                            <div id="compressResistanceHelp" className="form-text">Resistencia a compresion</div>
                        </div>
                        <div className="mb-3">
                            <label for="shieldRadio" className="form-label">{'\u03C6'}(mm)</label>
                            <input type="number" className="form-control text-lg-center" id="shieldRadio" aria-describedby="shieldRadioHelp" onChange={(e) => setShieldRatio(e.target.value)}></input>
                            <div id="shieldRadioHelp" className="form-text">Diametro de armadura</div>
                        </div>
                    </form>

                </div>
                <div className="col-sm-2 offset-sm-1 offset-lg-2">
                    <form className="my-5">
                        <button className="btn btn-secondary dropdown-toggle" type="button" onClick={(e) => toggling("Cenv")}>{"Ambiente"}</button>
                        {isOpenCenv && (
                            <ul className="dropdown-menu show">
                                {Cenv.map((item, index) => (
                                    <li key={index} className="dropdown-item" onClick={(e) => { setCenvIndex(index); toggling("Cenv") }}>{item.type}</li>
                                ))}
                            </ul>
                        )}
                        <h6 className="my-2">{Cenv[cenvIndex].type}</h6>
                        <button className="btn btn-secondary dropdown-toggle" type="button" onClick={(e) => toggling("Cair")}>{"Aire ocluido"}</button>
                        {isOpenCair && (
                            <ul className="dropdown-menu show">
                                {Cair.map((item, index) => (
                                    <li key={index} className="dropdown-item" onClick={(e) => { setCairIndex(index); toggling("Cair") }}>{item.type}</li>
                                ))}
                            </ul>
                        )}
                        <h6 className="my-2">{Cair[cairIndex].type}</h6>

                        <button className="btn btn-secondary dropdown-toggle" type="button" onClick={(e) => toggling("Coeff")}>{"Conglomerante"}</button>
                        {isOpenCoeffs && (
                            <ul className="dropdown-menu show">
                                {Coeffs.map((item, index) => (
                                    <li key={index} className="dropdown-item" onClick={(e) => { setCoeffsIndex(index); toggling("Coeff") }}>{item.typeCement}</li>
                                ))}
                            </ul>
                        )}
                        <h6 className="my-2">{Coeffs[coeffsIndex].typeCement}</h6>

                        <button className="btn btn-secondary dropdown-toggle" type="button" onClick={(e) => toggling("Vcorr")}>{"Clase de exposicion"}</button>
                        {isOpenVcor && (
                            <ul className="dropdown-menu show">
                                {Vcorr.map((item, index) => (
                                    <li key={index} className="dropdown-item" onClick={(e) => { setVcorrIndex(index); toggling("Vcorr") }}>{item.expositionClass}</li>
                                ))}
                            </ul>
                        )}
                        <h6 className="my-2">{Vcorr[vCorrIndex].expositionClass}</h6>
                    </form>
                </div>
            </div>
            <div className="row mx-auto">
                <div className="col-sm-1 offset-sm-1 offset-lg-5">
                    <button className="btn btn-outline-secondary" type="button" onClick={(e) => setCalculted(!calculated)}>{calculated ? "Reiniciar" : "Calcular"}</button>
                </div>
            </div>
            <div className="row mx-auto">
                {
                    calculated && (

                        <div>
                            <h5>Tiempo de iniciacion: {MetodoCarbonatacionTiEHE08(Cenv[cenvIndex].value, Cair[cairIndex].value, Coeffs[coeffsIndex].a, Coeffs[coeffsIndex].b, fck, cover)}</h5>
                            <h5>Tiempo de propagacion:{MetodoCarbonatacionTpEHE08(shieldRatio, cover, Vcorr[vCorrIndex].value)}</h5>
                            <h5>Tiempo de vida util: {MetodoCarbonatacionTiEHE08(Cenv[cenvIndex].value, Cair[cairIndex].value, Coeffs[coeffsIndex].a, Coeffs[coeffsIndex].b, fck, cover) + MetodoCarbonatacionTpEHE08(shieldRatio, cover, Vcorr[vCorrIndex].value)}</h5>
                        </div>
                    )}
            </div>
        </div>
    );
}
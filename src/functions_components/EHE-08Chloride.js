import React, { useState } from "react";
import { Vcorr } from "../lib/metodoEhe-08";
import { Ac, Cth, GeneralExpositionClass, MetodoPenetracionClorurosTiEHE08, MetodoPenetracionClorurosTpEHE08, TypeCementEHE08Chloride } from "../lib/metodoEhe-08Chloride";

export function EHE08Chloride() {
    const [cover, setCover] = useState(0);
    const [shieldRatio, setShieldRatio] = useState(0);
    const [cb, setCb] = useState(0);
    const [t, setT] = useState(0);
    const [csIndex, setCsIndex] = useState(0);
    const [cthIndex, setCthIndex] = useState(0);
    const [acIndex, setAcIndex] = useState(0);
    const [vcorrIndex, setVcorrIndex] = useState(0);
    const [typeCementIndex, setTypeCementIndex] = useState(0);
    const [calculated, setCalculted] = useState(false);
    const [isOpenTypeCement, setisOpenTypeCement] = useState(false);
    const [isOpenCs, setIsOpenCs] = useState(false);
    const [isOpenAc, setIsOpenAc] = useState(false);
    const [isOpenCth, setIsOpenCth] = useState(false);
    const [isOpenVcorr,setIsOpenVcorr] = useState(false);

    const toggling = (item) => {
        if (item === "Cs")
            setIsOpenCs(!isOpenCs);
        else if (item === "Cth")
            setIsOpenCth(!isOpenCth);

        else if (item === "Ac")
            setIsOpenAc(!isOpenAc);
        else if (item === "Vcorr")
            setIsOpenVcorr(!isOpenVcorr)
        else
            setisOpenTypeCement(!isOpenTypeCement);
    }

    const dt0 = (ac) => {
        if (ac === 0)
            return TypeCementEHE08Chloride[typeCementIndex].ac40;
        else if (ac === 1)
            return TypeCementEHE08Chloride[typeCementIndex].ac45;
        else if (ac === 2)
            return TypeCementEHE08Chloride[typeCementIndex].ac50;
        else if (ac === 3)
            return TypeCementEHE08Chloride[typeCementIndex].ac55;
        else
            return TypeCementEHE08Chloride[typeCementIndex].ac60;
    }

    return (
        <div className="container">
            <div className="row mx-auto">
                <div className="col-sm-2 offset-sm-1 offset-lg-2">
                    <form className="my-4">
                        <div className="mb-3">
                            <label htmlfor="coverInput" className="form-label">Recubrimiento(cm)</label>
                            <input type="number" className="form-control text-lg-center" id="coverInput" aria-describedby="coverInputHelp" onChange={(e) => setCover(e.target.value)}></input>
                            <div id="coverInputHelp" className="form-text">Area de recubrimiento</div>
                        </div>
                        <div className="mb-3">
                            <label htmlfor="agingTime" className="form-label">{'Tiempo de envejecimiento'}</label>
                            <input type="number" className="form-control text-lg-center" id="agingTime" aria-describedby="agingTimeHelp" onChange={(e) => setT(e.target.value)}></input>
                            <div id="shieldRadioHelp" className="form-text">Tiempo de envejecimiento</div>
                        </div>
                        <div className="mb-3">
                            <label htmlfor="shieldRadio" className="form-label">{'\u03C6'}(mm)</label>
                            <input type="number" className="form-control text-lg-center" id="shieldRadio" aria-describedby="shieldRadioHelp" onChange={(e) => setShieldRatio(e.target.value)}></input>
                            <div id="shieldRadioHelp" className="form-text">Diametro de armadura</div>
                        </div>
                        <div className="mb-3">
                            <label htmlfor="cb" className="form-label">{"Cb"}(%)</label>
                            <input type="number" className="form-control text-lg-center" id="cb" aria-describedby="cbHelp" onChange={(e) => setCb(e.target.value)}></input>
                            <div id="cbHelp" className="form-text">Contenido de cloruro aportado por las materias primas</div>
                        </div>
                    </form>
                </div>
                <div className="col-sm-2 offset-sm-2 offset-lg-4">
                    <form className="my-5">
                        <button className="btn btn-secondary dropdown-toggle" type="button" onClick={(e) => toggling("Tc")}>{"Tipo de cemento"}</button>
                        {isOpenTypeCement && (
                            <ul className="dropdown-menu show">
                                {TypeCementEHE08Chloride.map((item, index) => (
                                    <li key={index} className="dropdown-item" onClick={(e) => { setTypeCementIndex(index); toggling("Tc") }}>{item.typeCement}</li>
                                ))}
                            </ul>

                        )}
                        <h6 className="my-2">{TypeCementEHE08Chloride[typeCementIndex].typeCement}</h6>

                        <button className="btn btn-secondary dropdown-toggle" type="button" onClick={(e) => toggling("Ac")}>{"Relacion Ac"}</button>
                        {isOpenAc && (
                            <ul className="dropdown-menu show">
                                {Ac.map((item, index) => (
                                    <li key={index} className="dropdown-item" onClick={(e) => { setAcIndex(index); toggling("Ac") }}>{item}</li>
                                ))}
                            </ul>
                        )}
                        <h6 className="my-2">{Ac[acIndex]}</h6>

                        <button className="btn btn-secondary dropdown-toggle" type="button" onClick={(e) => toggling("Cth")}>{"Cth"}</button>
                        {isOpenCth && (
                            <ul className="dropdown-menu show">
                                {Cth.map((item, index) => (
                                    <li key={index} className="dropdown-item" onClick={(e) => { setCthIndex(index); toggling("Cth") }}>{item.description}</li>
                                ))}
                            </ul>
                        )}
                        <h6 className="my-2">{Cth[cthIndex].description}</h6>

                        <button className="btn btn-secondary dropdown-toggle" type="button" onClick={(e) => toggling("Cs")}>{"Cs"}</button>
                        {isOpenCs && (
                            <ul className="dropdown-menu show">
                                {GeneralExpositionClass.map((item, index) => (
                                    <li key={index} className="dropdown-item" onClick={(e) => { setCsIndex(index); toggling("Cs") }}>{item.type}</li>
                                ))}
                            </ul>
                        )}
                        <h6 className="my-2">{GeneralExpositionClass[csIndex].type}</h6>
                        <button className="btn btn-secondary dropdown-toggle" type="button" onClick={(e) => toggling("Vcorr")}>{"Clase de exposicion"}</button>
                        {isOpenVcorr && (
                            <ul className="dropdown-menu show">
                                {Vcorr.map((item, index) => (
                                    <li key={index} className="dropdown-item" onClick={(e) => { setVcorrIndex(index); toggling("Vcorr") }}>{item.expositionClass}</li>
                                ))}
                            </ul>
                        )}
                        <h6 className="my-2">{Vcorr[vcorrIndex].expositionClass}</h6>
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
                            <h5>Tiempo de iniciacion: {MetodoPenetracionClorurosTiEHE08(cover,
                                t, cb, Cth[cthIndex].value, GeneralExpositionClass[csIndex].value), dt0(typeCementIndex)}</h5>
                            <h5>Tiempo de propagacion:{MetodoPenetracionClorurosTpEHE08(shieldRatio,cover,Vcorr[vcorrIndex].value)}</h5>                            
                        </div>
                        
                    )}
            </div>
        </div>
    );
}
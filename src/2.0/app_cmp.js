import React, { useState } from "react";
import { MetodoCalculo, SubMetodosEHE,SubMetodosACI} from "./lib/general";
import { UsefulLifeRemainingAproximate } from "./funct_components/aci/usefulLifeRemainingAprox_cmp";
import { UsefulLifeRemainingCorrosion } from "./funct_components/aci/usefulLifeRemainingCorrosion_cmp";
import { UsefulLife } from "./funct_components/aci/UsefulLife_cmp";
import { CarmenAndrade } from "./funct_components/CarmenAndrade/methodCarmenAndrade_cmp";
import { EHECarbonatation } from "./funct_components/ehe-08/methodEhe-08Carbonatation_cmp";
import { Presentation } from "./stateless_components/presentation_cmp";
import { MethodSelection } from "./stateless_components/selectionMethod_cmp";
import { EHE08Chloride } from "../functions_components/EHE-08Chloride";
import { EHE08EquivalentCover } from "../functions_components/EHE-08EquivalentCover";

export function Main() {

    const [currentMainMethodIndex, setCurrentMainMethodIndex] = useState(null);
    const [currentSubMethodIndex,setSubMethodIndex] = useState(null);
    
    

    // TODO
    // NO me gusta la forma en que se devuelve el arreglo
    // usando if. igualmente la clausula else devuelve null
    // refactorizacion requerida.
    function GetSubMethods(){
        if(currentMainMethodIndex===1){
            return SubMetodosEHE;
        }
        else if (currentMainMethodIndex===2){
            return SubMetodosACI;
        }
        else
            return null;
    }

    function GetCalculationCmp(){
        switch (GetSubMethods()[currentSubMethodIndex].value) {
            case "ACI-Corrosion":
                return <UsefulLifeRemainingCorrosion> </UsefulLifeRemainingCorrosion>;
            case "ACI-Vida-util":
                return <UsefulLife> </UsefulLife>
            case "ACI-Vida-aproximada":
                return <UsefulLifeRemainingAproximate></UsefulLifeRemainingAproximate>
            case "EHE-08-Carbonatacion":
                return <EHECarbonatation> </EHECarbonatation>
            case "EHE-08-Penetracion-de-cloruros":
                return <EHE08Chloride></EHE08Chloride>
            case "EHE-08-Recubrimiento-equivalente":
                return <EHE08EquivalentCover></EHE08EquivalentCover>
            default:
                break;
        }
    }

    return (
        <div className="container-sm">
            <Presentation>

            </Presentation>

            <MethodSelection onChangeMethod={(newMethod) => setCurrentMainMethodIndex(newMethod)} index={currentMainMethodIndex} items={MetodoCalculo} margin={false}>

            </MethodSelection>

            {currentMainMethodIndex===0 && (<CarmenAndrade> </CarmenAndrade>)}

            {currentMainMethodIndex!==0 && currentMainMethodIndex!== null  && (<MethodSelection onChangeMethod={(newSubMethod) => setSubMethodIndex(newSubMethod)} index={currentSubMethodIndex} items={GetSubMethods()} margin={true} ></MethodSelection>)}

            {currentMainMethodIndex!==0 && currentMainMethodIndex!== null &&  currentSubMethodIndex!==null && (GetCalculationCmp())}

            
        </div>
    );
}
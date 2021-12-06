import React, { useState } from "react";
import { MethodSelectionACI } from "./selectionACI";
import { UsefulLifeRemainingAproximate } from "./usefulLifeRemainingAprox_cmp";
import { UsefulLifeRemainingCorrosion } from "./usefulLifeRemainingCorrosion_cmp";
import { UsefulLife } from "./UsefulLife_cmp";

export function ACI() {
  const [indexSubMetho, setIndexSubMethod] = useState(0);

  // TODO
  // Esta funcion necesita ser refactorizada
  // o implementada de mejor manera que usando parametros numericos
  // no me gusta el enfoque que se usa para seleccionar el sub metodo de calculo
  function SwitchSubMethod() {
    if (indexSubMetho === 0) {
      return UsefulLifeRemainingCorrosion();
    } else if (indexSubMetho === 1) {
      return UsefulLifeRemainingAproximate();
    } else if (indexSubMetho === 2) {
      return UsefulLife();
    }
  }

  // el nombre de clase x se utiliza para mejor identificacion dentro de DevTools
  // y para probar estilos a aplicar sobre dicho div. En JSX no se puede devolver mas de un nodo
  return (
    <div className="x">
      <MethodSelectionACI
        onChangeMethdo={(subMethod) => setIndexSubMethod(subMethod)}
      ></MethodSelectionACI>

      {SwitchSubMethod()}
    </div>
  );
}

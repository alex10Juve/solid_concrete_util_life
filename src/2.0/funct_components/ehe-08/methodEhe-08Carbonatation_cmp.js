import { Form, Formik, ErrorMessage, Field } from "formik";
import { useState } from "react";
import * as YUP from "yup";
import DropdownComp from "../../stateless_components/dropdown_cmp";
import {
  Cair,
  Cenv,
  Coeffs,
  MetodoCarbonatacionTiEHE08,
  MetodoCarbonatacionTpEHE08,
  Vcorr,
} from "../../lib/methodEHE-08";

export function EHECarbonatation() {
  const [result, setResult] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const bridgeToCair = [
    { key: "Seleccione", value: -1 },
    { key: "< 4.5%", value: 0 },
    { key: ">= 4.5%", value: 1 },
  ];

  const bridgeToCoeffs = [
    { key: "Seleccione", value: -1 },
    { key: "Cemento Portland", value: 0 },
    { key: "Cemento Portland + 28% cenizas volantes", value: 1 },
    { key: "Cemento Portland + 9% humo de silice", value: 2 },
    { key: "Cemento Portland + 65% escorias", value: 3 },
  ];

  const bridgeToCenv = [
    { key: "Seleccione", value: -1 },
    { key: "Protegido de la lluvia", value: 0 },
    { key: "Expuesto a la lluvia", value: 1 },
  ];

  const bridgeToVCorr = [
    { key: "Seleccione", value: -1 },
    { key: "Normal-humedad alta", value: 0 },
    { key: "Normal-humedad media", value: 1 },
    { key: "Marina-aerea", value: 2 },
    { key: "Marina-sumergida", value: 3 },
    { key: "Marina-zonas de marea", value: 4 },
    { key: "Cloruros de origenes diferentes", value: 5 },
  ];

  const initialValues = {
    cover: 0,
    shieldRatio: 0,
    cb: -1,
    agingTime: 0,
    fck: 0,
    vcorr: -1, // table
    cenv: -1, // table
    coeffs: -1, // table
    cair: -1, // table
  };

  const validationSchema = YUP.object({
    // cover: YUP.number("Recubrimiento debe ser especificado").positive(
    //   "Debe ser mayor que cero"
    // ),
    // shieldRatio: YUP.number("Recubrimiento debe ser especificado").positive(
    //   "Debe ser mayor que cero"
    // ),
    // cb: YUP.number("Recubrimiento debe ser especificado").positive(
    //   "Debe ser mayor que cero"
    // ),
    // agingTime: YUP.number("Recubrimiento debe ser especificado").positive(
    //   "Debe ser mayor que cero"
    // ),
    // fck: YUP.number("Fck debe ser especificado").positive(
    //   "Debe ser mayor que cero"
    // ),
    // vcorr: YUP.number().required().min(0, "Debe ser especificado"),
    // cenv: YUP.number().required().min(0, "Debe ser especificado"),
    // coeffs: YUP.number().required().min(0, "Debe ser especificado"),
    // cair: YUP.number().required().min(0, "Debe ser especificado"),
  });

  return (
    <div className="container-sm my-3">
      <div className="row d-flex flex-column align-content-center">
        <div className="col-sm-2 d-flex">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(fields) => {
              const ti = MetodoCarbonatacionTiEHE08(
                Cenv[fields.cenv].value,
                Cair[fields.cair].value,
                Coeffs[fields.coeffs].a,
                Coeffs[fields.coeffs].a,
                fields.fck,
                fields.cover
              );
              console.log("TI=> " + ti);
              const tp = MetodoCarbonatacionTpEHE08(
                fields.shieldRatio,
                fields.cover,
                Vcorr[fields.vcorr].value
              );
              console.log("Tp=> " + tp);
              setResult(ti + tp);
              setCalculated(true);
            }}
          >
            <Form>
              <DropdownComp
                items={bridgeToCair}
                nameField="cair"
                header="Cair"
              ></DropdownComp>

              <DropdownComp
                items={bridgeToCenv}
                nameField="cenv"
                header="Cb%"
              ></DropdownComp>

              <DropdownComp
                items={bridgeToCoeffs}
                nameField="coeffs"
                header="Coeficientes"
              ></DropdownComp>

              <DropdownComp
                items={bridgeToVCorr}
                nameField="vcorr"
                header="Vcorr%"
              ></DropdownComp>

              <div className="form-floating mb-sm-3">
                <Field id="fck" name="fck" className="form-control"></Field>
                <ErrorMessage name="fck">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label htmlFor="fck" className="small">
                  Fck
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field
                  id="shieldRatio"
                  name="shieldRatio"
                  className="form-control"
                ></Field>
                <ErrorMessage name="shieldRatio">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label htmlFor="shieldRatio" className="small">
                  Diametro armadura (mm)
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field
                  id="agingTime"
                  name="agingTime"
                  className="form-control"
                ></Field>
                <ErrorMessage name="agingTime">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label htmlFor="agingTime" className="small">
                  Tiempo de envejecimiento
                </label>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn  btn-outline-secondary btn-sm"
                >
                  Calcular
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="row d-flex flex-column align-content-center my-3">
        {calculated && (
          <div className=" col-sm-3 d-flex">
            <h6>Tiempo estimado: </h6>
            <div className="d-flex mx-1">
              <h6>{result}</h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

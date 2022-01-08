import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as YUP from "yup";
import DropdownComp from "../../stateless_components/dropdown_cmp";
import {
  MetodoPenetracionClorurosTiEHE08,
  MetodoPenetracionClorurosTpEHE08,
  Cth,
  GeneralExpositionClass,
  TypeCementEHE08Chloride,
  Vcorr,
} from "../../lib/methodEHE-08";

const bridgeToTypeCement = [
  { key: "Seleccione", value: -1 },
  { key: "Cemento Portland", value: 0 },
  { key: "Cemento Portland + 28% cenizas volantes", value: 1 },
  { key: "Cemento Portland + 65% escorias", value: 2 },
];

const bridgeToVCorr = [
  { key: "Seleccione", value: -1 },
  { key: "Normal-humedad alta", nomeclature: "IIa", value: 0 },
  { key: "Normal-humedad media", nomeclature: "IIb", value: 1 },
  { key: "Marina-aerea", nomeclature: "IIIa", value: 2 },
  { key: "Marina-sumergida", nomeclature: "IIIb", value: 3 },
  { key: "Marina-zonas de marea", nomeclature: "IIIc", value: 4 },
  {
    key: "Cloruros de orgines diferentes",
    nomeclature: "IV",
    value: 5,
  },
];

const bridgeToAc = [
  { key: "Seleccione", value: -1 },
  { key: "a/c = 0.4", value: 0 },
  { key: "a/c = 0.45", value: 1 },
  { key: "a/c = 0.50", value: 2 },
  { key: "a/c = 0.55", value: 3 },
  { key: "a/c = 0.60", value: 4 },
];

const bridgeToGeneralExpositionClass = [
  { key: "Seleccione", value: -1 },
  { key: "Marina area (d < 500m)", value: 0 },
  { key: "Marina area (500m < d < 5000m)", value: 1 },
  { key: "Marina sumergida ", value: 2 },
  { key: "Marina en zonas de marea ", value: 3 },
  { key: "Con cloruros de origen diferente al medio marino", value: 4 },
];

const bridgeToCth = [
  { key: "Seleccione", value: -1 },
  { key: "Para estructuras de hormigon armado", value: 0 },
  { key: "Para estructuras de hormigon pretensado", value: 1 },
  { key: "Introducir valor", value: 2 },
];

function EHE08Chloride() {
  const [result, setResult] = useState(0);
  const [calculated, setCalculated] = useState(false);
  const [chtMode, setCthMode] = useState("table");
  const initialValues = {
    cover: 0, // input
    t: 0, // input
    shieldRatio: 0, // input
    cb: 0, // input
    cthInput: 0,
    cth: -1, // table
    tcement: -1, // table
    generalExpositionClass: -1, //table
    ac: -1, // table
    vcorr: -1, // table
  };

  const validationSchema = YUP.object({
    cover: YUP.number()
      .required("Recubrimiento debe ser especificado")
      .positive("Debe ser mayor que cer0"),
    t: YUP.number()
      .required("T debe ser especificado")
      .positive("Debe ser mayor que cer0"),
    shieldRatio: YUP.number()
      .required("Diametro debe ser especificado")
      .positive("Debe ser mayor que cero"),
    cb: YUP.number()
      .required("Debe ser especificado")
      .positive("Debe ser mayor que cero"),
    tcement: YUP.number().required(
      "El tipo de cemento necesita ser especificado"
    ),
    // TODO
    // make a correct validation for cthInput.... is ony valid when is selected as input value
    cthInput: YUP.number(),
    vcorr: YUP.number().required("Debe ser especficado"),
    cth: YUP.number().required("Debe ser especficado"),
    ac: YUP.number().required("Debe ser especficado"),
    generalExpositionClass: YUP.number().required("Debe ser especficado"),
  });

  return (
    <div className="container-sm  my-3">
      <div className="row d-flex flex-column align-content-center">
        <div className="col-sm-2 d-flex">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(fields) => {
              const dt0 = () => {
                if (fields.ac === 0)
                  return TypeCementEHE08Chloride[fields.tcement].ac40;
                else if (fields.ac === 1)
                  return TypeCementEHE08Chloride[fields.tcement].ac45;
                else if (fields.ac === 2)
                  return TypeCementEHE08Chloride[fields.tcement].ac50;
                else if (fields.ac === 3)
                  return TypeCementEHE08Chloride[fields.tcement].ac55;
                else return TypeCementEHE08Chloride[fields.tcement].ac60;
              };

              const cth =
                chtMode === "input" ? fields.cthInput : Cth[fields.cth].value;

              const ti = MetodoPenetracionClorurosTiEHE08(
                fields.cover,
                fields.t,
                fields.cb,
                cth,
                GeneralExpositionClass[fields.generalExpositionClass].value,
                dt0()
              );

              const tp = MetodoPenetracionClorurosTpEHE08(
                fields.shieldRatio,
                fields.cover,
                Vcorr[fields.vcorr].value
              );

              // console.log("Cb  ->" + fields.cb);
              // console.log("T  ->" + fields.t);
              // console.log("Cover  ->" + fields.cover);
              // console.log(
              //   "Clase de exposicion  ->" +
              //     GeneralExpositionClass[fields.generalExpositionClass].value
              // );
              // console.log("Cth  ->" + Cth[fields.cth].value);
              // console.log("DT0 -> " + dt0());

              // console.log("TI ->" + ti);
              // console.log("TP ->" + tp);
              setResult(ti + tp);
              setCalculated(true);
            }}
          >
            <Form>
              <div className="form-floating mb-sm-3">
                <Field id="cover" name="cover" className="form-control"></Field>
                <ErrorMessage name="cover">
                  {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                </ErrorMessage>
                <label htmlFor="cover" className="small">
                  Recubrimiento(mm)
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field
                  id="shieldRatio"
                  name="shieldRatio"
                  className="form-control"
                ></Field>
                <ErrorMessage name="shieldRatio">
                  {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                </ErrorMessage>
                <label htmlFor="shieldRatio" className="small">
                  Diametro de la armadura(mm)
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field id="t" name="t" className="form-control"></Field>
                <ErrorMessage name="t">
                  {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                </ErrorMessage>
                <label htmlFor="t" className="small">
                  Tiempo(años)
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field id="cb" name="cb" className="form-control"></Field>
                <ErrorMessage name="cb">
                  {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                </ErrorMessage>
                <label htmlFor="cb" className="small">
                  Cb(%)
                </label>
              </div>
              <DropdownComp
                items={bridgeToAc}
                nameField="ac"
                header={"Relacion agua/cemento"}
              ></DropdownComp>
              <DropdownComp
                items={bridgeToTypeCement}
                nameField="tcement"
                header={"Tipo de cemento"}
              ></DropdownComp>
              <DropdownComp
                items={bridgeToCth}
                nameField="cth"
                header={"Cth"}
                onClick={(e) => {
                  if (e.currentTarget.value === "2") {
                    setCthMode("input");
                  } else {
                    setCthMode("table");
                  }
                }}
              ></DropdownComp>
              {chtMode === "input" && (
                <div className="form-floating mb-sm-3">
                  <Field
                    id="cthInput"
                    name="cthInput"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="cthInput">
                    {(erroMsg) => (
                      <div className="error-message">{erroMsg}</div>
                    )}
                  </ErrorMessage>
                  <label htmlFor="cthInput" className="small">
                    Cth
                  </label>
                </div>
              )}
              <DropdownComp
                items={bridgeToGeneralExpositionClass}
                nameField="generalExpositionClass"
                header={"Clase de exposicion"}
              ></DropdownComp>
              <DropdownComp
                items={bridgeToVCorr}
                nameField="vcorr"
                header="Vcorr"
              ></DropdownComp>
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

export default EHE08Chloride;

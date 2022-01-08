import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as YUP from "yup";
import {
  CalculateTi,
  CalculateTp,
  ExposicionPorClorurosParaFactorAmbiental,
  TipoCemento,
} from "../../lib/methodCarmenAndrade";

export function CarmenAndrade() {
  const [result, setResult] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const initialValues = {
    cover: 0,
    // initializationTime: 0,
    resistivity: 0,
    tInput: 0,
    t0: 0,
    typeCement: 0,
    ambientalFactor: 0,
  };

  const validationSchema = YUP.object({
    cover: YUP.number()
      .required("Recubrimiento debe ser especificado")
      .positive("Debe ser mayor que cero"),
    // initializationTime: YUP.number("Invalido")
    //   .required("C(x,t) debe ser especificado")
    //   .positive("Debe ser mayor que cero"),
    resistivity: YUP.number("Invalido")
      .required("Ci debe ser especificado")
      .positive("Debe ser mayor que cero"),
    tInput: YUP.number("Invalido")
      .required("Ac debe ser especificado")
      .positive("Debe ser mayor que cero"),
    t0: YUP.number("Invalido")
      .required("T0 debe ser especificado")
      .positive("Debe ser mayor que cero"),
    typeCement: YUP.number("Invalido").required(
      "Tipo cemento debe ser especificado"
    ),
    ambientalFactor: YUP.number("Invalido").required(
      "Factor ambiental debe ser especificado"
    ),
  });

  const bridgeToTypeCement = [
    { key: "Tipo A", value: 0 },
    { key: "Tipo B", value: 1 },
    { key: "Tipo C", value: 2 },
  ];

  const bridgeToAmbientalFactor = [
    { key: "XS1-a", value: 0 },
    { key: "XS1-b", value: 1 },
    { key: "XS2", value: 2 },
    { key: "XS3", value: 3 },
  ];

  return (
    <div className="container-sm my-3">
      <div className="row d-flex flex-column align-content-center">
        <div className="col-sm-2 d-flex">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(fields) => {
              const TP = CalculateTp(
                fields.resistivity,
                fields.tInput,
                fields.t0,
                TipoCemento[fields.typeCement].q.value
              );
              const TI = CalculateTi(
                fields.cover,
                fields.resistivity,
                fields.tInput,
                fields.t0,
                TipoCemento[fields.typeCement].q.value,
                TipoCemento[fields.typeCement].rcl.value,
                ExposicionPorClorurosParaFactorAmbiental[fields.ambientalFactor].fa.value
              );
              setResult(TP + TI);
              setCalculated(true);
            }}
            // onReset={(fields) => {
            //   fields.cover = 0;
            //   fields.initializationTime = 0;
            //   fields.resistivity = 0;
            //   fields.tInput = 0;
            //   fields.t0 = 0;
            //   fields.typeCement = 0;
            //   fields.ambientalFactor = 0;
            //   setCalculated(false);
            // }}
          >
            <Form>
              <div className="form-floating mb-sm-3">
                <Field id="cover" name="cover" className="form-control"></Field>
                <ErrorMessage name="cover">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label htmlFor="cover" className="small">
                  Recubrimiento(cm)
                </label>
              </div>
              {/* <div className="form-floating mb-sm-3">
                <Field
                  id="initializationTime"
                  name="initializationTime"
                  className="form-control"
                ></Field>
                <ErrorMessage name="initializationTime">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label htmlFor="initializationTime" className="small">
                  Tiempo de iniciacion
                </label>
              </div> */}
              <div className="form-floating mb-sm-3">
                <Field
                  id="resistivity"
                  name="resistivity"
                  className="form-control"
                ></Field>
                <ErrorMessage name="resistivity">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label htmlFor="resistivity" className="small">
                  Resistividad
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field
                  id="tInput"
                  name="tInput"
                  className="form-control"
                ></Field>
                <ErrorMessage name="tInput">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label htmlFor="tInput" className="small">
                  T(años)
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field id="t0" name="t0" className="form-control"></Field>
                <ErrorMessage name="t0">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label htmlFor="t0" className="small">
                  T0(años)
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field
                  as="select"
                  id="typeCement"
                  name="typeCement"
                  className="form-control"
                >
                  {bridgeToTypeCement.map((type) => {
                    return (
                      <option key={type.value} value={type.value}>
                        {type.key}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="typeCement">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label className="small dropdown-toggle" htmlFor="typeCement">
                  Tipo cemento
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field
                  as="select"
                  id="ambientalFactor"
                  name="ambientalFactor"
                  className="form-control"
                >
                  {bridgeToAmbientalFactor.map((type) => {
                    return (
                      <option key={type.value} value={type.value}>
                        {type.key}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="ambientalFactor"></ErrorMessage>
                <label
                  className="small dropdown-toggle"
                  htmlFor="ambientalFactor"
                >
                  Factor ambiental
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

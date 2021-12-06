import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as YUP from "yup";
import { SearchValue, CalculateD28, CalculateTt } from "../../lib/methodACI-365";

// TODO:
// Especificar unidades de medidas correspondientes a cada campo
// Reinicar formulario
export function UsefulLife() {
  const [result, setResult] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const validationSchema = YUP.object({
    cover: YUP.number()
      .required("Recubrimiento debe ser especificado")
      .positive("Debe ser mayor que 0"),
    c0: YUP.number()
      .required("C0 debe ser especificado")
      .positive("Debe ser mayor que 0"),
    cxt: YUP.number()
      .required("C(x,t) debe ser especificado")
      .positive("Debe ser mayor que 0"),
    ci: YUP.number()
      .required("Ci debe ser especificado")
      .positive("Debe ser mayor que 0"),
    ac: YUP.number()
      .required("Ac debe ser especificado")
      .positive("Debe ser mayor que 0"),
  });

  const initialValues = {
    cover: 0,
    c0: 0,
    cxt: 0,
    ci: 0,
    ac: 0,
  };

  return (
    <div className="container-sm  my-3">
      <div className="row d-flex flex-column align-content-center">
        <div className="col-sm-2 d-flex">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(fields) => {
              console.log("SUBMIT");
              const erf =
                1 - (fields.cxt - fields.ci) / (fields.c0 - fields.ci);
              const z = SearchValue(erf);
              const D28 = CalculateD28(fields.ac);
              setResult(CalculateTt(D28, z, fields.cover));
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
                  Recubrimiento
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field id="c0" name="c0" className="form-control"></Field>
                <ErrorMessage name="c0">
                  {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                </ErrorMessage>
                <label htmlFor="c0" className="small">
                  C0
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field id="ci" name="ci" className="form-control"></Field>
                <ErrorMessage name="ci">
                  {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                </ErrorMessage>
                <label htmlFor="ci" className="small">
                  Ci
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field id="cxt" name="cxt" className="form-control"></Field>
                <ErrorMessage name="cxt">
                  {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                </ErrorMessage>
                <label htmlFor="cxt" className="small">
                  C(x,t)
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field id="ac" name="ac" className="form-control"></Field>
                <ErrorMessage name="ac">
                  {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                </ErrorMessage>
                <label htmlFor="ac" className="small">
                  Ac
                </label>
              </div>
              {/* <div className="form-group">
                  <button
                    type={!calculated ? "submit" : "reset"}
                    className="btn  btn-outline-secondary btn-sm"
                  >
                    {!calculated ? "Calcular" : "Limpiar"}
                  </button>
                </div> */}
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

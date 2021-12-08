import React from "react";
import { useState } from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as YUP from "yup";
import { SearchValue} from "../../lib/methodACI-365";
// TODO:
// Especificar unidades de medidas correspondientes a cada campo
// Reiniciar formulario

export function UsefulLifeRemainingAproximate() {
  const [result, setResult] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const initialValues = {
    cover: 0,
    c0: 0,
    cxt: 0,
    dif: 0,
  };

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
    dif: YUP.number()
      .required("Ac debe ser especificado")
      .positive("Debe ser mayor que 0"),
  });

  return (
    <div className="container-sm  my-3">
      <div className="row d-flex flex-column align-content-center">
        <div className="col-sm-2 d-flex">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(fields) => {
              const erf = 1 - fields.cxt / fields.c0;
              const z = SearchValue(erf);
              const calc =
                Math.pow(fields.cover, 2) / (4 * Math.pow(z, 2) * fields.dif);
              setResult(calc);
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
                <Field id="cxt" name="cxt" className="form-control"></Field>
                <ErrorMessage name="c0">
                  {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                </ErrorMessage>
                <label htmlFor="cxt" className="small">
                  Cxt
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field id="dif" name="dif" className="form-control"></Field>
                <ErrorMessage name="c0">
                  {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                </ErrorMessage>
                <label htmlFor="dif" className="small">
                  Difusion
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

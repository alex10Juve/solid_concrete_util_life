import React from "react";
import { useState } from "react";
import { Formik,ErrorMessage,Field,Form } from "formik";
import * as YUP from "yup";
//TODO
// El calculo requiere de la entrada de iCorr o de resistiivdad
// Solo es necesario recoger una de las dos entradas.
// Ajustar caracteres especiales(poner el caracter griego de phi... por ejemplo)
export function UsefulLifeRemainingCorrosion() {
    const [result, setResult] = useState(0);
    const [calculated, setCalculated] = useState(false);
  
    const initialValues = {
      phi_t: 0,
      phi_initial: 0,
      iCorr: 0,
      resistivity: 0,
    };
  
    const validationSchema = YUP.object({
      phi_t: YUP.number("Debe ser especificado").positive(
        "Debe ser mayor que cero"
      ),
      phi_initial: YUP.number("Debe ser especificado").positive(
        "Debe ser mayor que cero"
      ),
      iCorr: YUP.number("Debe ser especificado").positive(
        "Debe ser mayor que cero"
      ),
      resistivity: YUP.number("Debe ser especificado").positive(
        "Debe ser mayor que cero"
      ),
    });
  
    return (
      <div className="container-sm  my-3">
        <div className="row d-flex flex-column align-content-center">
          <div className="col-sm-2 d-flex">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(fields) => {
                const calc =
                  fields.phi_initial - fields.phi_t / (0.023 * fields.iCorr);
                setResult(calc);
                setCalculated(true);
                // TODO implematar seleccion de variable iCorr o durabilidad.
                const icorr = 26 / fields.resistivity; // EQUIVALENCIA EN LA FORMULA
              }}
            >
              <Form>
                <div className="form-floating mb-sm-3">
                  <Field id="phi_t" name="phi_t" className="form-control"></Field>
                  <ErrorMessage name="phi_t">
                    {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                  </ErrorMessage>
                  <label htmlFor="phi_t" className="small">
                    Phi(t)
                  </label>
                </div>
                <div className="form-floating mb-sm-3">
                  <Field
                    id="phi_initial"
                    name="phi_initial"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="phi_initial">
                    {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                  </ErrorMessage>
                  <label htmlFor="phi_initial" className="small">
                    Phi<small>0</small>(mm)
                  </label>
                </div>
                <div className="form-floating mb-sm-3">
                  <Field id="iCorr" name="iCorr" className="form-control"></Field>
                  <ErrorMessage name="iCorr">
                    {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                  </ErrorMessage>
                  <label htmlFor="iCorr" className="small">
                    Velocidad de corrosion
                  </label>
                </div>
                <div className="form-floating mb-sm-3">
                  <Field
                    id="resistivity"
                    name="resistivity"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="resistivity">
                    {(erroMsg) => <div className="error-message">{erroMsg}</div>}
                  </ErrorMessage>
                  <label htmlFor="resistivity" className="small">
                    Resistividad
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
  
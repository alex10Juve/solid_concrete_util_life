import { Form, Formik, ErrorMessage, Field } from "formik";
import { useState } from "react";
import * as YUP from "yup";

export function EHECarbonatation() {
  const [result, setResult] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const bridgeToCair = [
    { key: "< 4.5%", value: 0 },
    { key: ">= 4.5%", value: 1 },
  ];

  const bridgeToCoeffs = [
    { key: "Cemento Portland", value: 0 },
    { key: "Cemento Portland + 28% cenizas volantes", value: 1 },
    { key: "Cemento Portland + 9% humo de silice", value: 2 },
    { key: "Cemento Portland + 65% escorias", value: 3 },
  ];

  const bridgeToCenv = [
    { key: "Protegido de la lluvia", value: 0 },
    { key: "Expuesto a la lluvia", value: 1 },
  ];

  const bridgeToVCorr = [
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
    cb: 0,
    vcorr: 0,
    cenv: 0,
    coeffs: 0,
    cair: 0,
    agingTime: 0,
  };

  const validationSchema = YUP.object({
    cover: YUP.number("Recubrimiento debe ser especificado").positive(
      "Debe ser mayor que cero"
    ),
    shieldRatio: YUP.number("Recubrimiento debe ser especificado").positive(
      "Debe ser mayor que cero"
    ),
    cb: YUP.number("Recubrimiento debe ser especificado").positive(
      "Debe ser mayor que cero"
    ),
    agingTime: YUP.number("Recubrimiento debe ser especificado").positive(
      "Debe ser mayor que cero"
    ),
  });

  return (
    <div className="container-sm my-3">
      <div className="row d-flex flex-column align-content-center">
        <div className="col-sm-2 d-flex">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(fields) => {
              console.log(fields.fck);
              console.log(fields.vcorr);
              console.log(fields.shieldRatio);
            }}
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
              <div className="form-floating mb-sm-3">
                <Field id="cb" name="cb" className="form-control"></Field>
                <ErrorMessage name="cb">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label htmlFor="cb" className="small">
                  Cb(%)
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field
                  id="shielRatio"
                  name="shielRatio"
                  className="form-control"
                ></Field>
                <ErrorMessage name="shielRatio">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label htmlFor="shielRatio" className="small">
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
              <div className="form-floating mb-sm-3">
                <Field
                  as="select"
                  id="coeffs"
                  name="coeffs"
                  className="form-control"
                >
                  {bridgeToCoeffs.map((type) => {
                    return (
                      <option key={type.value} value={type.value}>
                        {type.key}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="coeffs">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label className="small dropdown-toggle" htmlFor="coeffs">
                  Tipo cemento
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field
                  as="select"
                  id="vcorr"
                  name="vcorr"
                  className="form-control"
                >
                  {bridgeToVCorr.map((type) => {
                    return (
                      <option key={type.value} value={type.value}>
                        {type.key}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="vcorr">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label className="small dropdown-toggle" htmlFor="vcorr">
                  Cs
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                <Field
                  as="select"
                  id="cenv"
                  name="cenv"
                  className="form-control"
                >
                  {bridgeToCenv.map((type) => {
                    return (
                      <option key={type.value} value={type.value}>
                        {type.key}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="cenv">
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label className="small dropdown-toggle" htmlFor="cenv">
                  Cs
                </label>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

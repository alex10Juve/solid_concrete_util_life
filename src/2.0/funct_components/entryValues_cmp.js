import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Field, Form, useFormik } from "formik";
import {
  SearchValue,
  CalcuateTp,
  CalculateTi,
  CalculateD28,
  CalculateTt,
} from "../lib/methodACI-365";
export function EntryValues({ method, fields }) {
  function SwitchEntry() {
    if (method === "CA") return EntryValuesCarmenAndrade();
    else if (method === "EHE-08") return EntryEHE();
    else if (method === "ACI-365") return EntryACI();
    // refactorization needed
    else throw new Error("INVALID METHOD");
  }
  return SwitchEntry();
}

function EntryValuesCarmenAndrade() {
  const [result, setResult] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const validateInputFields = (values) => {
    const errors = {};
    if (!values.cover) errors.cover = "Campo requerido";
    else if (values.cover <= 0) errors.cover = "Invalido";

    if (!values.initializationTime)
      errors.initializationTime = "Campo requerido";
    else if (values.initializationTime <= 0)
      errors.initializationTime = "Invalido";

    if (!values.resistivity) errors.resistivity = "Campo requerido";
    else if (values.resistivity <= 0) errors.resistivity = "Invalido";

    if (!values.agingTime) errors.agingTime = "Campo requerido";
    else if (values.agingTime <= 0) errors.agingTime = "Invalido";

    return errors;
  };

  const formikInput = useFormik({
    initialValues: {
      cover: 0,
      initializationTime: 1,
      resistivity: 0,
      agingTime: 0,
      cementTypeIndex: 0,
      ambientalFactorByChlorideIndex: 0,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="container-sm my-3">
      {/* <div className="row d-flex flex-column align-content-center">
        <div className="col-sm-2 d-flex">
          <form
            onSubmit={formikInput.handleSubmit}
            className="d-flex flex-column"
          >
            <div className="form-floating mb-sm-3">
              <input
                className="form-control "
                id="cover"
                name="cover"
                type="number"
                onChange={formikInput.handleChange}
                onBlur={formikInput.handleBlur}
                value={formikInput.values.cover}
              ></input>
              <label className="small" htmlFor="cover">
                Recubrimiento
              </label>
            </div>

            <div className="form-floating mb-sm-3">
              <input
                className="form-control "
                id="initializationTime"
                name="initializationTime"
                type="number"
                onChange={formikInput.handleChange}
                onBlur={formikInput.handleBlur}
                value={formikInput.values.initializationTime}
              ></input>
              <label className="small" htmlFor="initializationTime">
                Tiempo de iniciacion
              </label>
            </div>

            <div className="form-floating mb-sm-3">
              <input
                className="form-control "
                id="resistivity"
                name="resistivity"
                type="number"
                onChange={formikInput.handleChange}
                onBlur={formikInput.handleBlur}
                value={formikInput.values.resistivity}
              ></input>
              <label className="small" htmlFor="resistivity">
                Resistividad
              </label>
            </div>

            <div className="form-floating mb-sm-3">
              <input
                className="form-control "
                id="agingTime"
                name="agingTime"
                type="number"
                onChange={formikInput.handleChange}
                onBlur={formikInput.handleBlur}
                value={formikInput.values.agingTime}
              ></input>
              <label className="small" htmlFor="agingTime">
                Tiempo de envejecimiento
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="row d-flex align-content-center justify-content-center">
        <div className="col-sm-2 d-flex ">
          <button
            type="button"
            className="btn  btn-outline-secondary btn-sm mx-auto"
          >
            Calcular
          </button>
        </div>
      </div> */}
    </div>
  );
}

function EntryEHE() {
  return <div>{/* TODO */}</div>;
}

function EntryACI() {
  const [result, setResult] = useState(0);
  const [calculated, setCalculated] = useState(false);
  const validateInputFields = (values) => {
    const errors = {};
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      cover: 0,
      c0: 0,
      ci: 0,
      ac: 0,
      cxt: 0,
    },
    validateInputFields,

    // onSubmit: (values) => {
    //   const val = 1 - (values.cxt - values.ci) / (values.c0 - values.ci);
    //   const z = SearchValue(val);
    //   const d28 = CalculateD28(values.ac);
    //   alert(val);
    //   console.log(values.cxt);
    //   console.log(values.ci);
    //   console.log(values.c0);
    //   console.log(val);
    //   setResult(CalculateTt(d28, z, values.cover));
    //   console.log(result);
    //   setCalculated(true);
    // },
  });

  function CalculateResult() {
    const val = 1 - (formik.values.cxt - formik.values.ci) / (formik.values.c0 - formik.values.ci);
    const z = SearchValue(val);
    const d28 = CalculateD28(formik.values.ac);
    setResult(CalculateTt(d28, z, formik.values.cover));
    setCalculated(true);
    console.log("Z" + z.toString());
  }


  return (
    <div className="container-sm  my-3">
      <div className="row d-flex flex-column align-content-center">
        <div className="col-sm-2 d-flex">
          {/* <Formik initialValues={
            {
              cover: 0,
              c0: 0,
              ci: 0,
              ac: 0,
              cxt: 0,
            }
          } onSubmit={(values) => {
            try {
              let val = 1 - (values.cxt - values.ci) / (values.c0 - values.ci);
              let z = SearchValue(val);
              let d28 = CalculateD28(values.ac);
              console.log(values.cxt);
              console.log(values.ci);
              console.log(values.c0);
              console.log(val);
              setResult(CalculateTt(d28, z, values.cover));
              setCalculated(true);
            }
            catch (err) {
              alert(err);
            }
          }}> */}
            <form className="d-flex flex-column">
              <div className="form-floating mb-sm-3">
                {/* <label className="small" htmlFor="cxt">
                  C(x,t)
                </label>
                <Field name="cxt" id="cxt" type="number" placeholder="0">

                </Field> */}
                <input
                  className="form-control"
                  id="cxt"
                  name="cxt"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cxt}
                ></input>
                <label className="small" htmlFor="cxt">
                  C(x,t)
                </label>
              </div>

              <div className="form-floating mb-sm-3">
                {/* <label className="small" htmlFor="cover">
                  Recubrimiento
                </label>
                <Field name="cover" id="cover" placeholder="0" type="number">

                </Field> */}
                <input
                  className="form-control"
                  id="cover"
                  name="cover"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cover}
                ></input>
                <label className="small" htmlFor="cover">
                  Recubrimiento
                </label>
              </div>

              <div className="form-floating mb-sm-3">
                {/* <label className="small" htmlFor="c0">
                  C0
                </label>
                <Field name="c0" id="c0" placeholder="0" type="number" /> */}

                <input
                  className="form-control"
                  id="c0"
                  name="c0"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.c0}
                ></input>
                <label className="small" htmlFor="c0">
                  C0
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                {/* <label className="small" htmlFor="ci">
                  Ci
                </label>
                <Field name="ci" id="ci" placeholder="0" type="number">

                </Field> */}
                <input
                  className="form-control"
                  id="ci"
                  name="ci"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ci}
                ></input>
                <label className="small" htmlFor="ci">
                  Ci
                </label>
              </div>
              <div className="form-floating mb-sm-3">
                {/* <label className="small" htmlFor="ac">
                  Ac
                </label>
                <Field name="ac" id="ac" placeholder="0" type="number">

                </Field> */}
                <input
                  className="form-control"
                  id="ac"
                  name="ac"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ac}
                ></input>
                <label htmlFor="ac">Ac</label>
              </div>
              <button
                type="button"
                className="btn  btn-outline-secondary btn-sm mx-auto"
                onClick={CalculateResult}
              >
                Calcular
              </button>
            </form>
          {/* </Formik> */}
        </div>
      </div>
      <div className="row d-flex align-content-center justify-content-center">
        {calculated && <h5>{result} (365 d)</h5>}
      </div>
    </div>
  );
}

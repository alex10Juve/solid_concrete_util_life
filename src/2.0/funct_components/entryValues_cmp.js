import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";

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
      <div className="row d-flex flex-column align-content-center">
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
            class="btn  btn-outline-secondary btn-sm mx-auto"
          >
            Calcular
          </button>
        </div>
      </div>
    </div>
  );
}

function EntryEHE() {
  return <div>{/* TODO */}</div>;
}

function EntryACI() {
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

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="container-sm  my-3">
      <div className="row d-flex flex-column align-content-center">
        <div className="col-sm-2 d-flex">
          <form className="d-flex flex-column">
            <div className="form-floating mb-sm-3">
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
              <input
                className="form-control"
                id="c0"
                name="c0"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.c0}
              ></input>
              <label className="small" htmlFor="C0">
                C0
              </label>
            </div>
            <div className="form-floating mb-sm-3">
              <input
                className="form-control"
                id="Ci"
                name="Ci"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ci}
              ></input>
              <label className="small" htmlFor="Ci">
                Ci
              </label>
            </div>
            <div className="form-floating mb-sm-3">
              <input
                className="form-control"
                id="Ac"
                name="Ac"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ac}
              ></input>
              <label htmlFor="Ac">Ac</label>
            </div>
          </form>
        </div>
      </div>
      <div className="row d-flex align-content-center justify-content-center">
        <div className="col-sm-2 d-flex ">
          <button
            type="button"
            class="btn  btn-outline-secondary btn-sm mx-auto"
          >
            Calcular
          </button>
        </div>
      </div>
    </div>
  );
}

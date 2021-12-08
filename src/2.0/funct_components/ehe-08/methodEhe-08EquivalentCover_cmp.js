import React from "react";
import { Formik, Field, ErrorMesagge, Form } from "formik";
import * as YUP from "yup";

function EHE08EquivalentCover(props) {
  const initialValues = {
    cover:0,
    speedCarbonatation:0,
    
  }
    return (
    <div className="container-sm  my-3">
      <div className="row d-flex flex-column align-content-center">
        <div className="col-sm-2 d-flex">
          <Formik>

          </Formik>
        </div>
      </div>
    </div>
  );
}

export default EHE08EquivalentCover;

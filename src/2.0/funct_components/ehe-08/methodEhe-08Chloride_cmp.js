import React from "react";
import { Formik, Field, ErrorMesagge, Form } from "formik";
import * as YUP from "yup";

function EHE08Chloride(props) {
  const initialValues = {

  }

  const validationSchema = YUP.object({

  });
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

export default EHE08Chloride;

import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as YUP from "yup";
import DropdownComp from "../../stateless_components/dropdown_cmp";
import RadioButtons from "../../stateless_components/radio_cmp";
import {
  Capilarity,
  SpeedCarbonationTable,
  SpeedChloridePenetration,
} from "../../lib/methodEHE-08";

function EHE08EquivalentCover(props) {
  const [model, setModel] = useState({});
  const [result, setResult] = useState();
  const [calculated, setCalculated] = useState(false);
  const initialValues = {
    cover: 0,
    speedCarbonatation: -1,
    generalExpositionClass: -1,
    speedChloridePenetration: -1,
    chlorideMethod: "",
    capilarity: 0,
  };

  const validationSchema = YUP.object({
    cover: YUP.number()
      .positive("Debe ser mayor que cero")
      .required("Debe ser especificado"),
  });

  const bridgeToGeneralExpositionClass = [
    { key: "Seleccione", value: -1 },
    { key: "Normal Humedad", value: 0 },
    { key: "Normal Humedad media", value: 1 },
    { key: "Marina Aerea", value: 2 },
  ];

  const bridgeToVCarbonatation = [
    { key: "Seleccione", value: -1 },
    { key: "<= 2,0", value: 0 },
    { key: "<= 1,0", value: 1 },
    { key: "<= 0,7", value: 2 },
    { key: "<= 0,5", value: 3 },
  ];

  const bridgeToCapilarity = [
    { key: "Seleccione", value: -1 },
    { key: "<= 0,40", value: 1 },
    { key: "<= 0,20", value: 2 },
    { key: "<= 0,15", value: 3 },
    { key: "<= 0,10", value: 4 },
  ];

  const bridgeToSpeedChloridePenetration = [
    { key: "Seleccione", value: 0 },
    { key: "<= 3,4", value: 1 },
    { key: "<= 1,7", value: 2 },
    { key: "<= 1,1", value: 3 },
    { key: "<= 0,9", value: 4 },
  ];

  return (
    <div className="container-sm  my-3">
      <div className="row d-flex flex-column align-content-center">
        <div className="col-sm-2 d-flex">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(fields) => {
              let lambda = 0;
              if (model.mainMethod && model.mainMethod === "Carbonatation") {
                lambda =
                  SpeedCarbonationTable[fields.speedCarbonatation].lambda;
              } else {
                if (model.mainMethod && model.mainMethod === "Chloride") {
                  if (model.subMethod && model.subMethod === "capilarity") {
                    lambda = Capilarity[fields.capilarity].lambda;
                  } else {
                    lambda =
                      SpeedChloridePenetration[fields.speedChloridePenetration]
                        .lambda;
                  }
                }
              }
              setResult(lambda * fields.cover);
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
              <DropdownComp
                nameField="generalExpositionClass"
                items={bridgeToGeneralExpositionClass}
                header="Clase de exposcion"
                onClick={(e) => {
                  switch (e.currentTarget.value) {
                    case "1":
                      setModel({ mainMethod: "Carbonatation" });
                      break;
                    case "0":
                      setModel({ mainMethod: "Carbonatation" });
                      break;
                    case "2":
                      setModel({ mainMethod: "Chloride" });
                      break;
                    default:
                      break;
                  }
                }}
              ></DropdownComp>
              {model.mainMethod && model.mainMethod === "Carbonatation" && (
                <DropdownComp
                  nameField="speedCarbonatation"
                  header="Velocidad de carbonatacion"
                  items={bridgeToVCarbonatation}
                ></DropdownComp>
              )}

              {model.mainMethod && model.mainMethod === "Chloride" && (
                <RadioButtons
                  label="Metodo de calculo"
                  options={[
                    { key: "Capilaridad", value: "capilarity" },
                    {
                      key: "Penetracion de cloruros",
                      value: "chloridePenetrarion",
                    },
                  ]}
                  nameField="chlorideMethod"
                  onChange={(e) => {
                    console.log(e.currentTarget.value);
                    setModel((prevModel) => ({
                      ...prevModel,
                      // eslint-disable-next-line no-useless-computed-key
                      ["subMethod"]: e.currentTarget.value,
                    }));
                  }}
                ></RadioButtons>
              )}
              {model.mainMethod &&
                model.mainMethod === "Chloride" &&
                model.subMethod &&
                model.subMethod === "capilarity" && (
                  <DropdownComp
                    items={bridgeToCapilarity}
                    nameField="capilarity"
                    header="Capilaridad"
                  ></DropdownComp>
                )}

              {model.mainMethod &&
                model.mainMethod === "Chloride" &&
                model.subMethod &&
                model.subMethod === "chloridePenetrarion" && (
                  <DropdownComp
                    items={bridgeToSpeedChloridePenetration}
                    nameField="speedChloridePenetration"
                    header="Velocidad de pentracion de cloruros"
                  ></DropdownComp>
                )}
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
        {calculated === true && (
          <div className=" col-sm-3 d-flex">
            <h6>Tiempo estimado: </h6>
            <div className="d-flex mx-1">
              <h6>{result} (mm)</h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EHE08EquivalentCover;

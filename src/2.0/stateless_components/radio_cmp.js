import { ErrorMessage, Field } from "formik";
import React from "react";

function RadioButtons(props) {
  const { label, nameField, options, ...prevs } = props;

  return (
    <div className="form-control  mb-sm-3">
      <label htmlFor={nameField} className="form-label small text-center">
        {label}
      </label>
      <div className="form-check form-check-inline mx-auto mb-sm-3">
        <Field
          name={nameField}
          id={nameField}
          {...prevs}
        >
          {({ field }) => {
            return options.map((option) => {
              return (
                <React.Fragment key={option.key}>
                  <label
                    className="form-check-label small"
                    htmlFor={option.value}
                  >
                    {option.key}
                  </label>
                  <input
                    type="radio"
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                    className="form-check-input"
                    onClick={prevs["onChange"]}
                  ></input>
                </React.Fragment>
              );
            });
          }}
        </Field>
      </div>
      <ErrorMessage name={nameField}>
        {(errorMsg) => <div className="error-message">{errorMsg}</div>}
      </ErrorMessage>
    </div>
  );
}

export default RadioButtons;

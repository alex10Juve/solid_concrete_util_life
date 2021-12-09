import React from 'react';
import {Field,ErrorMessage} from 'formik';

function DropdownComp(props) {
  const {items,nameField,header, ...prevs} = props
    return (
        <div className="form-floating mb-sm-3">
                <Field 
                  as="select"
                  id={nameField}
                  name={nameField}
                  className="form-control"
                  {...prevs}
                >
                  {items.map((type) => {
                    return (
                      <option className="small" key={type.value} value={type.value}>
                        {type.key}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name={nameField}>
                  {(errorMsg) => (
                    <div className="error-message">{errorMsg}</div>
                  )}
                </ErrorMessage>
                <label className="small dropdown-toggle" htmlFor={nameField}>
                  {header}
                </label>
              </div>
    );
}

export default DropdownComp;
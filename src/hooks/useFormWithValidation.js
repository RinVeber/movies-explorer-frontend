import React, { useCallback } from "react";

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (evt) => {

    const input = evt.target;
    const value = input.type == 'checkbox' ? input.checked : input.value;
    const name = input.name;

    if (name == "name") {
      localStorage.setItem('query', value || "");
    }

    if (name == "isShort") {
      localStorage.setItem('checkbox', value || false);
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });

    if (input.closest) {
      setIsValid(input.closest("form").checkValidity());
    }

  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, setIsValid, handleChange, resetForm, errors, isValid };
}
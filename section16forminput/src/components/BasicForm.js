import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const nameChecker = (value) => value.trim() !== "";
  const emailChecker = (value) => {
    const mailformat =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const enteredEmailIsValid = value.match(mailformat) ? true : false;
    return enteredEmailIsValid;
  };

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: firstNameReset,
  } = useInput(nameChecker);
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: lastNameReset,
  } = useInput(nameChecker);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: emailReset,
  } = useInput(emailChecker);

  const firstNameInputClasses = firstNameError
    ? "form-control invalid"
    : "form-control";
  const lastNameInputClasses = lastNameError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailError
    ? "form-control invalid"
    : "form-control";

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!firstNameIsValid || !lastNameIsValid || !emailIsValid) {
      return;
    }
    firstNameReset();
    lastNameReset();
    emailReset();
  };

  let formValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formValid = true;
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstNameValue}
            onBlur={firstNameInputBlurHandler}
            onChange={firstNameChangeHandler}
          />
          {firstNameError && (
            <p className="error-text">First Name must not be empty.</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastNameValue}
            onBlur={lastNameInputBlurHandler}
            onChange={lastNameChangeHandler}
          />
          {lastNameError && (
            <p className="error-text">Last Name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="email"
          id="name"
          value={emailValue}
          onBlur={emailInputBlurHandler}
          onChange={emailChangeHandler}
        />
        {emailError && <p className="error-text">Email must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

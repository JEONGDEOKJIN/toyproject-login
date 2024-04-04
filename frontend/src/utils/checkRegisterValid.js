const checkRegisterValid = (name, password, email) => {
  const errors = {};


  errors.isNameValid = name != null && name.trim() !== "";

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
  errors.isPasswordValid =
    password != null &&
    password.trim() !== "" &&
    passwordRegex.test(password.trim()); // 비어있지 않고, 정규식 통과하면 true

  // const emailValidRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; // 비어있지 않고, 정규식 통과하면 true
  const emailValidRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  // 비어있지 않고, 정규식 통과하면 true
  errors.isEmailValid =
    email !== null && email.trim() !== "" && emailValidRegex.test(email.trim()); // 비어있지 않고, 정규식 통과하면 true

  return errors;
};

export default checkRegisterValid;


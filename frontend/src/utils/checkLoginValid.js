const checkLoginValid = (email, password) => {
  const errors = {};

  errors.isPasswordValid = password != null && password.trim() !== "";
  
  const emailValidRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; // 비어있지 않고, 정규식 통과하면 true
  errors.isEmailValid = email !== null && email.trim() !== "" && emailValidRegex.test(email.trim()) ; // 비어있지 않고, 정규식 통과하면 true

  return errors;
};

export default checkLoginValid;


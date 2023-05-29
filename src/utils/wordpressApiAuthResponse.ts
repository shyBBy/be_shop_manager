export const ResponseAuthCodeHandler = (code: string) => {
  let message: string;

  switch (code) {
    case '[jwt_auth] invalid_username':
      message = 'Niepoprawny login';
      break;
    case '[jwt_auth] incorrect_password':
      message = 'Niepoprawne hasło';
      break;
    default:
      message = 'Nieznany błąd';
      break;
  }

  return message;
};

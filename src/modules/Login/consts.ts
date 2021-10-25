export const authValues = (formatMessage: any) => {
  return [
    {
      name: "email",
      placeHolder: formatMessage({
        id: "placeHolderEmail",
        defaultMessage: "Enter Your Email",
      }),
      type: "email",
    },
    {
      name: "password",
      placeHolder: formatMessage({
        id: "placeHolderPassword",
        defaultMessage: "Enter password",
      }),
      type: "password",
    },
  ];
};

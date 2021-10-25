export const registrationFormConfig = (formatMessage: any) => {
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
      name: "image",
      placeHolder: formatMessage({
        id: "placeHolderSelectImg",
        defaultMessage: "Select profile image",
      }),
      type: "file",
      accept: "image/png, image/jpeg",
    },
    {
      name: "password",
      placeHolder: formatMessage({
        id: "placeHolderPassword",
        defaultMessage: "Enter password",
      }),
      type: "password",
    },
    {
      name: "firstName",
      placeHolder: formatMessage({
        id: "placeHolderFirstName",
        defaultMessage: "Please, enter first name",
      }),
      type: "text",
    },
    {
      name: "lastName",
      placeHolder: formatMessage({
        id: "placeHolderLastName",
        defaultMessage: "Please, enter last name",
      }),
      type: "text",
    },
  ];
};

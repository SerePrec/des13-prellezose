// Valida que sea un formato de usuario válido
const validateLoginUserName = (req, res, next) => {
  const { userName } = req.body;
  if (
    !(
      typeof userName === "string" &&
      /^[a-zñáéíóúü]{1}[a-zñáéíóúü\s,.'-]+$/i.test(userName)
    )
  ) {
    res.redirect("/login");
  } else {
    next();
  }
};

export { validateLoginUserName };

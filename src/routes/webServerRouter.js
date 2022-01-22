import { Router } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { isAuthWeb } from "../middelwares/auth.js";
import { validateRegisterPost } from "../middelwares/validateWebData.js";
import { passport } from "../middelwares/passport.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = Router();

router.get("/", isAuthWeb, (req, res) => {
  res.render("./pages/home", {
    title: "Carga de productos y Chat",
    username: req.user?.username,
    successRegister: req.flash("success")
  });
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/");
  res.sendFile("login.html", {
    root: path.join(__dirname, "..", "views")
  });
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login-error",
    failureFlash: true,
    successRedirect: "/"
  })
);

router.get("/login-error", (req, res) => {
  res.render("pages/loginError", {
    title: "Error de login",
    error: req.flash("error")
  });
});

router.get("/register", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/");
  res.sendFile("register.html", {
    root: path.join(__dirname, "..", "views")
  });
});

router.post(
  "/register",
  validateRegisterPost,
  passport.authenticate("register", {
    failureRedirect: "/register-error",
    failureFlash: true,
    successRedirect: "/",
    successFlash: "¡Gracias por registrarte en nuestro sitio!"
  })
);

router.get("/register-error", (req, res) => {
  res.render("pages/registerError", {
    title: "Error de registro",
    error: req.flash("error")
  });
});

router.get("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    const { username } = req.user;
    req.logout();
    req.session.destroy(err => {
      if (!err) {
        res.clearCookie("connect.sid");
        return res.render("./pages/logout", { title: "Logout", username });
      }
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

router.get("/productos-mock", isAuthWeb, (req, res) => {
  res.sendFile("productos-mock.html", {
    root: path.join(__dirname, "..", "views")
  });
});

export default router;

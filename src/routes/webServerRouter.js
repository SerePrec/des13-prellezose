import { Router } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { isAuthWeb } from "../middelwares/auth.js";
import { validateLoginUserName } from "../middelwares/validateWebData.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = Router();

router.get("/", isAuthWeb, (req, res) => {
  res.render("./pages/home", { userName: req.session.userName });
});

router.get("/login", (req, res) => {
  const { userName } = req.session;
  if (userName) return res.redirect("/");
  res.sendFile("login.html", {
    root: path.join(__dirname, "..", "views")
  });
});

router.post("/login", validateLoginUserName, (req, res) => {
  const { userName } = req.body;
  req.session.userName = userName;
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  const { userName } = req.session;
  if (userName) {
    req.session.destroy(err => {
      if (!err) {
        return res.render("./pages/logout", { userName });
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

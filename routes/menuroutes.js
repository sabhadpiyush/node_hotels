const express = require("express");
const menuitem = require("./../models/menuitems");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newmenu = new menuitem(data);

    const response = await newmenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await menuitem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "sweet" || taste == "spicy" || taste == "sour") {
      const response = await menuitem.find({ taste: taste });
      console.log("response fatched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ Error: "invalid  taste" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server error" });
  }
});

module.exports = router;

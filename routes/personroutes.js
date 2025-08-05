const express = require("express");
const person = require("./../models/person");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newperson = new person(data);

    const response = await newperson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server error" });
  }
});

router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype;
    if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
      const response = await person.find({ work: worktype });
      console.log("response fatched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ Error: "invalid  worktype" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personid = req.params.id;
    const updatedpersondata = req.body;
    const response = await person.findByIdAndUpdate(
      personid,
      updatedpersondata,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ Error: "person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personid = req.params.id;

    const response = await person.findByIdAndDelete(personid);
    if (!response) {
      return res.status(404).json({ Error: "person not found" });
    }

    console.log("data deleted");
    res.status(200).json({ message: "person deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server error" });
  }
});

module.exports = router;

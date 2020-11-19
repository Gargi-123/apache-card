const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const initialData = require("./students.json");

dotenv.config();

const Students = require("./models/Student");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log("Connection to DB failed");
    } else {
      console.log("Database is sucessfully connected");
      Students.find()
        .then((data) => {
          if (data.length === 0) {
            Students.insertMany(initialData)
              .then(() => console.log("Initial Data is Added to the database"))
              .catch((err) => console.log("Error: " + err));
          } else {
            console.log("initial data is allready present");
          }
        })
        .catch((err) => console.log("Error: " + err));
    }
  }
);

// to get all students
app.get("/api/students", (req, res) => {
  Students.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(403).json("Error: " + err));
});

// to get a single student based on id
app.get("/api/students/:email", (req, res) => {
  let query = req.params.email;

  Students.findOne({ email: query })
    .then((student) => {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: "No Such person Found" });
      }
    })
    .catch((err) =>
      res.status(404).json({ message: "No Such person Found", error: err })
    );
});

//add student
app.post("/api/students", (req, res) => {
  let query = req.body.email;
  Students.findOne({ email: query }).then((data) => {
    if (data) {
      res.status(403).json({ message: "preson already exist" });
      return;
    }
  });

  if (req.body.name === "" || !req.body.name) {
    res.status(403).json({ message: "name can't be empty" });
    return;
  } else if (req.body.blood_group === "" || !req.body.blood_group) {
    res.status(403).json({ message: "blood_group can't be empty" });
    return;
  } else if (req.body.email === "" || !req.body.email) {
    res.status(403).json({ message: "email can't be empty" });
    return;
  } else if (req.body.city === "" || !req.body.city) {
    res.status(403).json({ message: "city can't be empty" });
    return;
  } else if (req.body.image_link === "" || !req.body.image_link) {
    res.status(403).json({ message: "image_link can't be empty" });
    return;
  } else if (req.body.gender === "" || !req.body.gender) {
    res.status(403).json({ message: "gender can't be empty" });
    return;
  } else {
    const data = new Students({
      name: req.body.name,
      blood_group: req.body.blood_group,
      email: req.body.email,
      city: req.body.city,
      image_link: req.body.image_link,
      gender: req.body.gender,
    });

    data
      .save()
      .then(() =>
        res.status(200).json({
          status: "Success",
          message: "New person has been added to the database",
        })
      )
      .catch((err) => res.status(400).json({ status: "Failed", message: err }));
  }
});

app.post("/api/students/:id", (req, res) => {
  if (req.is("application/json")) {
    Students.findByIdAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          _id: req.body._id,
          id: req.body.id,
          name: req.body.name,
          blood_group: req.body["blood_group"],
          email: req.body.email,
          city: req.body.city,
          image_link: req.body["image_link"],
          gender: req.body.gender,
        },
      }
    )
      .then(() => res.json("The user was updated successfully"))
      .catch((err) =>
        res.status(404).json("There was an error while updating the user")
      );
  } else {
    res.status(404).json({
      error: true,
      message: "There was an error while updating the student details",
    });
  }
});

app.delete("/api/students/:email", (req, res) => {
  let query = req.params.email;
  Students.findOne({ email: query })
    .then((student) => {
      Students.findByIdAndDelete(student.id).then(() =>
        res.status(200).json({
          status: "Success",
          message: "person has been removed from the database",
        })
      );
    })
    .catch((err) => res.status(404).json({ message: "No Such person Found" }));
});

app.listen(5000, () => {
  console.log("The server is up and running");
});

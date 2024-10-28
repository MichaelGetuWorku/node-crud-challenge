const { v4: uuidv4 } = require("uuid");
const catchAsync = require("../utils/catchAsync");

exports.getUsers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const persons = req.app.get("db");

  const findPersonById = (id) => persons.find((person) => person.id === id);
  if (id) {
    const person = findPersonById(id);
    if (!person) {
      return res.status(404).json({
        status: "fail",
        message: `No Person was found with the given ${req.params.id}`,
      });
    }
    res.status(200).json(person);
  } else {
    res.status(200).json(persons);
  }
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, age, hobbies } = req.body;
  const persons = req.app.get("db");

  if (!name || typeof age !== "number" || !Array.isArray(hobbies)) {
    return res.status(400).json({
      status: "fail",
      message: `Invalid user input please try again`,
    });
  }

  const newPerson = {
    id: uuidv4(),
    name,
    age,
    hobbies,
  };

  persons.push(newPerson);
  res.status(200).json(newPerson);
});

exports.updatePerson = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, age, hobbies } = req.body;
  const persons = req.app.get("db");
  // Find the person by ID
  const personIndex = persons.findIndex((person) => person.id === id);
  if (personIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: `No person found with the given ID: ${id}`,
    });
  } 

  // Validate input
  if (!name || typeof age !== "number" || !Array.isArray(hobbies)) {
    return res.status(400).json({
      status: "fail", 
      message: `Invalid user input, please try again`,
    });
  }

  persons[personIndex] = {
    ...persons[personIndex],
    name,
    age,
    hobbies,
  };

  res.status(200).json(persons[personIndex]);
});
exports.deletePerson = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const persons = req.app.get("db");

  const personIndex = persons.findIndex((person) => person.id === id);

  if (personIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: `No person found with the given ID: ${id}`,
    });
  }

  // Remove the person from the array and store the deleted person
  const [deletedPerson] = persons.splice(personIndex, 1);

  // Return the deleted person data to confirm successful deletion
  res.status(200).json([]);
});

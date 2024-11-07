const express = require("express");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const router = express.Router();

// Mongoose schema and model for Course
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  duration: { type: String, required: true },
  instructor: { type: String, required: true },
});

// Add auto-increment for the `id` field
courseSchema.plugin(autoIncrement, { inc_field: "id" });

// Course model
const Course = mongoose.model("Course", courseSchema);

// Route to add a new course
router.post("/addCourse", async (req, res) => {
  const {
    title,
    description,
    price,
    discountedPrice,
    thumbnail,
    duration,
    instructor,
  } = req.body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !price ||
    !discountedPrice ||
    !thumbnail ||
    !duration ||
    !instructor
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create a new course document
    const course = new Course({
      title,
      description,
      price,
      discountedPrice,
      thumbnail,
      duration,
      instructor,
    });

    // Save the course to the database
    await course.save();

    res.status(201).json({
      message: "Course added successfully",
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        discountedPrice: course.discountedPrice,
        thumbnail: course.thumbnail,
        duration: course.duration,
        instructor: course.instructor,
      },
    });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Error adding course", error });
  }
});

// Route to get all courses
router.get("/getCourses", async (req, res) => {
  try {
    const courses = await Course.find();

    console.log("All courses:", courses);

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found." });
    }

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// Route to delete a course
router.delete("/deleteCourse/:id", async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Error deleting course", error });
  }
});

// Route to update an existing course
router.put("/updateCourse/:id", async (req, res) => {
  const courseId = req.params.id;
  const {
    title,
    description,
    price,
    discountedPrice,
    thumbnail,
    duration,
    instructor,
  } = req.body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !price ||
    !discountedPrice ||
    !thumbnail ||
    !duration ||
    !instructor
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Find the course by id and update it
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        title,
        description,
        price,
        discountedPrice,
        thumbnail,
        duration,
        instructor,
      },
      { new: true } // Return the updated document
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({
      message: "Course updated successfully",
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        discountedPrice: course.discountedPrice,
        thumbnail: course.thumbnail,
        duration: course.duration,
        instructor: course.instructor,
      },
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Error updating course", error });
  }
});

module.exports = router;

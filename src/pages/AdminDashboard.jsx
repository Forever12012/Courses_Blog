import { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, Edit, Trash } from "lucide-react";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editCourse, setEditCourse] = useState(null); // State for editing a course
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    thumbnail: "",
    duration: "",
    instructor: "",
    isActive: true, // Set the default active status
  });

  useEffect(() => {
    // Fetch all courses from the backend
    async function fetchCourses() {
      try {
        const response = await axios.get(
          "http://localhost:8000/courses/getCourses"
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editCourse) {
      // Editing an existing course
      try {
        const response = await axios.put(
          `http://localhost:8000/courses/updateCourse/${editCourse._id}`,
          newCourse
        );
        setCourses(
          courses.map((course) =>
            course._id === editCourse._id ? response.data.course : course
          )
        );
        setEditCourse(null); // Reset edit state
        setNewCourse({
          title: "",
          description: "",
          price: "",
          discountedPrice: "",
          thumbnail: "",
          duration: "",
          instructor: "",
          isActive: true,
        }); // Reset form fields
      } catch (error) {
        console.error("Error editing course:", error);
      }
    } else {
      // Adding a new course
      try {
        const response = await axios.post(
          "http://localhost:8000/courses/addCourse",
          newCourse
        );
        setCourses((prevCourses) => [...prevCourses, response.data.course]);
        setShowAddCourse(false); // Close the form after submission
        setNewCourse({
          title: "",
          description: "",
          price: "",
          discountedPrice: "",
          thumbnail: "",
          duration: "",
          instructor: "",
          isActive: true,
        }); // Reset the form fields
      } catch (error) {
        console.error("Error adding course:", error);
      }
    }
  };

  // Function to handle course deletion
  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(
        `http://localhost:8000/courses/deleteCourse/${courseId}`
      );
      // Remove the deleted course from the state
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEditCourse = (course) => {
    setEditCourse(course);
    setNewCourse({
      title: course.title,
      description: course.description,
      price: course.price,
      discountedPrice: course.discountedPrice,
      thumbnail: course.thumbnail,
      duration: course.duration,
      instructor: course.instructor,
      isActive: course.isActive,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">
          Admin Dashboard
        </h1>

        <div className="space-y-8">
          {/* Courses Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Manage Courses
            </h2>
            <div className="flex justify-end mb-4">
              <button
                className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
                onClick={() => setShowAddCourse(true)} // Show add course form
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Course
              </button>
            </div>

            {/* Add or Edit Course Form */}
            {(showAddCourse || editCourse) && (
              <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {editCourse ? "Edit Course" : "Add New Course"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newCourse.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newCourse.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={newCourse.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="discountedPrice"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Discounted Price
                    </label>
                    <input
                      type="number"
                      id="discountedPrice"
                      name="discountedPrice"
                      value={newCourse.discountedPrice}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="thumbnail"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Thumbnail (Image URL)
                    </label>
                    <input
                      type="text"
                      id="thumbnail"
                      name="thumbnail"
                      value={newCourse.thumbnail}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Duration
                    </label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={newCourse.duration}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="instructor"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Instructor
                    </label>
                    <input
                      type="text"
                      id="instructor"
                      name="instructor"
                      value={newCourse.instructor}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center text-gray-700">
                      <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={newCourse.isActive}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            isActive: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      Active
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
                    >
                      {editCourse ? "Update Course" : "Add Course"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Courses Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-md">
                <thead>
                  <tr>
                    <th className="p-4 text-left font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700">
                      Instructor
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id}>
                      <td className="p-4 text-gray-700">{course.title}</td>
                      <td className="p-4 text-gray-700">{course.instructor}</td>
                      <td className="p-4 text-gray-700">${course.price}</td>
                      <td className="p-4 text-gray-700">
                        <button
                          className="text-indigo-600 hover:text-indigo-500 mr-2"
                          onClick={() => handleEditCourse(course)}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-500"
                          onClick={() => handleDeleteCourse(course._id)}
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

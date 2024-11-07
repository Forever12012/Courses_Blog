import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCourse() {
  const { id } = useParams(); // Get course ID from URL
  const navigate = useNavigate(); // Use navigate to go back to the dashboard
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    thumbnail: "",
    duration: "",
    instructor: "",
    isActive: true,
  });

  useEffect(() => {
    // Fetch the course data based on the ID
    async function fetchCourse() {
      try {
        const response = await axios.get(
          `http://localhost:8000/courses/getCourse/${id}`
        );
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    }

    fetchCourse();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/courses/updateCourse/${id}`,
        course
      );
      navigate("/"); // Go back to the dashboard after saving
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">Edit Course</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Similar form as AdminDashboard, but pre-filled with current course data */}
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
              value={course.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Add similar form fields for the other course details */}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

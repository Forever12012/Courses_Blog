import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import PaymentModal from "../components/PaymentModal";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  // Fetch course data from the backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/courses/getCourses"
        );
        setCourses(response.data.courses); // Assuming your response contains the courses array
      } catch (err) {
        setError("Error fetching courses: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handlePurchase = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setShowPayment(true);
    }
  };

  const handlePaymentComplete = async () => {
    // Store payment details in the database
    try {
      await axios.post("http://localhost:8000/payment/storePayment", {
        courseId: selectedCourse.id,
        amount: selectedCourse.discountedPrice,
      });
      alert("Payment successful! You can now access the course.");
    } catch (err) {
      alert("Error storing payment: " + err.message);
    } finally {
      setShowPayment(false);
      setSelectedCourse(null);
    }
  };

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Our Courses</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onPurchase={handlePurchase}
          />
        ))}
      </div>

      {showPayment && selectedCourse && (
        <PaymentModal
          amount={selectedCourse.discountedPrice}
          onClose={() => setShowPayment(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}

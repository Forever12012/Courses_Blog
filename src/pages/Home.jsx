import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // Fetch courses data from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/courses/getCourses"
        );
        setCourses(response.data.courses); // Assuming your API response contains a "courses" array
        setLoadingCourses(false);
      } catch (err) {
        setError("Error fetching courses: " + err.message);
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch blog posts data from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/blogs/getBlogs"
        );
        setBlogs(response.data.blogs); // Assuming your API response contains a "blogs" array
        setLoadingBlogs(false);
      } catch (err) {
        setError("Error fetching blog posts: " + err.message);
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loadingCourses || loadingBlogs) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Gateway to Academic Excellence
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Join thousands of successful students preparing for JEE, NEET, and
          more
        </p>
        <Link
          to="/courses"
          className="inline-flex items-center bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors"
        >
          Explore Courses
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </section>

      {/* Featured Courses */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Courses</h2>
          <Link to="/courses" className="text-indigo-600 hover:text-indigo-700">
            View all courses →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {courses.slice(0, 2).map((course) => (
            <CourseCard key={course.id} course={course} onPurchase={() => {}} />
          ))}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest from Blog</h2>
          <Link to="/blog" className="text-indigo-600 hover:text-indigo-700">
            View all posts →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.slice(0, 2).map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

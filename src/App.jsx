import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import EditCourse from "./pages/EditCourse";

export default function App() {
  const [blogPosts] = useState([
    {
      id: "1",
      title: "How to Crack JEE in First Attempt",
      content: "Learn the proven strategies and tips from top rankers...",
      author: "Dr. Amit Biswas",
      publishDate: "2024-03-15",
      thumbnail:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "NEET Preparation Guide 2024",
      content: "Comprehensive guide to ace NEET examination...",
      author: "Dr. Sarah Patel",
      publishDate: "2024-03-14",
      thumbnail:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      readTime: "7 min read",
    },
  ]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/edit-course/:id" element={<EditCourse />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

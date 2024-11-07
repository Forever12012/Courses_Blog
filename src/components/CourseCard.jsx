import { Clock, Users } from "lucide-react";

export default function CourseCard({ course, onPurchase }) {
  const discount = Math.round(
    ((course.price - course.discountedPrice) / course.price) * 100
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4">{course.description}</p>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.instructor}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-indigo-600">
              ₹{course.discountedPrice}
            </span>
            <span className="ml-2 text-sm text-gray-500 line-through">
              ₹{course.price}
            </span>
            <span className="ml-2 text-sm text-green-500">{discount}% off</span>
          </div>
          <button
            onClick={() => onPurchase(course.id)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { Clock, User, Calendar } from "lucide-react";

export default function BlogPost({ posts }) {
  const { id } = useParams();
  const post = posts.find((p) => p._id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto">
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full h-64 object-cover rounded-xl mb-8"
      />

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex items-center space-x-6 text-gray-500 mb-8">
        <div className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          <span>{new Date(post.publishDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          <span>{post.readTime}</span>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">{post.content}</div>
    </article>
  );
}

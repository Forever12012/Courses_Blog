# Courses Blog - Backend

## This is the backend of the Courses Blog application built with Node.js and MongoDB. The backend handles the management of courses, blogs. It provides API endpoints for retrieving, creating, updating, and deleting courses and blogs, as well as handling user authentication and payment recording.

## Features

### User Features:
 - View Courses: Allows users to get a list of available courses.
 - View Course Details: Users can view details of a specific course.
 - Purchase Courses: Handles payment details when a user purchases a course.

### Admin Features:

- Add Courses/Blogs: Admins can add new courses and blogs to the platform.
- Edit Courses/Blogs: Admins can update existing courses and blogs.
- Delete Courses/Blogs: Admins can delete courses and blogs.
 
### Payment System:
- Record Payments: Admins and users can record payment transactions for purchase.

## Tech Stack
- Node.js: JavaScript runtime for building server-side applications.
- Express.js: Web framework for building APIs.
- MongoDB: NoSQL database for storing data (Courses, Blogs, Payments).
- Mongoose: ODM (Object Document Mapper) for MongoDB, used to define models and interact with the database.

## Installation

### To run the backend locally, follow these steps:
  1. Clone the repository:
     
    git clone -b Backend https://github.com/Forever12012/Courses_Blog.git 

  2. Navigate to the project directory:

     cd courses_blog

  3. Install dependencies:

     npm install

  4. Start the server:

     npm start

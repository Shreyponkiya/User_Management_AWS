import React from "react";

const About = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">About User Management Portal</h1>
      <p className="text-lg text-gray-700 text-center mb-6">
        The <strong>User Management Portal</strong> is a comprehensive solution designed to streamline user authentication, authorization, and data management. It provides a secure and efficient way to manage user accounts, roles, and access levels in web applications.
      </p>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Authentication:</strong> Secure login and signup using AWS Lambda and DynamoDB.</li>
          <li><strong>Authorization:</strong> Role-based access control for different user types.</li>
          <li><strong>Data Management:</strong> View, update, and manage user information efficiently.</li>
          <li><strong>Secure Token Handling:</strong> JWT-based authentication for session security.</li>
          <li><strong>Responsive UI:</strong> Modern and user-friendly interface built with React & Tailwind.</li>
        </ul>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-3">Technology Stack</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Frontend:</strong> React, Tailwind CSS</li>
          <li><strong>Backend:</strong> AWS Lambda, API Gateway</li>
          <li><strong>Database:</strong> AWS DynamoDB</li>
          <li><strong>Authentication:</strong> JWT, AWS Cognito</li>
          <li><strong>Hosting:</strong> AWS EC2 (Frontend), AWS Lambda (Backend)</li>
        </ul>
      </div>

      <p className="text-center text-gray-600 mt-6">
        Our goal is to provide a scalable and secure user management system that fits your application's needs. 🚀
      </p>
    </div>
  );
};

export default About;

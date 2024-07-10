import React from "react";
import CEOImage from "../images/CEOImage.jpeg"; // Ensure the path is correct and the image is available

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center my-8 mx-4 bg-background text-foreground">
      <div className="w-full max-w-2xl text-center p-8 rounded-lg shadow-lg bg-card">
        <h1 className="text-2xl sm:text-5xl font-extrabold mb-8">
          About TaskMaster
        </h1>
        <p className="text-sm sm:text-lg mb-12">
          TaskMaster is a powerful task management tool designed to help you
          stay organized and efficient. Our mission is to provide you with an
          intuitive and user-friendly platform that simplifies your daily tasks,
          deadlines, and projects.
        </p>
        <p className="text-sm sm:text-lg mb-12">
          Whether you are a student, a professional, or someone who loves to
          stay organized, TaskMaster is the perfect tool for you. Collaborate
          with your team, set reminders, and track your progress with ease. Join
          our community and take control of your productivity today!
        </p>
        <p className="text-sm sm:text-lg mb-12">
          Founded in 2024, TaskMaster has helped thousands of users worldwide
          streamline their task management and boost their productivity. We are
          committed to continuous improvement and innovation, always striving to
          make TaskMaster better and more efficient for you.
        </p>
        <p className="text-sm sm:text-lg mb-12">
          Thank you for choosing TaskMaster. We are here to support you on your
          journey to better task management.
        </p>
        <div className="mt-12">
          <img
            src={CEOImage}
            alt="CEO and Founder"
            className="w-32 h-32 sm:w-48 sm:h-48 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl sm:text-2xl font-bold">Omer Sidi</h2>
          <p className="text-sm sm:text-lg">CEO & Founder</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

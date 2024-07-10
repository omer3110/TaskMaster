// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-card text-card-foreground mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Taskify. All rights reserved.</p>
        <p>
          <a href="/terms" className="underline">
            Terms of Service
          </a>{" "}
          |{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

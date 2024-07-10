// components/WithLoader.jsx
import React, { useState, useEffect } from "react";
import Loader from "./ui/Loader";

const WithLoader = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // 1 second delay

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default WithLoader;

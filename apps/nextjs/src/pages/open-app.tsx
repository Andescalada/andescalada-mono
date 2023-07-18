import { useEffect, useState } from "react";

const OpenApp = () => {
  const [redirecting, setRedirecting] = useState(false);

  const handleRedirect = async () => {
    setRedirecting(true);

    try {
      const response = await fetch("/api/open-app", { cache: "no-cache" });
      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url; // Perform the actual redirection
      } else {
        // Handle API errors if needed
      }
    } catch (error) {
      // Handle fetch errors if needed
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return null;
};

export default OpenApp;

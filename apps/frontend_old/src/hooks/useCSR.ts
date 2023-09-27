import { useState, useEffect } from "react";

const useCSR = () => {
  const [isCSR, setIsCSR] = useState(false);

  useEffect(() => {
    setIsCSR(true);
  }, []);

  return isCSR;
};

export default useCSR;

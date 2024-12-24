import React from "react";
import { LoadMoreButtonProps } from "../types/props/LoadMoreButtonProps";

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  fetchFunction,
  setRoutes,
  setLastPage,
  setCurrentPage,
  changeAddress,
}) => {
  return (
    <button
      onClick={() => {
        setCurrentPage((prevPage) => {
          const newPage = prevPage + 1;
          fetchFunction(
            setRoutes,
            newPage,
            setLastPage,
            changeAddress 
          );
          return newPage;
        });
      }}
      className="mt-4 p-2 bg-blue-500 text-white rounded"
    >
      טען עוד מסלולים
    </button>
  );
};

export default LoadMoreButton;


import React, { useEffect } from "react";
import { LoadMoreButtonProps } from "../types/props/LoadMoreButtonProps";
import useStore from "../store/store";

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  fetchFunction,
  setRoutes,
  setLastPage,
  setCurrentPage,
  changeAddress,
}) => {
  const setFilterAddress = useStore((state) => state.setFilterAddress);
  const setChangeAddress = useStore((state) => state.setChangeAddress);

  return (
    <button
      onClick={() => {
        setFilterAddress(false);
        setCurrentPage((prevPage) => {
          debugger
          const newPage = prevPage + 1;
          fetchFunction(setRoutes, newPage, setLastPage, changeAddress);
          return newPage;
        });
      }}
      className="mt-4 p-2 border border-blue-500 text-blue-500 hover:bg-blue-300 hover:text-white rounded-2xl w-[250px]"
    >
      טען עוד מסלולים {/* ↺ */}↻
    </button>
  );
};

export default LoadMoreButton;

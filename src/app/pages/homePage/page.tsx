"use client";
import { useState, useEffect } from "react";
import { fetchCountOfUsers } from "@/app/functions/usersFunctions";
import { fetchCountOfRoutes } from "@/app/functions/routesFunctions";
import { FaUser, FaRoute, FaWalking } from "react-icons/fa";
import { CounterProps } from "@/app/types/props/CounterProps";

const Counter: React.FC<CounterProps> = ({ target, duration, icon, label }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const step = target / (duration / 10);
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < target) {
          const nextCount = prevCount + step;
          return nextCount > target ? target : nextCount;
        } else {
          clearInterval(interval);
          return target;
        }
      });
    }, 10);

    return () => clearInterval(interval);
  }, [target, duration]);

  return (
    <div className="w-60 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg p-6 flex flex-col items-center justify-between space-y-4">
      <div className="text-white text-5xl">{icon}</div>
      <div className="text-4xl font-extrabold text-white">
        {Math.floor(count)}
      </div>
      <div className="text-lg font-medium text-white">{label}</div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [usersCount, setUsersCount] = useState<number>(0);
  const [routesCount, setRoutesCount] = useState<number>(0);
  const animationDuration = 2000;

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchCountOfUsers();
      const routes = await fetchCountOfRoutes();
      setUsersCount(users);
      setRoutesCount(routes);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-8 mt-10">
      <div className="flex flex-wrap justify-center gap-10 mt-6">
        <Counter
          target={usersCount}
          duration={animationDuration}
          icon={<FaUser />}
          label="משתמשים פעילים"
        />
        <Counter
          target={routesCount}
          duration={animationDuration}
          icon={<FaRoute />}
          label="מסלולים ששותפו"
        />
        <Counter
          target={routesCount * 2}
          duration={animationDuration}
          icon={<FaWalking />}
          label="קילומטרים שהלכו"
        />
      </div>
    </div>
  );
};

export default HomePage;

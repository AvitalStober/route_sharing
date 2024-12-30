"use client";
import { useState, useEffect } from "react";
import { fetchCountOfUsers, getTopUsers } from "@/app/functions/usersFunctions";
import {
  fetchCountOfKilometers,
  fetchCountOfRoutes,
  getTopRoutes,
} from "@/app/functions/routesFunctions";
import {
  FaUser,
  FaRoute,
  FaWalking,
  FaCrown,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { CounterProps } from "@/app/types/props/CounterProps";
import { TopUser } from "@/app/types/topUser";
import { TopRoute } from "@/app/types/topRoutes";
import Star from "@/app/components/Star";

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

const RecommendedRouteCard = ({
  rate,
  description,
}: {
  rate: number;
  description: string;
}) => {
  return (
    <div className="w-60 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4">
      <div className="text-white text-3xl">
        <FaMapMarkedAlt className="text-white  text-3xl mb-2" />
      </div>
      <Star rate={rate} filtered={1} onClick={undefined} />
      <div className="text-white text-sm text-center">{description}</div>
    </div>
  );
};

const ActiveUserCard = ({
  username,
  activities,
}: {
  username: string;
  activities: number;
}) => {
  return (
    <div className="w-60 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4">
      <div className="flex flex-col text-white text-2xl font-bold flex items-center">
        <FaCrown className="text-yellow-400 text-3xl mb-2" />
        {username}
        <div className="text-white text-base mt-2">{activities} פעילויות</div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [usersCount, setUsersCount] = useState<number>(0);
  const [routesCount, setRoutesCount] = useState<number>(0);
  const [kilometersCount, setKilometersCount] = useState<number>(0);
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [recommendedRoutes, setRecommendedRoutes] = useState<TopRoute[]>([]);
  const animationDuration = 2000;

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchCountOfUsers();
      const routes = await fetchCountOfRoutes();
      const kilometers = await fetchCountOfKilometers();
      setUsersCount(users);
      setRoutesCount(routes);
      setKilometersCount(kilometers as number);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const users: TopUser[] = await getTopUsers();
        setTopUsers(users);
      } catch (error) {
        console.error("Failed to fetch top users:", error);
      }
    };
    fetchTopUsers();
  }, []);

  useEffect(() => {
    const fetchTopRoutes = async () => {
      try {
        const routes: TopRoute[] = await getTopRoutes();
        setRecommendedRoutes(routes);
      } catch (error) {
        console.error("Failed to fetch top routes:", error);
      }
    };
    fetchTopRoutes();
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
          target={kilometersCount}
          duration={animationDuration}
          icon={<FaWalking />}
          label="קילומטרים שהלכו"
        />
      </div>

      {/* Active Users Section */}
      <div className="animate-fadeInUp delay-100">
        <div className="text-2xl font-bold text-gray-800 text-center">
          המשתמשים הכי פעילים
        </div>
        <div
          className="flex flex-wrap justify-center gap-10 mt-12 text-center"
          dir="rtl"
        >
          {topUsers.map((user, index) => (
            <ActiveUserCard
              key={index}
              username={user.name as string}
              activities={user.numRoute}
            />
          ))}
        </div>
      </div>

      {/* Recommended Routes Section */}
      <div className="animate-fadeInUp delay-100">
        <div className="text-2xl font-bold text-gray-800 text-center animate-fadeInUp delay-100">
          מסלולים מומלצים
        </div>
        <div
          className="flex flex-wrap justify-center gap-10 mt-12 text-center animate-fadeInUp"
          dir="rtl"
        >
          {recommendedRoutes.map((route, index) => (
            <RecommendedRouteCard
              key={index}
              rate={route.rate}
              description={route.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

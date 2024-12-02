import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ListProblems from "@/components/ListProblems";
import { toast } from "sonner";
import { getData } from "../utils/fetch-api-data";

const TOUGHNESS_LEVELS = ["hacker", "guru", "coder", "novice"];

const BUTTON_COLORS = {
  hacker:
    "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-100",
  guru: "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100",
  coder:
    "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100",
  default:
    "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-600",
};

const HomePage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    problems: [],
    loading: true,
    searchQuery: "",
    selectedLevel: "all",
  });
  const fetchProblems = async (level) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const endpoint = level === "all" ? "problem/all" : `problem/all/${level}`;
      const { response } = await getData(endpoint);
      const problemData = level === "all" ? response.data.data : response.data;

      if (problemData) {
        setState((prev) => ({
          ...prev,
          problems: problemData,
          loading: false,
        }));
      } else {
        toast.error("Failed to fetch problem statements.");
      }
    } catch (error) {
      toast.error("Failed to fetch problem statements.");
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchProblems(state.selectedLevel);
  }, [state.selectedLevel]);

  const filteredProblems = useMemo(() => {
    if (!state.searchQuery) return state.problems;

    const query = state.searchQuery.toLowerCase();
    return state.problems.filter(
      (problem) =>
        problem.problemStatement?.toLowerCase().includes(query) ||
        problem.problemId?.toString().toLowerCase().includes(query)
    );
  }, [state.problems, state.searchQuery]);

  const handleLevelChange = (level) => {
    setState((prev) => ({ ...prev, selectedLevel: level }));
  };

  const handleSearch = (e) => {
    setState((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const getButtonClass = (level) => {
    const baseClass =
      "px-4 py-2 rounded-lg font-medium transition duration-300";
    if (state.selectedLevel === level) {
      return `${baseClass} bg-blue-600 text-white`;
    }
    return `${baseClass} ${BUTTON_COLORS[level] || BUTTON_COLORS.default}`;
  };

  return (
    <div className="h-dvh flex flex-col">
      <header className="w-full shadow-md flex items-center justify-between px-8 py-4 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition duration-300">
        <h1 className="text-2xl font-bold text-center flex-1">
          Admin interface
        </h1>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Logout
        </button>
      </header>

      <div>
        <div className="p-6">
          <div className="mb-6 space-y-4">
            <div className="max-w-md">
              <input
                type="text"
                placeholder="Search by problem statement or ID..."
                value={state.searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleLevelChange("all")}
                className={getButtonClass("all")}
              >
                All Levels
              </button>

              {TOUGHNESS_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => handleLevelChange(level)}
                  className={getButtonClass(level)}
                >
                  {level}
                </button>
              ))}

              <div className="ml-auto">
                {" "}
                {/* Use ml-auto to push the button to the right */}
                <button
                  onClick={() => {
                    navigate("/addproblem");
                  }}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  Add new problem
                </button>
              </div>
            </div>
          </div>

          <ListProblems
            problems={filteredProblems}
            loading={state.loading}
            refetch={fetchProblems}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

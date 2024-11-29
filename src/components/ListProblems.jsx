import React from "react";
import { useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const ListProblems = ({ problems, loading }) => {
  const navigate = useNavigate();

  const getToughnessColor = (level) => {
    switch (level?.toLowerCase()) {
      case "hacker":
        return "text-red-500";
      case "guru":
        return "text-purple-500";
      case "coder":
        return "text-yellow-500";
      default:
        return "text-green-500";
    }
  };

  const handleDelete = async (problemId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/problem/delete/${problemId}`
      );

      if (data.success) {
        const updatedProblems = problems.filter(
          (problem) => problem.problemId !== problemId
        );
        toast.success("Problem deleted successfully.");
      } else {
        toast.error("Failed to delete the problem. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the problem.");
    }
  };

  return (
    <main className="flex-grow p-5">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-400">Loading problems...</p>
        </div>
      ) : problems.length > 0 ? (
        <div className="shadow-md rounded-lg">
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-black relative">
                  <thead className="bg-black sticky top-0 z-10">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase bg-black"
                      >
                        Problem ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase bg-black"
                      >
                        Problem Statement
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase bg-black"
                      >
                        Toughness Level
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase bg-black"
                      >
                        Preview
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase bg-black"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-200">
                    {problems.map(
                      ({
                        _id,
                        problemId,
                        problemStatement,
                        toughnessLevel,
                      }) => (
                        <tr
                          key={_id}
                          className="hover:bg-gray-700 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-50">
                              {problemId}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-50 line-clamp-2">
                              {problemStatement}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`text-sm font-medium ${getToughnessColor(
                                toughnessLevel
                              )}`}
                            >
                              {toughnessLevel}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => navigate(`/detailed/${problemId}`)}
                              className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                              <GrView className="w-5 h-5" />
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleDelete(problemId)}
                              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition duration-200"
                              title="Delete"
                            >
                              <Trash className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-400">No problems available</p>
        </div>
      )}
    </main>
  );
};

export default ListProblems;

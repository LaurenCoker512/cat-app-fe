import { useState, Fragment } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNumberRouteParam } from "../hooks/useRouteParams";
import { api } from "../api";
import type {
  Cat,
  HealthLog,
  EnrichmentActivity,
  EnrichmentSuggestion,
} from "../api/types";
import { format, differenceInYears, differenceInMonths } from "date-fns";

const CatProfilePage = () => {
  const catId = useNumberRouteParam("catId");
  const queryClient = useQueryClient();

  const {
    data: cat,
    isLoading,
    error,
  } = useQuery<Cat>({
    queryKey: ["cat", catId],
    queryFn: () => api.getCat(catId),
  });

  // Health Logs
  const { data: healthLogs = [] } = useQuery<HealthLog[]>({
    queryKey: ["healthLogs", catId],
    queryFn: () => api.getHealthLogs(catId),
    enabled: !!catId,
  });
  const addHealthLogMutation = useMutation({
    mutationFn: (log: Omit<HealthLog, "id">) => api.addHealthLog(catId, log),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["healthLogs", catId] }),
  });

  // Enrichment Activities
  const { data: enrichmentActivities = [] } = useQuery<EnrichmentActivity[]>({
    queryKey: ["enrichmentActivities", catId],
    queryFn: () => api.getEnrichmentActivities(catId),
    enabled: !!catId,
  });
  const addEnrichmentActivityMutation = useMutation({
    mutationFn: (activity: Omit<EnrichmentActivity, "id">) =>
      api.addEnrichmentActivity(catId, activity),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["enrichmentActivities", catId],
      }),
  });

  // Enrichment Suggestions
  const { data: enrichmentSuggestions = [] } = useQuery<EnrichmentSuggestion[]>(
    {
      queryKey: ["enrichmentSuggestions", catId],
      queryFn: () => api.getEnrichmentSuggestions(catId),
      enabled: !!catId,
    }
  );

  // State for modals
  const [showHealthLogModal, setShowHealthLogModal] = useState(false);
  const [showEnrichmentModal, setShowEnrichmentModal] = useState(false);

  // Pagination states
  const [healthLogsPage, setHealthLogsPage] = useState(1);
  const [activitiesPage, setActivitiesPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate cat's age
  const calculateAge = (birthDate: Date) => {
    const years = differenceInYears(new Date(), birthDate);
    const months = differenceInMonths(new Date(), birthDate) % 12;

    if (years === 0) {
      return `${months} month${months !== 1 ? "s" : ""}`;
    }
    return `${years} year${years !== 1 ? "s" : ""}${
      months > 0 ? `, ${months} month${months !== 1 ? "s" : ""}` : ""
    }`;
  };

  if (!cat) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        aria-live="polite"
      >
        <div className="text-center p-8">
          <div className="text-6xl mb-4" aria-hidden="true">
            😿
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! Cat not found
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            This kitty seems to have wandered off...
          </p>
          <a
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Back to Safety
          </a>
        </div>
      </main>
    );
  }

  return (
    <main
      className="max-w-6xl mx-auto px-4 py-8"
      id="main-content"
      tabIndex={-1}
    >
      {/* Cat Profile Header */}
      <section aria-labelledby="cat-profile-header" className="mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-indigo-100">
            <img
              src={cat.profilePicture}
              alt={`Profile of ${cat.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1
              id="cat-profile-header"
              className="text-4xl font-bold text-gray-800 mb-2"
              tabIndex={0}
            >
              {cat.name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Age:</span>{" "}
                  {calculateAge(cat.birthDate)}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Breed:</span> {cat.breed}
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Temperament:</span>{" "}
                  {cat.temperament.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrichment Suggestions */}
      <section
        className="mb-12"
        aria-labelledby="enrichment-suggestions-header"
      >
        <h2
          id="enrichment-suggestions-header"
          className="text-2xl font-bold text-gray-800 mb-4"
          tabIndex={0}
        >
          Suggested Enrichment Activities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enrichmentSuggestions.map((suggestion: EnrichmentSuggestion) => (
            <div
              key={suggestion.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
              tabIndex={0}
              aria-label={`Enrichment suggestion: ${suggestion.name}`}
            >
              <h3
                className="text-xl font-semibold text-indigo-700 mb-2"
                tabIndex={0}
              >
                {suggestion.name}
              </h3>
              <p className="text-gray-700 mb-3">{suggestion.description}</p>
              <p className="text-sm text-gray-600 italic">
                "{suggestion.reason}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Health Logs */}
      <section className="mb-12" aria-labelledby="health-logs-header">
        <div className="flex justify-between items-center mb-4">
          <h2
            id="health-logs-header"
            className="text-2xl font-bold text-gray-800"
          >
            Health Logs
          </h2>
          <button
            onClick={() => setShowHealthLogModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Add Health Log"
          >
            Add Health Log
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <table
            className="min-w-full divide-y divide-gray-200"
            aria-label="Health logs table"
          >
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Litter Box
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Energy Level
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Skin Condition
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {healthLogs
                .slice(
                  (healthLogsPage - 1) * itemsPerPage,
                  healthLogsPage * itemsPerPage
                )
                .map((log: HealthLog) => (
                  <tr
                    key={log.id}
                    tabIndex={0}
                    aria-label={`Health log for ${format(
                      log.date,
                      "MMM d, yyyy"
                    )}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {format(log.date, "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {log.litterBoxHabits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div
                        className="flex items-center"
                        aria-label={`Energy level: ${log.energyLevel} out of 5`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < log.energyLevel
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {log.skinCondition}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                      {log.notes}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Pagination */}
          <nav
            className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200"
            aria-label="Health logs pagination"
          >
            <div className="flex-1 flex justify-between items-center">
              <button
                onClick={() =>
                  setHealthLogsPage(Math.max(1, healthLogsPage - 1))
                }
                disabled={healthLogsPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  healthLogsPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-label="Previous page"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700" aria-live="polite">
                Page {healthLogsPage} of{" "}
                {Math.ceil(healthLogs.length / itemsPerPage)}
              </span>
              <button
                onClick={() =>
                  setHealthLogsPage(
                    Math.min(
                      Math.ceil(healthLogs.length / itemsPerPage),
                      healthLogsPage + 1
                    )
                  )
                }
                disabled={
                  healthLogsPage === Math.ceil(healthLogs.length / itemsPerPage)
                }
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  healthLogsPage === Math.ceil(healthLogs.length / itemsPerPage)
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      </section>

      {/* Enrichment Activities */}
      <section className="mb-12" aria-labelledby="enrichment-activities-header">
        <div className="flex justify-between items-center mb-4">
          <h2
            id="enrichment-activities-header"
            className="text-2xl font-bold text-gray-800"
          >
            Enrichment Activities
          </h2>
          <button
            onClick={() => setShowEnrichmentModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Add Enrichment Activity"
          >
            Add Activity
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <table
            className="min-w-full divide-y divide-gray-200"
            aria-label="Enrichment activities table"
          >
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Activity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Last Tried
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Enjoyment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enrichmentActivities
                .slice(
                  (activitiesPage - 1) * itemsPerPage,
                  activitiesPage * itemsPerPage
                )
                .map((activity: EnrichmentActivity) => (
                  <tr
                    key={activity.id}
                    tabIndex={0}
                    aria-label={`Enrichment activity: ${activity.name}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {activity.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                      {activity.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {activity.lastTried
                        ? format(activity.lastTried, "MMM d, yyyy")
                        : "Never"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {activity.enjoymentRating ? (
                        <div
                          className="flex items-center"
                          aria-label={`Enjoyment rating: ${activity.enjoymentRating} out of 5`}
                        >
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < (activity.enjoymentRating ?? 0)
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      ) : (
                        "Not rated"
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Pagination */}
          <nav
            className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200"
            aria-label="Enrichment activities pagination"
          >
            <div className="flex-1 flex justify-between items-center">
              <button
                onClick={() =>
                  setActivitiesPage(Math.max(1, activitiesPage - 1))
                }
                disabled={activitiesPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  activitiesPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-label="Previous page"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700" aria-live="polite">
                Page {activitiesPage} of{" "}
                {Math.ceil(enrichmentActivities.length / itemsPerPage)}
              </span>
              <button
                onClick={() =>
                  setActivitiesPage(
                    Math.min(
                      Math.ceil(enrichmentActivities.length / itemsPerPage),
                      activitiesPage + 1
                    )
                  )
                }
                disabled={
                  activitiesPage ===
                  Math.ceil(enrichmentActivities.length / itemsPerPage)
                }
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  activitiesPage ===
                  Math.ceil(enrichmentActivities.length / itemsPerPage)
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      </section>

      {/* Health Log Modal */}
      {showHealthLogModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Add Health Log
                </h3>
                <form>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="date"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="litterBox"
                    >
                      Litter Box Habits
                    </label>
                    <select
                      id="litterBox"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="Normal">Normal</option>
                      <option value="More frequent">More frequent</option>
                      <option value="Less frequent">Less frequent</option>
                      <option value="Irregular">Irregular</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="energyLevel"
                    >
                      Energy Level
                    </label>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <Fragment key={level}>
                          <input
                            type="radio"
                            id={`energy-${level}`}
                            name="energyLevel"
                            value={level}
                            className="sr-only"
                          />
                          <label
                            htmlFor={`energy-${level}`}
                            className="cursor-pointer text-gray-400 hover:text-yellow-400 mr-1"
                          >
                            <svg
                              className="h-8 w-8"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </label>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="skinCondition"
                    >
                      Skin Condition
                    </label>
                    <select
                      id="skinCondition"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="Healthy">Healthy</option>
                      <option value="Dry">Dry</option>
                      <option value="Flaky">Flaky</option>
                      <option value="Irritated">Irritated</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="notes"
                    >
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowHealthLogModal(false)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowHealthLogModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enrichment Activity Modal */}
      {showEnrichmentModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Add Enrichment Activity
                </h3>
                <form>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="activityName"
                    >
                      Activity Name
                    </label>
                    <input
                      type="text"
                      id="activityName"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="activityDescription"
                    >
                      Description
                    </label>
                    <textarea
                      id="activityDescription"
                      rows={3}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="activityDate"
                    >
                      Date Tried
                    </label>
                    <input
                      type="date"
                      id="activityDate"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Enjoyment Rating
                    </label>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <Fragment key={level}>
                          <input
                            type="radio"
                            id={`enjoyment-${level}`}
                            name="enjoymentRating"
                            value={level}
                            className="sr-only"
                          />
                          <label
                            htmlFor={`enjoyment-${level}`}
                            className="cursor-pointer text-gray-400 hover:text-yellow-400 mr-1"
                          >
                            <svg
                              className="h-8 w-8"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </label>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowEnrichmentModal(false)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowEnrichmentModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CatProfilePage;

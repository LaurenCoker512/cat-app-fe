import { useParams } from "react-router-dom";

/**
 * Hook for safely extracting and converting a numeric route parameter
 * @param paramName The name of the route parameter (e.g., "userId")
 * @returns The parsed number or null if invalid/missing
 */
export function useNumberRouteParam(paramName: string): number {
  const params = useParams();
  const paramValue = params[paramName];

  if (paramValue === undefined || paramValue === null) {
    throw new Error(`Missing or invalid number parameter: ${paramName}`);
  }

  const num = Number(paramValue);

  if (isNaN(num)) {
    throw new Error(`Missing or invalid number parameter: ${paramName}`);
  }

  return num;
}

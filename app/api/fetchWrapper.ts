import { z } from "zod";
import { errorSchema } from "@/app/api/schemas/error";

export const fetchWrapper = async <T extends z.ZodType>(
  endpoint: string,
  successSchema: T,
  options?: RequestInit,
) => {
  const headers = new Headers();

  try {
    const response = await fetch(`http://localhost:3000${endpoint}`, {
      ...options,
      headers: {
        Authorization: "Bearer super-secret-doodle-token",
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (!response.ok) {
      let errorData: unknown;

      try {
        errorData = await response.json();
      } catch {
        errorData = {
          Message:
            "An unexpected error occurred,and server responce could not be parsed",
          Name: "InvalidJSON",
        };
      }

      const parsedErrorData = errorSchema.safeParse(errorData);
      const error = parsedErrorData.success
        ? parsedErrorData.data
        : errorSchema.parse({
            message: "Something unexpected happened, please try again later",
            error: "UnknownError",
          });

      throw {
        ...error,
        ErrorCode: response.status,
      };
    }

    const responseData = await response.json();
    const parsedData = successSchema.safeParse(responseData);

    if (!parsedData.success) {
      throw new Error(
        `${JSON.stringify(parsedData.error)}: response from ${endpoint} was not parsed correctly`,
      );
    }

    return parsedData.data;
  } catch (error: any) {
    if (error?.message && error?.name) {
      throw error;
    } else {
      throw {
        message: "Network or unexpected error",
        error: "UnexpectedError",
        statusCode: error?.code,
      };
    }
  }
};

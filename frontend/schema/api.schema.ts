import { z } from 'zod';

// Generic API Response interface for consistent API handling
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  status: number;
}

// API Error interface
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
  timestamp?: string;
}

// API Request/Response base interfaces
export interface BaseApiRequest {
  timestamp?: string;
  correlationId?: string;
}

export interface BaseApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: string;
  correlationId?: string;
}

// HTTP Status enums
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

// HTTP Methods enum
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

// Content Types enum
export enum ContentType {
  JSON = 'application/json',
  FORM_DATA = 'multipart/form-data',
  URL_ENCODED = 'application/x-www-form-urlencoded',
  TEXT = 'text/plain',
}

// API validation schemas
export const ApiResponseValidationSchema = z.object({
  success: z.boolean(),
  data: z.unknown().nullable(),
  error: z.string().nullable(),
  status: z.number(),
});

export const ApiErrorValidationSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
  details: z.record(z.string(), z.unknown()).optional(),
  timestamp: z.string().optional(),
});

export const BaseApiRequestValidationSchema = z.object({
  timestamp: z.string().optional(),
  correlationId: z.string().optional(),
});

export const BaseApiResponseValidationSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: ApiErrorValidationSchema.optional(),
  timestamp: z.string(),
  correlationId: z.string().optional(),
});

// Type exports
export type ApiResponseFormData<T> = z.infer<typeof ApiResponseValidationSchema> & { data: T };
export type ApiErrorFormData = z.infer<typeof ApiErrorValidationSchema>;
export type BaseApiRequestFormData = z.infer<typeof BaseApiRequestValidationSchema>;
export type BaseApiResponseFormData<T> = z.infer<typeof BaseApiResponseValidationSchema> & { data?: T };

// Helper functions for API handling
export const createSuccessResponse = <T>(data: T, status: number = HttpStatus.OK): ApiResponse<T> => ({
  success: true,
  data,
  error: null,
  status,
});

export const createErrorResponse = <T>(error: string, status: number = HttpStatus.INTERNAL_SERVER_ERROR): ApiResponse<T> => ({
  success: false,
  data: null,
  error,
  status,
});

export const isApiError = (response: ApiResponse<unknown>): boolean => {
  return !response.success || response.error !== null;
};

export const getApiErrorMessage = (response: ApiResponse<unknown>): string => {
  return response.error || 'An unknown error occurred';
};

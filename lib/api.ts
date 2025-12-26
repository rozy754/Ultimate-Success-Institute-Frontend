import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios"

/**
 * Axios instance
 * - baseURL: same as "/api"
 * - withCredentials: cookies (access_token / refresh_token) auto send honge
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true, // 👈 VERY IMPORTANT
  headers: {
    "Content-Type": "application/json",
  },
})

/**
 * Response interceptor
 * - Success → sirf response.data return
 * - Error → clean Error(message) throw
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError<any>) => {
    // Network / server down case
    if (!error.response) {
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      )
    }

    // Auth related errors
    if (error.response.status === 401 || error.response.status === 403) {
      console.warn("Unauthorized / Forbidden – redirect to login if needed")
      // yaha future mein logout / redirect logic laga sakti ho
    }

    const message =
      (error.response.data &&
        (error.response.data.message || error.response.data.error)) ||
      error.message ||
      "Something went wrong"

    return Promise.reject(new Error(message))
  }
)

/**
 * Public API helpers
 * NOTE:
 * - response.data already return ho chuka hai interceptor se
 * - isliye components mein res.data ❌ mat likhna
 */
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T, T>(url, config),

  post: <T>(url: string, body?: any, config?: AxiosRequestConfig) =>
    apiClient.post<T, T>(url, body, config),

  put: <T>(url: string, body?: any, config?: AxiosRequestConfig) =>
    apiClient.put<T, T>(url, body, config),

  patch: <T>(url: string, body?: any, config?: AxiosRequestConfig) =>
    apiClient.patch<T, T>(url, body, config),

  del: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T, T>(url, config),

  // DELETE with body (rare but useful)
  delWithBody: <T>(url: string, body: any, config?: AxiosRequestConfig) =>
    apiClient.delete<T, T>(url, { ...config, data: body }),
}

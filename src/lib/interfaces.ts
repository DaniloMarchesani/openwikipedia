export interface INotify {
    message: string,
    options?: {
        type: "success" | "error" | "info" | "warning",
        autoClose: number
    }
}
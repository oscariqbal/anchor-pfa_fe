export type ReturnTypes<T = unknown> = 
  | {
      success: true
      message: string
      data: T | null
    }
  | {
      success: false
      message: string
      errors: {
        field?: Record<string, string[]>
        general?: string[]
      }
    }

export function safe_json_parse<T>(value: string|null, fallback: T = null as T): T {
    try {
      if (!value || typeof value !== 'string') return fallback;
  
      const parsed = JSON.parse(value);
      
      // Optionally check if parsed value matches expected type (primitive or object)
      if (parsed && typeof parsed === 'object') {
        return parsed as T;
      }
  
      return fallback;
    } catch (error) {
      // console.error('JSON parse error:', error);
      return fallback;
    }
  }
  

  export function is_object(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
  
  export function is_array<T = unknown>(value: unknown): value is T[] {
    return Array.isArray(value);
  }
  
  
  export function get_times (hour: number = 1) {
      const start_time = Math.floor(Date.now() / 1000);
      const end_time = start_time + hour * 60 * 60;
      return {
          start_time: start_time,
          end_time: end_time
      }
  }
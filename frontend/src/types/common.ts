
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}


export type DynamicConfirmationProps = {
  status?: 'success' | 'error' | 'info' | 'warning'; // Extended status support
  title?: string;
  subTitle?: string;
  buttonText?: string;
  hideButton?: boolean;
  onButtonClick?: () => void;
  customIcon?: React.ReactNode;
}
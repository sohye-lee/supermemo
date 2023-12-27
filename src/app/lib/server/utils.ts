export interface ResponseType {
  ok: boolean;
  message: string;
  [key: string]: any;
}

type method = 'GET' | 'POST' | 'DELETE' | 'PUT';

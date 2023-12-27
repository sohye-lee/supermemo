import {hash} from 'bcrypt';

export interface ResponseType {
  ok: boolean;
  message: string;
  [key: string]: any;
}

type method = 'GET' | 'POST' | 'DELETE' | 'PUT';


export const hashPassword = async (plainPW: string) => {
  return await hash(plainPW, 10).then(function(hash:string) {
    return hash
  })
}
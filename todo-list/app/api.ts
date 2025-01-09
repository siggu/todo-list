import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const tenantId = 'f8cdef31-a31e-4b4a-93e4-5f571e91255a';

// const tenantId = process.env.TENANT_ID; // 환경변수에서 tenantId 가져오기

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: `https://assignment-todolist-api.vercel.app/api/${tenantId}`, // baseURL 설정
});

// 모든 아이템 GET
export const getItems = () =>
  instance
    .get('/items', {
      params: {
        page: 1, // 페이지 번호
        pageSize: 10, // 페이지 사이즈
      },
    })
    .then((response) => response.data);

// 특정 item GET
export const getItem = ({ queryKey }: QueryFunctionContext) => {
  const [itemId] = queryKey;
  return instance.get(`/items/${itemId}`).then((response) => response.data);
};

// todo POST
export const postTodo = (name: string) =>
  instance
    .post(
      '/items',
      { name }, // POST body에 name만 전달
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response.data);

// item isCompleted PATCH
export const patchItemIsCompleted = (isCompleted: boolean, itemId: number) =>
  instance
    .patch(
      `/items/${itemId}`,
      { isCompleted }, // PATCH body에 isCompleted만 전달
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response.data);

// item PATCH
export const patchItem = (name: string, memo: string, imageUrl: string, isCompleted: boolean, itemId: number) =>
  instance
    .patch(
      `/items/${itemId}`,
      { name, memo, imageUrl, isCompleted },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response.data);

// image POST
export const postImage = (formData: FormData) =>
  instance
    .post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data);

// item DELETE
export const deleteItem = (itemId: number) => instance.delete(`/items/${itemId}`).then((response) => response.data);

import axios from 'axios';

const tenantId = process.env.TENANT_ID; // 환경변수에서 tenantId 가져오기

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

// item PATCH
export const patchItem = (isCompleted: boolean, itemId: number) =>
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

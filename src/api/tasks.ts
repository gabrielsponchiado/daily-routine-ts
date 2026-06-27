import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const tasks = {
  getAll: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  create: async (title: string) => {
    const response = await api.post('/tasks', { title, done: false });
    return response.data;
  },

  update: async (id: number, done: boolean) => {
    const response = await api.put(`/tasks/${id}`, { done });
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  }
};
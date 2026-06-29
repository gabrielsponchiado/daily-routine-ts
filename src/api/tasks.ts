import axios from 'axios';

function normalizeBaseUrl(url: string): string {
  const trimmed = url.trim().replace(/\/$/, '');
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

const api = axios.create({
  baseURL: normalizeBaseUrl(
    import.meta.env.VITE_API_URL || 'http://localhost:3000',
  ),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
  },
};

import { api } from 'src/boot/axios';

const fetchData = async (route, query) => {
  const queryParams = query ? `?${query}` : '';
  const request = await api.get(`${route}${queryParams}`);

  return request;
};

export { fetchData };

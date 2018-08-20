import request from './request';
import mockAPI from './APIMock';

if (process.env.API_MODE === 'MOCK' || process.env.NODE_ENV === 'test') {
  mockAPI();
}

export const getProviders = async () => await request('/api/providers');

export const getProvider = async id => await request(`/api/providers/${id}`);

export const refillAccount = async payload =>
  await request(`/api/refilAccount`, {
    method: 'post',
    json: payload
  });

import fetchMock from 'fetch-mock';
import pathToRegexp from 'path-to-regexp';
import { getRandomInt } from 'utils';

import providers from './mocks/providers.json';

const delay = () => new Promise(res => setTimeout(res, 500));

export function mockAPI() {
  fetchMock
    .get(`/api/providers`, () => delay().then(() => providers))
    .get('express:/api/providers/:id', url => {
      const match = pathToRegexp('/api/providers/:id').exec(url);
      return delay().then(() => {
        const provider = providers.data.find(({ id }) => id == match[1]);
        return { success: true, data: provider };
      });
    })
    .post('/api/refilAccount', () => {
      return delay().then(() => {
        if (getRandomInt(0, 2) === 1) {
          throw {
            message: 'Sorry! Service is temporary unavailable.'
          };
        }
        return { success: true };
      });
    });

  fetchMock.spy();
}

export default mockAPI;

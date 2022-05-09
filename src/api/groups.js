import service from './service';
import { getHeadersWithAuth } from './auth';

// Get groups
const getGroups = async (id) => {
  const config = {
    method: 'get',
    url: '/groups',
    headers: getHeadersWithAuth(),
  };
  try {
    const {
      data: { groups },
    } = await service.request(config);
    return groups;
  } catch (err) {
    console.error(err);
  }
};

export { getGroups };

import service from './service';
import { getHeadersWithAuth } from './auth';

// Get groups
const getGroups = async () => {
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

// Get groups
const getGroupById = async (groupId) => {
  const config = {
    method: 'get',
    url: `/groups/${groupId}`,
    headers: getHeadersWithAuth(),
  };
  try {
    const {
      data: { group },
    } = await service.request(config);

    if (group) {
      return {
        success: true,
        group: group,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

// Create group
const createGroup = async (body) => {
  const config = {
    method: 'post',
    url: '/groups',
    headers: getHeadersWithAuth(),
    data: body,
  };
  try {
    const {
      data: { createdGroup },
    } = await service.request(config);

    if (createdGroup) {
      return {
        success: true,
        createdGroup: createdGroup,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

export { getGroups, createGroup, getGroupById };

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
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

// Update Group
const updateGroup = async (groupId, body) => {
  const config = {
    method: 'patch',
    url: `/groups/${groupId}`,
    headers: getHeadersWithAuth(),
    data: body,
  };
  try {
    const {
      data: { updatedGroup },
    } = await service.request(config);

    if (updatedGroup) {
      return {
        success: true,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

// Delete group
const deleteGroup = async (groupId) => {
  const config = {
    method: 'delete',
    url: `/groups/${groupId}`,
    headers: getHeadersWithAuth(),
  };
  try {
    const {
      data: { deletedGroup },
    } = await service.request(config);

    if (deletedGroup) {
      return {
        success: true,
        deletedGroup: deletedGroup,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

// Get Group balances
const getGroupBalances = async (groupId) => {
  const config = {
    method: 'get',
    url: `/groups/${groupId}/balances`,
    headers: getHeadersWithAuth(),
  };
  try {
    const {
      data: { balances, reimbursements },
    } = await service.request(config);

    if (balances && reimbursements) {
      return {
        success: true,
        balances: balances,
        reimbursements: reimbursements,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

// Join Group
const joinGroup = async (encryptedId) => {
  const config = {
    method: 'patch',
    url: `/groups/${encryptedId}/join`,
    headers: getHeadersWithAuth(),
  };
  try {
    const {
      data: { updatedGroup },
    } = await service.request(config);

    if (updatedGroup) {
      return {
        success: true,
        groupId: updatedGroup._id,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

export {
  getGroups,
  createGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
  getGroupBalances,
  joinGroup,
};

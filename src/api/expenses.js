import { getHeadersWithAuth } from './auth';
import service from './service';

// Get expenses
const getExpenses = async (groupId) => {
  const config = {
    method: 'get',
    url: `/groups/${groupId}/expenses`,
    headers: getHeadersWithAuth(),
  };
  try {
    const {
      data: { expenses },
    } = await service.request(config);

    if (expenses) {
      return {
        success: true,
        expenses: expenses,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

export { getExpenses };

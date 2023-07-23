import { askSydney } from '../services';

export const bingChat = async (message: string, userId: string) => {
  const { response } = await askSydney(message, '', '');

  return response.replace(/\[\^\d+\^\]*/g, '');
};

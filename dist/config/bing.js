import { askSydney } from '../services/index.js';
export const bingChat = async (message, userId) => {
    const { response } = await askSydney(message, '', '');
    return response.replace(/\[\^\d+\^\]*/g, '');
};

import { context } from '../constants';
import { askSydney } from '../services';

export const bingChat = async (message: string, userId: string) => {
  const { response } = await askSydney(
    message,
    '51D|BingProd|E6E7D3F22FA12051DEDE3A3E8DCC382BA1962CC25444973D42D3FA64617F3623',
    context,
  );

  return response.replace(/\[\^\d+\^\]*/g, '');
};

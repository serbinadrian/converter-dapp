import dayjs from 'dayjs';

export const toLocalDateTime = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const toLocalDateTime = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const utcToLocalDateTime = (date) => {
  return dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
};

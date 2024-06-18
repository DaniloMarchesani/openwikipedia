import moment from 'moment';

export const formatDate = (date: number) => {
    const formattedDate =moment(date).format("DD/MM/YYYY HH:mm");
    return formattedDate;
}
import { isBefore, subYears } from 'date-fns';

export const isMoreThan18YearsOld = (date: Date): boolean => {
   const eighteenYearsAgo = subYears(new Date(), 18);
   return isBefore(date, eighteenYearsAgo);
};

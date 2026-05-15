import { createEntityAdapter } from '@reduxjs/toolkit';

export const gradesAdapter = createEntityAdapter({
  selectId: (grade) => String(grade.id),
});

import { createEntityAdapter } from '@reduxjs/toolkit';

export const studentsAdapter = createEntityAdapter({
  selectId: (student) => String(student.id),
});

import { createEntityAdapter } from '@reduxjs/toolkit';

export const coursesAdapter = createEntityAdapter({
  selectId: (course) => String(course.id),
});

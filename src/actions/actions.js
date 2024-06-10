export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const TOGGLE_ALL_FILTERS = 'TOGGLE_ALL_FILTERS';
export const SET_SORT = 'SET_SORT';

export const toggleFilter = (filter) => ({
  type: TOGGLE_FILTER,
  filter
});

export const toggleAllFilters = (checked) => ({
  type: TOGGLE_ALL_FILTERS,
  checked
});

export const setSort = (sort) => ({
  type: SET_SORT,
  sort
});
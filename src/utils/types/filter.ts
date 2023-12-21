export enum Filter {
  'Popularity',
  'Revenue',
  'Primary release date',
  'Vote average',
  'Vote count',
}

export interface FilterProps {
  sortBy:
    | 'popularity.asc'
    | 'popularity.desc'
    | 'revenue.asc'
    | 'revenue.desc'
    | 'primary_release_date.asc'
    | 'primary_release_date.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'vote_count.asc'
    | 'vote_count.desc'
}

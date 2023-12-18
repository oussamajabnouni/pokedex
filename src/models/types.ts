import { PaginationState, FilterState } from '@/store/slices';

export interface AppStateObject {
  filter: FilterState;
  pagination: PaginationState;
}

type Stat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type Pokemon = {
  id: number;
  types: { type: { name: string } }[];
  name: string;
  url: string;
  stats: Stat[];
};

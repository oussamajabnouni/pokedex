import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuery } from 'react-query';
import api from '@/lib/client';
import { useDispatch } from 'react-redux';
import { setTypeFilter } from '@/store/slices/filter-slice';
import { useSelector } from 'react-redux';
import { AppStateObject } from '@/models/types';
import { resetPagination } from '@/store/slices';

interface Type {
  name: string;
  url: string;
}

export function TypeSelect() {
  const dispatch = useDispatch();
  const typeFilter = useSelector((state: AppStateObject) => state.filter.typeFilter);
  const { isLoading, error, data } = useQuery<Type[]>('fetchTypes', () =>
    api.get('type').then(res => res.data.results)
  );

  const handleTypeChange = (newType: string) => {
    dispatch(setTypeFilter(newType));
    dispatch(resetPagination());
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error occurred</div>;

  return (
    <div className="flex justify-center items-center mb-8">
      <Select onValueChange={handleTypeChange} value={typeFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Types</SelectLabel>
            {data?.map((type, index) => (
              <SelectItem key={index} value={type.url}>
                {type.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

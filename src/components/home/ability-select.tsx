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
import { setAbilityFilter } from '@/store/slices/filter-slice';
import { useSelector } from 'react-redux';
import { AppStateObject } from '@/models/types';
import { resetPagination } from '@/store/slices';

interface Ability {
  name: string;
  url: string;
}

export function AbilitySelect() {
  const dispatch = useDispatch();
  const abilityFilter = useSelector((state: AppStateObject) => state.filter.abilityFilter);
  const { isLoading, error, data } = useQuery<Ability[]>('fetchAbilities', () =>
    api.get('ability?limit=100&offset=0').then(res => res.data.results)
  );

  const handleAbilityChange = (newAbility: string) => {
    dispatch(setAbilityFilter(newAbility));
    dispatch(resetPagination());
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error occurred</div>;

  return (
    <div className="flex justify-center items-center mb-8">
      <Select onValueChange={handleAbilityChange} value={abilityFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select an ability" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Abilities</SelectLabel>
            {data?.map((ability, index) => (
              <SelectItem key={index} value={ability.url}>
                {ability.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

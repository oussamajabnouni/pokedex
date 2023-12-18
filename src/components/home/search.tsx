import { ChangeEvent } from 'react';
import { Label } from '@/components/ui/label';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '@/store/slices/filter-slice';
import { useSelector } from 'react-redux';
import { AppStateObject } from '@/models/types';

export function Search() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: AppStateObject) => state.filter.searchTerm);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <div className="flex justify-center items-center mb-8">
      <Label className="sr-only" htmlFor="search">
        Search
      </Label>
      <input
        className="w-1/2 p-2 border border-gray-300 rounded-md"
        id="search"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={handleInputChange}
        type="search"
      />
    </div>
  );
}

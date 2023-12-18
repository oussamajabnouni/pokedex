import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { AppStateObject } from '@/models/types';
import { nextPage, previousPage } from '@/store/slices/pagination-slice';
import { setSearchTerm, resetTypeFilter, resetAbilityFilter } from '@/store/slices';

export default function Pagination() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state: AppStateObject) => state.pagination);

  const handlePreviousPage = () => {
    dispatch(previousPage());
    dispatch(setSearchTerm(''));
    dispatch(resetTypeFilter());
    dispatch(resetAbilityFilter());
  };

  const handleNextPage = () => {
    dispatch(nextPage());
    dispatch(setSearchTerm(''));
    dispatch(resetTypeFilter());
    dispatch(resetAbilityFilter());
  };

  const isPreviousButtonDisabled = currentPage === 1;
  const isNextButtonDisabled = currentPage === 5;

  return (
    <div className="flex justify-between items-center mb-6">
      <Button
        className="bg-black text-white rounded-none"
        variant="default"
        onClick={handlePreviousPage}
        disabled={isPreviousButtonDisabled}
      >
        Previous
      </Button>
      <span className="text-lg">Page {currentPage}</span>
      <Button
        className="bg-black text-white rounded-none"
        variant="default"
        onClick={handleNextPage}
        disabled={isNextButtonDisabled}
      >
        Next
      </Button>
    </div>
  );
}

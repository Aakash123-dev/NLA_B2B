import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { AppDispatch } from '@/store';
import { fetchProjects } from '@/store/slices/projectSlice';

interface Params {
  currentPage: number;
  limit: number;
  searchQuery: string;
  selectedFilter: string;
  userId: number;
}

export const useProjectFetcher = ({
  currentPage,
  limit,
  searchQuery,
  selectedFilter,
  userId,
}: Params) => {
  const dispatch = useDispatch<AppDispatch>();

  const refreshProjects = useCallback(() => {
    const filterType =
      selectedFilter === 'Pinned' || selectedFilter === 'Recent'
        ? selectedFilter
        : 'All';

    dispatch(
      fetchProjects({
        page: currentPage,
        limit,
        searchQuery,
        userId,
        filterType,
      })
    );
  }, [dispatch, currentPage, limit, searchQuery, selectedFilter, userId]);

  return { refreshProjects };
};

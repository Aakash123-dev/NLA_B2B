'use client';

import { useState, useEffect } from 'react';
import ProjectHeader from './ProjectHeader';
import ProjectFilterBar from './ProjectFilterBar';
import ProjectList from './ProjectList';
import ProjectPagination from './ProjectPagination'; // optional if custom
import CreateProjectModal from './CreateProjectModal';
import { EditProjectModal, DeleteProjectDialog } from './project-actions';
import { duplicateProject } from './project-utils';
import ReactPaginate from 'react-paginate';

import { ProjectType, NewProjectData, CustomInputsState } from './ProjectTypes';
import { DEFAULT_NEW_PROJECT, DEFAULT_CUSTOM_INPUTS } from './ProjectData';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  createNewProject,
  fetchProjects,
  newDuplicateProject,
  removeProject,
  toggleFavorites,
} from '@/store/slices/projectSlice';
import { useProjectFetcher } from '@/hooks/useProjectFetcher';
import {
  createProject,
  duplicateProjectById,
  toggleFavoriteProject,
} from '@/services/projectservices/projectServices';

export default function ProjectsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newProject, setNewProject] =
    useState<NewProjectData>(DEFAULT_NEW_PROJECT);
  const [customInputs, setCustomInputs] = useState<CustomInputsState>(
    DEFAULT_CUSTOM_INPUTS
  );
  const [favorites, setFavorites] = useState<number[]>([1, 6, 10, 14]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All Projects');
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dispatch = useAppDispatch();
  const { projects, isLoading, totalPages } = useAppSelector(
    (state) => state.projects
  );

  // pagination state
  const [currentPage, setCurrentPage] = useState(0); // react-paginate is 0-based
  //   const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    dispatch(
      fetchProjects({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        searchQuery,
        userId: 7,
        filterType:
          selectedFilter === 'Pinned' || selectedFilter === 'Recent'
            ? selectedFilter
            : 'All',
      })
    );
  }, [dispatch, currentPage, selectedFilter, searchQuery]);

  const { refreshProjects } = useProjectFetcher({
    currentPage,
    limit: ITEMS_PER_PAGE,
    searchQuery,
    selectedFilter,
    userId: 7,
  });

  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const handleEditProject = (project: ProjectType) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedProject = async (editedProject: ProjectType) => {
    try {
      setLoading(true);

      const payload = {
        project_id: editedProject.id,
        project_name: editedProject.title,
        description: editedProject.description,
        version: editedProject.version,
        logo_from_list:
          'https://storage.googleapis.com/nla_image_bucket/Pringles.jpeg',
      };

      const response = await fetch(
        'https://nla-node-backend-u3zputq5qq-uc.a.run.app/api/v1/project/edit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer YOUR_TOKEN_HERE`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        console.error('Edit API error:', err);
        alert('Failed to edit project.');
        return;
      }

      const updated = await response.json();
      console.log('Project updated:', updated);
      refreshProjects();
    } catch (error) {
      console.error('Error editing project:', error);
      alert('Error editing project.');
    } finally {
      setLoading(false);
      setIsEditModalOpen(false);
      setSelectedProject(null);
    }
  };
  const handleDeleteProject = (project: ProjectType) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async (projectId: number) => {
    try {
      setLoading(true);
      await dispatch(removeProject(projectId)).unwrap();
      refreshProjects();
    } catch (error) {
      alert('Error deleting project.');
      console.error(error);
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
    }
  };

  const handleDuplicateProject = async (project: ProjectType) => {
    try {
      setLoading(true);
      await  dispatch(newDuplicateProject(project.id));
      refreshProjects();
    } catch (err) {
      console.error('Error in handleDuplicateProject:', err);
      alert('Something went wrong while duplicating the project.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: number) => {
    dispatch(toggleFavorites(id));
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
    refreshProjects();
  };

  const handleCreateProject = async () => {
    setLoading(true);
    try {
      await dispatch(createNewProject(newProject)).unwrap();
      setIsCreateModalOpen(false);
      setNewProject(DEFAULT_NEW_PROJECT);
      setCustomInputs(DEFAULT_CUSTOM_INPUTS);
      refreshProjects(); // refresh list from API
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <ProjectHeader
        projectCount={projects.length}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="w-full px-6 py-8 lg:px-12">
        <ProjectFilterBar
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />

        {isLoading ? (
          <div className="py-10 text-center text-gray-500">
            Loading projects...
          </div>
        ) : (
          <>
            <ProjectList
              projects={projects}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              handleEditProject={handleEditProject}
              handleDeleteProject={handleDeleteProject}
              handleDuplicateProject={handleDuplicateProject}
            />
            <div className="mt-6 flex justify-center">
              <ReactPaginate
                previousLabel={'←'}
                nextLabel={'→'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={totalPages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={'flex gap-2'}
                pageClassName={'px-3 py-1 border rounded'}
                activeClassName={'bg-blue-500 text-white'}
                forcePage={currentPage}
              />
            </div>
          </>
        )}
      </div>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        newProject={newProject}
        setNewProject={setNewProject}
        customInputs={customInputs}
        setCustomInputs={setCustomInputs}
        handleCreateProject={handleCreateProject}
      />

      <EditProjectModal
        project={selectedProject}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProject(null);
        }}
        onSave={handleSaveEditedProject}
      />

      <DeleteProjectDialog
        project={selectedProject}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedProject(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

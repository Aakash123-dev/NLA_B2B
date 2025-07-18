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
import { fetchProjectsFromAPI } from '@/services/projectservices/projectServices';

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
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // pagination state
  const [currentPage, setCurrentPage] = useState(0); // react-paginate is 0-based
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const fetchProjects = async (page: number) => {
    setLoading(true);
    try {
      const { data, isSearching } = await fetchProjectsFromAPI(
        page,
        ITEMS_PER_PAGE,
        searchQuery,
        7
      );

      let filtered: ProjectType[] = [];
      let totalCount = 1;

      if (isSearching) {
        filtered = data?.data?.rows || [];
        totalCount = data?.data?.pagination?.totalPages || 1;
      } else {
        const pinned = data?.data?.pinnedProjects || [];
        const unPinned = data?.data?.unPinnedProjects || [];

        if (selectedFilter === 'Pinned') {
          filtered = pinned;
        } else if (selectedFilter === 'Recent') {
          filtered = unPinned;
        } else {
          filtered = [...pinned, ...unPinned];
        }

        totalCount = data?.data?.pagination?.totalPages || 1;
      }

      setProjects(filtered);
      setTotalPages(totalCount);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Error loading project list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage, selectedFilter, searchQuery]);

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

      await fetchProjects(currentPage);
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
      const response = await fetch(
        `https://nla-node-backend-u3zputq5qq-uc.a.run.app/api/v1/project/delete/${projectId}`,
        {
          method: 'DELETE', // Explicit for clarity, even though it's default
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJlbWFpbCI6InRlc3RpbmdAbmxhLmNvbSIsInN0YXR1cyI6ImFjdGl2ZSIsInJvbGUiOiJ1c2VyIiwic2hvd19wb3B1cCI6MSwicGFzc3dvcmQiOiIkMmEkMTAkeW9HSi5WU3hRck1kWGpIc0NHMENWLnhCUWxBSlppWmdCaFZ5UGZCVlIyaGVlREZHUVcyclMiLCJjbGllbnRfZmlyc3RfbmFtZSI6IlRlc3RpbmciLCJjbGllbnRfbGFzdF9uYW1lIjoiTmFtZTEiLCJmdWxsX25hbWUiOm51bGwsImFkZHJlc3MiOiJqYWhza2pkbiIsInBob25lX251bWJlciI6IjIzMjEzMzQzIiwiY2xpZW50X2xvZ28iOm51bGwsImNyZWF0ZWRfYnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjItMTItMDdUMjM6NDQ6MDIuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDQtMThUMTc6Mjk6NDMuMDAwWiJ9LCJpYXQiOjE3NTI1NTM1MzMsImV4cCI6MTc1NTE0NTUzM30.6FZGkZOd4ircbZzfELkcCWJ87nnLos_QsY-q0HvFZGs', // your token
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        console.error('Delete API error:', err);
        alert('Failed to delete project.');
        return;
      }

      // Optionally: const result = await response.json();
      console.log(`Project ${projectId} deleted successfully.`);

      // Refresh project list
      await fetchProjects(currentPage);
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project.');
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
    }
  };

  const handleDuplicateProject = async (project: ProjectType) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://nla-node-backend-u3zputq5qq-uc.a.run.app/api/v1/project/duplicate/${project.id}`,
        {
          method: 'GET', // Explicit for clarity, even though it's default
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJlbWFpbCI6InRlc3RpbmdAbmxhLmNvbSIsInN0YXR1cyI6ImFjdGl2ZSIsInJvbGUiOiJ1c2VyIiwic2hvd19wb3B1cCI6MSwicGFzc3dvcmQiOiIkMmEkMTAkeW9HSi5WU3hRck1kWGpIc0NHMENWLnhCUWxBSlppWmdCaFZ5UGZCVlIyaGVlREZHUVcyclMiLCJjbGllbnRfZmlyc3RfbmFtZSI6IlRlc3RpbmciLCJjbGllbnRfbGFzdF9uYW1lIjoiTmFtZTEiLCJmdWxsX25hbWUiOm51bGwsImFkZHJlc3MiOiJqYWhza2pkbiIsInBob25lX251bWJlciI6IjIzMjEzMzQzIiwiY2xpZW50X2xvZ28iOm51bGwsImNyZWF0ZWRfYnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjItMTItMDdUMjM6NDQ6MDIuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDQtMThUMTc6Mjk6NDMuMDAwWiJ9LCJpYXQiOjE3NTI1NTM1MzMsImV4cCI6MTc1NTE0NTUzM30.6FZGkZOd4ircbZzfELkcCWJ87nnLos_QsY-q0HvFZGs', // your token
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to duplicate project:', errorData);
        alert('Error duplicating project');
        return;
      }

      const result = await response.json();
      console.log('Duplicate result:', result);

      // Refresh the project list after successful duplication
      await fetchProjects(currentPage);
    } catch (err) {
      console.error('Error in handleDuplicateProject:', err);
      alert('Something went wrong while duplicating the project.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id: number) => {
    try {
      // Call pin/unpin API
      const response = await fetch(
        `https://nla-node-backend-u3zputq5qq-uc.a.run.app/api/v1/project/pin-or-unpin/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add Authorization header if required
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to pin/unpin the project');
      }

      // Toggle favorites in local state (optional for UI feedback)
      if (favorites.includes(id)) {
        setFavorites(favorites.filter((favId) => favId !== id));
      } else {
        setFavorites([...favorites, id]);
      }
      await fetchProjects(currentPage);
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleCreateProject = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('user_id', '7');
    formData.append('project_name', newProject?.projectName);
    formData.append('type_of_project', newProject?.projectType);
    formData.append('client_name', 'client');
    formData.append('product_name', 'product');
    formData.append('retailers', JSON.stringify([]));
    formData.append('brands', JSON.stringify([]));
    formData.append('products', JSON.stringify([]));
    formData.append(
      'logo_from_list',
      'https://storage.googleapis.com/nla_image_bucket/Pringles.jpeg'
    );

    try {
      const response = await fetch(
        'https://nla-node-backend-u3zputq5qq-uc.a.run.app/api/v1/project/add',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJlbWFpbCI6InRlc3RpbmdAbmxhLmNvbSIsInN0YXR1cyI6ImFjdGl2ZSIsInJvbGUiOiJ1c2VyIiwic2hvd19wb3B1cCI6MSwicGFzc3dvcmQiOiIkMmEkMTAkeW9HSi5WU3hRck1kWGpIc0NHMENWLnhCUWxBSlppWmdCaFZ5UGZCVlIyaGVlREZHUVcyclMiLCJjbGllbnRfZmlyc3RfbmFtZSI6IlRlc3RpbmciLCJjbGllbnRfbGFzdF9uYW1lIjoiTmFtZTEiLCJmdWxsX25hbWUiOm51bGwsImFkZHJlc3MiOiJqYWhza2pkbiIsInBob25lX251bWJlciI6IjIzMjEzMzQzIiwiY2xpZW50X2xvZ28iOm51bGwsImNyZWF0ZWRfYnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjItMTItMDdUMjM6NDQ6MDIuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDQtMThUMTc6Mjk6NDMuMDAwWiJ9LCJpYXQiOjE3NTI1NTM1MzMsImV4cCI6MTc1NTE0NTUzM30.6FZGkZOd4ircbZzfELkcCWJ87nnLos_QsY-q0HvFZGs', // your token
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const err = await response.json();
        console.error('API error:', err);
        throw new Error('Failed to create project');
      }

      const createdProject = await response.json();
      console.log('Project created successfully:', createdProject);

      setIsCreateModalOpen(false);
      setNewProject(DEFAULT_NEW_PROJECT);
      setCustomInputs(DEFAULT_CUSTOM_INPUTS);
      fetchProjects(currentPage);
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

        {loading ? (
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

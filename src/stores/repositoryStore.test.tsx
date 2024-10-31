import repositoryStore from './repositoryStore';
import { fetchRepositories } from '../api/githubApi';

jest.mock('../api/githubApi');

describe('RepositoryStore', () => {
  afterEach(() => {
    repositoryStore.repositories = [];
    repositoryStore.page = 1;
    jest.clearAllMocks();
  });

  it('loads repositories', async () => {
    jest.mocked(fetchRepositories).mockResolvedValue([{ id: 1, name: 'Repo1' }]);

    await repositoryStore.loadRepositories();

    expect(repositoryStore.repositories.length).toBe(1);
    expect(repositoryStore.repositories[0].name).toBe('Repo1');
    expect(repositoryStore.page).toBe(2);
  });

  it('deletes a repository', () => {
    repositoryStore.repositories = [{ id: 1, name: 'Repo1' }];
    repositoryStore.deleteRepository(1);

    expect(repositoryStore.repositories.length).toBe(0);
  });

  it('edits a repository', () => {
    repositoryStore.repositories = [{ id: 1, name: 'Old Name' }];
    repositoryStore.editRepository(1, 'New Name');

    expect(repositoryStore.repositories[0].name).toBe('New Name');
  });
});
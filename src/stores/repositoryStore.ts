import { makeAutoObservable, runInAction} from 'mobx';
import { fetchRepositories } from '../api/githubApi';

class RepositoryStore {
  repositories: any[] = [];
  page = 1;

  constructor() {
    makeAutoObservable(this);
  }

  loadRepositories = async() => {
    try {
      const newRepositories = await fetchRepositories(this.page);

      runInAction(() => {
        this.repositories = [...this.repositories, ...newRepositories];
        this.page += 1;
      })

    } catch (error) {
      console.error("Failed to load repositories:", error);
    }
  }

  deleteRepository = (id: number) => {
    this.repositories = this.repositories.filter(repo => repo.id !== id);
  }

  editRepository = (id: number, newName: string) => {
    const repoIndex = this.repositories.findIndex(repo => repo.id === id);
    if (repoIndex !== -1) {
      this.repositories[repoIndex].name = newName;
    }
  }
}

const repositoryStore = new RepositoryStore();
export default repositoryStore;

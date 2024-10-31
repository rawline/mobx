import { render, screen, act } from '@testing-library/react';
import RepositoryList from './RepositoryList';
import { MantineProvider } from '@mantine/core';
import repositoryStore from '../stores/repositoryStore';
import '@testing-library/jest-dom';
import { fetchRepositories } from '../api/githubApi';

jest.mock('../api/githubApi');

jest.mock('../stores/repositoryStore', () => ({
    loadRepositories: jest.fn().mockResolvedValue([]),
    repositories: [{ id: 1, name: 'Repo1', html_url: 'http://example.com', description: 'Description' }],
}));

Object.defineProperty(window, 'scrollTo', {
    value: jest.fn(),
    writable: true,
});

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    }),
});

const customRender = async (ui: React.ReactElement) => {
    await act(async () => {
        render(<MantineProvider>{ui}</MantineProvider>);
    });
};

describe('RepositoryList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.mocked(fetchRepositories).mockResolvedValue([{ id: 1, name: 'Repo1' }]);
    });

    it('renders repository list with data', async () => {
        await customRender(<RepositoryList />);
        expect(screen.getByText('GitHub Repositories')).toBeInTheDocument();
        expect(screen.getByText('Repo1')).toBeInTheDocument();
    });

    it('triggers loadRepositories on scroll', async () => {
        await customRender(<RepositoryList />);

        await act(async () => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        expect(repositoryStore.loadRepositories).toHaveBeenCalled();
    });
});
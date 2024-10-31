// import { render, screen, act } from '@testing-library/react';
// import RepositoryList from './RepositoryList';
// import repositoryStore from '../stores/repositoryStore';
// import '@testing-library/jest-dom'

// jest.mock('../stores/repositoryStore', () => ({
//     loadRepositories: jest.fn(),
//     repositories: [{ id: 1, name: 'Repo1', html_url: 'http://example.com', description: 'Description' }],
// }));

// describe('RepositoryList', () => {
//     it('renders repository list with data', async () => {
//         render(<RepositoryList />);
//         expect(screen.getByText('GitHub Repositories')).toBeInTheDocument();
//         expect(screen.getByText('Repo1')).toBeInTheDocument();
//     });

//     it('triggers loadRepositories on scroll', async () => {
//         render(<RepositoryList />);
//         act(() => {
//             window.scrollTo(0, document.body.scrollHeight);
//         });
//         expect(repositoryStore.loadRepositories).toHaveBeenCalled();
//     });
// });

// import { render, screen, fireEvent } from '@testing-library/react';
// import ListItem from './ListItem';
// import repositoryStore from '../stores/repositoryStore';
// import '@testing-library/jest-dom'

// const mockRepo = { id: 1, name: 'Repo1', html_url: 'http://example.com', description: 'Description' };

// describe('ListItem', () => {
//   it('ListItem', () => {
//     render(<ListItem repository={mockRepo} />);
//   })
//   it('renders repository details', () => {
//     render(<ListItem repository={mockRepo} />);
//     expect(screen.getByText('Repo1')).toBeInTheDocument();
//   });

//   it('allows editing a repository name', () => {
//     render(<ListItem repository={mockRepo} />);
//     fireEvent.click(screen.getByText('Edit Name'));
//     const input = screen.getByDisplayValue('Repo1');
//     fireEvent.change(input, { target: { value: 'New Name' } });
//     fireEvent.click(screen.getByText('Save'));

//     expect(repositoryStore.repositories[0].name).toBe('New Name');
//   });

//   it('deletes a repository on button click', () => {
//     render(<ListItem repository={mockRepo} />);
//     fireEvent.click(screen.getByText('Delete'));
//     expect(repositoryStore.repositories.find(repo => repo.id === mockRepo.id)).toBeUndefined();
//   });
// });

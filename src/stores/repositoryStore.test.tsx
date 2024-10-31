import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ListItem from '../components/ListItem';
import { MantineProvider } from '@mantine/core';
import '@testing-library/jest-dom';
import repositoryStore from './repositoryStore';

const mockRepo = { id: 1, name: 'Repo1', html_url: 'http://example.com', description: 'Description' };

const customRender = (ui: React.ReactElement) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

beforeAll(() => {
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
});

describe('ListItem', () => {
  beforeEach(() => {
    repositoryStore.repositories = [{ ...mockRepo }];
  });

  it('renders repository details', () => {
    customRender(<ListItem repository={mockRepo} />);
    expect(screen.getByText('Repo1')).toBeInTheDocument();
  });

  it('allows editing a repository name', async () => {
    customRender(<ListItem repository={mockRepo} />);

    fireEvent.click(screen.getByText('Edit Name'));
    const input = screen.getByDisplayValue('Repo1');
    fireEvent.change(input, { target: { value: 'New Name' } });
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(repositoryStore.repositories[0].name).toBe('New Name');
    });
  });

  it('deletes a repository on button click', () => {
    customRender(<ListItem repository={mockRepo} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(repositoryStore.repositories.find(repo => repo.id === mockRepo.id)).toBeUndefined();
  });
});

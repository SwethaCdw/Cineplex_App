import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Movies from './Movies';

describe('Movies Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Movies/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  const mockMovies = [
    { movie_name: 'Movie 1', movie_likes: 10, movie_poster: 'poster1.jpg' },
    { movie_name: 'Movie 2', movie_likes: 20, movie_poster: 'poster2.jpg' }
  ];

  jest.mock('../../services/getMovies', () => ({
    getMovies: jest.fn().mockResolvedValue({ movies: mockMovies, totalLength: 2 })
  }));

  it('loads more movies when "Load More" button is clicked', async () => {
    const mockMovies = Array.from({ length: 9 }, (_, i) => ({
      movie_name: `Movie ${i + 1}`,
      movie_likes: 10,
      movie_poster: `poster${i + 1}.jpg`
    }));

    jest.mock('../../services/getMovies', () => ({
      getMovies: jest.fn().mockResolvedValue({ movies: mockMovies, totalLength: 15 })
    }));

    render(<Movies />);

    // Initial load should show 6 movies
    expect(screen.getAllByText(/Movie \d+/i)).toHaveLength(6);

    // Click "Load More" button
    fireEvent.click(screen.getByText('Load More'));

    // Wait for additional movies to load
    await waitFor(() => {
      // After loading more, total movies should be 12
      expect(screen.getAllByText(/Movie \d+/i)).toHaveLength(12);
    });
  });

});
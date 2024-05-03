import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Movies from '../Movies';

test('load movies', () => {
    const { asFragment } = render(<Movies />);
    expect(asFragment()).toMatchSnapshot();
      
})

test('is Movie title present', async () => {
    render(<Movies />);
    const MovieText = screen.getByText('All Movies');
    expect(MovieText).toBeInTheDocument();
});

// jest.mock('../../../services/getMovies', () => ({
//     getMovies: jest.fn().mockResolvedValue({
//       movies: [
//         {
//           movie_name: 'Test Movie 1',
//           movie_poster: 'test-poster-1.jpg',
//           movie_description: 'Description of Test Movie 1',
//           movie_likes: 100,
//           movie_actors: ['Actor 1', 'Actor 2']
//         },
//         {
//           movie_name: 'Test Movie 2',
//           movie_poster: 'test-poster-2.jpg',
//           movie_description: 'Description of Test Movie 2',
//           movie_likes: 200,
//           movie_actors: ['Actor 3', 'Actor 4']
//         }
//       ],
//       totalLength: 2
//     })
//   }));


//   test('likes a movie on button click', async () => {
//     render(<Movies />);
//     const likeButton = await screen.findByRole('like-button', { name: 'Test Movie 1' });
//     fireEvent.click(likeButton);
//     expect(likeButton).toHaveClass('liked');
//   });

//   test('displays movie details on click', async () => {
//     render(<Movies />);
//     const moviePoster = await screen.findByAltText('Test Movie 1');
//     fireEvent.click(moviePoster);
//     const movieName = await screen.findByText('Test Movie 1');
//     expect(movieName).toBeInTheDocument();
//   });

//   test('loads more movies on button click', async () => {
//     render(<Movies />);
//     const loadMoreButton = await screen.findByText('Test Movie 1');
//     fireEvent.click(loadMoreButton);
//     await waitFor(() => {
//       expect(screen.getByAltText('Test Movie 2')).toBeInTheDocument();
//     });
//   });


test('changes background color to red when like button is clicked', async () => {
    render(<Movies />);

    await waitFor(() => {
        expect(screen.getByTestId('like-button')).toBeInTheDocument();
    });

    const likeButton = screen.getByTestId("like-button");
    const initialBackgroundColor = window.getComputedStyle(likeButton).getPropertyValue('background-color');
  
    // Click the like button
    fireEvent.click(likeButton);
  
    const updatedBackgroundColor = window.getComputedStyle(likeButton).getPropertyValue('background-color');
  
    expect(initialBackgroundColor).not.toBe(updatedBackgroundColor);
    expect(updatedBackgroundColor).toBe('rgb(255, 0, 0)'); 
  });
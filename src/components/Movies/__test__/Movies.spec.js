import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Movies from '../Movies';
import { getMovies } from '../../../services/getMovies';
import { DESCRIPTION_COUNTER } from '../../../constants/movie-constants';

test('load movies', () => {
    const { asFragment } = render(<Movies />);
    expect(asFragment()).toMatchSnapshot();
      
})
describe('Movies component', ()=> {
    it('should Movie title render', () => {
        render(<Movies />);
        const MovieText = screen.getByText('All Movies');
        expect(MovieText).toBeInTheDocument();
    });

    test('should update the liked movies when the like button is clicked', async () => {
        render(<Movies moviePageCounter={[0]} showImage={[false]} imageCounter={[0]} setMoviePageCounter={() => {}} />);
        const likeButton = screen.getByTestId('like-button');
      
        fireEvent.click(likeButton);
      
        expect(likeButton).toHaveClass('liked');
      });

      

      test('should trigger loadMoreMovies function when "Load More" button is clicked', async () => {
        // Set totalMoviesLength and visibleMovies to true
        const mockTotalMoviesLength = 10;
        const mockVisibleMovies = 6;
      
        render(<Movies
          moviePageCounter={[0]}
          showImage={[false]}
          imageCounter={[0]}
          setMoviePageCounter={() => {}}
          totalMoviesLength={mockTotalMoviesLength}
          visibleMovies={mockVisibleMovies}
        />);
      
        const loadMoreButton = screen.getByTestId('load-more');
        fireEvent.click(loadMoreButton);
      
        await waitFor(() => {
          expect(getMovies).toHaveBeenCalledWith(mockVisibleMovies + 6); 
        });
      });

    test('should handle movie click correctly', async () => {
        const mockMovie = {
            "movie_name": "Inception",
            "movie_poster": "https://m.media-amazon.com/images/I/61T3umiIfEL._AC_UF1000,1000_QL80_.jpg",
            "movie_description": "Inception, directed by Christopher Nolan, is a mind-bending science fiction thriller that explores the concept of dreams within dreams. Dom Cobb, played by Leonardo DiCaprio, is a skilled thief who specializes in the art of extraction—stealing secrets from deep within the subconscious during the dream state. When he is offered a chance to have his criminal history erased in exchange for implanting an idea into someone's mind, Cobb assembles a team for an ambitious mission that blurs the lines between reality and imagination.",
            "movie_likes": 150,
            "movie_actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
        };
      
        const setMoviePageCounter = jest.fn();
        const setSelectedMovie = jest.fn();
      
        render(<Movies moviePageCounter={[0]} showImage={[false]} imageCounter={[0]} setMoviePageCounter={setMoviePageCounter} />);
      
        await waitFor(() => {
            expect(screen.getAllByTestId('movie-name')).toHaveLength(1);
          });
        // Find the movie element and simulate a click
        const movieElement = screen.getByText('Inception');
        fireEvent.click(movieElement);
      
        // Assert that setSelectedMovie is called with the correct movie
        expect(setSelectedMovie).toHaveBeenCalledWith(mockMovie);
      
        // Assert that setMoviePageCounter is called with DESCRIPTION_COUNTER
        expect(setMoviePageCounter).toHaveBeenCalledWith([DESCRIPTION_COUNTER]);
      });
})


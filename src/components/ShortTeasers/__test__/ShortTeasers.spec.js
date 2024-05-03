import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ShortTeasers from '../ShortTeasers';

describe('ShortTeasers Component', () => {
  const mockMoviePageCounter = [5, 10];
  const mockImageCounter = [0, 0];
  const mockShowImage = [true, false];

  it('renders without crashing', () => {
    render(
      <ShortTeasers
        moviePageCounter={mockMoviePageCounter}
        setMoviePageCounter={() => {}}
        showImage={mockShowImage}
        imageCounter={mockImageCounter}
      />
    );
  });

  it('plays the video when the play button is clicked', async () => {
    render(
      <ShortTeasers
        moviePageCounter={mockMoviePageCounter}
        setMoviePageCounter={() => {}}
        showImage={mockShowImage}
        imageCounter={mockImageCounter}
      />
    );

    const playButton = screen.getByTestId('play-button');

    fireEvent.click(playButton);

    await waitFor(() => {
      const videoElement = screen.getByTestId('video');
      // Assert that the video is playing
      expect(videoElement.paused).toBeFalsy();
    });
  });

  // You can add more test cases as needed for other functionalities
});

import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ShortTeasers from '../ShortTeasers';

describe('ShortTeasers Component', () => {
  it("should render heading", () => {
    render(<ShortTeasers />);
    const heading = screen.getByTestId('short-teasers-title');
    expect(heading).toHaveTextContent('Short Teasers');
  })

  const mockTeasers = [
    { title: 'Teaser 1', video_link: 'video1.mp4' },
    { title: 'Teaser 2', video_link: 'video2.mp4' },
    { title: 'Teaser 3', video_link: 'video3.mp4' },
  ];

  const mockProps = {
    moviePageCounter: [10, 20, 30],
    setMoviePageCounter: jest.fn(),
    showImage: [false, true, false],
    imageCounter: [5, 10, 15],
  };
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ teasers: mockTeasers }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the short teasers section', async () => {
    
    render(<ShortTeasers {...mockProps} />);
    await waitFor(() => {
      expect(screen.getByTestId('short-teasers-title')).toBeInTheDocument()
    });
    expect(screen.getAllByTestId('video')).toHaveLength(3);
  });

  
});

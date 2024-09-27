import React from 'react';
import { render, screen } from '@testing-library/react';
import Languages from './Languages';

test('renders the "Languages" message', () => {
 render(<Languages />);
 const LanguagesText = screen.getByText('View in Other Languages');
 expect(LanguagesText).toBeInTheDocument();
});
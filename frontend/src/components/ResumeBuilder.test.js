// Basic test for ResumeBuilder rendering
import { render, screen } from '@testing-library/react';
import ResumeBuilder from './ResumeBuilder';

test('renders ResumeBuilder form', () => {
  render(<ResumeBuilder />);
  expect(screen.getByText(/Job Description/i)).toBeInTheDocument();
  expect(screen.getByText(/Generate Resume/i)).toBeInTheDocument();
});

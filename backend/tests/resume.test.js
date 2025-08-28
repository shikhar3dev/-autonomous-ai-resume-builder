import request from 'supertest';
import { app } from '../server.js';

describe('Resume Generation API', () => {
  test('POST /api/resume/generate should generate resume with valid data', async () => {
    const testData = {
      jobDescription: 'Software Engineer position requiring JavaScript and React experience',
      userDetails: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        education: 'B.S. Computer Science, University of Technology',
        experience: '2 years as Frontend Developer at Tech Corp',
        skills: 'JavaScript, React, Node.js, MongoDB',
        projects: 'E-commerce platform built with React and Node.js'
      }
    };

    const response = await request(app)
      .post('/api/resume/generate')
      .send(testData)
      .expect(200);

    expect(response.body).toHaveProperty('resumeText');
    expect(typeof response.body.resumeText).toBe('string');
    expect(response.body.resumeText.length).toBeGreaterThan(0);
  });

  test('POST /api/resume/generate should return validation error for invalid data', async () => {
    const invalidData = {
      jobDescription: 'Short', // Too short
      userDetails: {
        name: 'J', // Too short
        email: 'invalid-email', // Invalid email
        phone: '123', // Too short
        education: 'E', // Too short
        experience: 'Short', // Too short
        skills: 'S', // Too short
        projects: 'P' // Too short
      }
    };

    const response = await request(app)
      .post('/api/resume/generate')
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('details');
    expect(Array.isArray(response.body.details)).toBe(true);
  });
});

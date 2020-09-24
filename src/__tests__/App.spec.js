import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup, waitForElement } from '@testing-library/react';
const { useInfiniteScroll } = require('../hooks/useInfiniteScroll');
import { MAX_INCREMENT } from '../constants';
import { getStory, getStoryIds } from '../services/hn-api';
import { singularStory, storyId } from '../fixtures';
import { App } from '../App';

beforeEach(cleanup);

jest.mock('../hooks/useInfiniteScroll.js');

jest.mock('../services/hn-api', () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn(),
}));

test('renders the application', async () => {
  useInfiniteScroll.mockImplementation(() => ({
    count: MAX_INCREMENT,
  }));
  getStory.mockImplementation(() => Promise.resolve(singularStory));
  getStoryIds.mockImplementation(() => Promise.resolve(storyId));

  const { getByText, queryByTestId } = render(<App />);
  await waitForElement(() => [
    expect(getByText('Hacker News Feed')).toBeTruthy(),
    expect(getByText('Some title')).toBeTruthy(),
    expect(queryByTestId('story-by').textContent).toEqual('By: rahul'),
  ]);
});

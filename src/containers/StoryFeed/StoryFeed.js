import React, { useState, useEffect } from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { getStoryIds } from '../../services/hn-api';
import { Story } from '../Story/Story';
import { GlobalStyle, StoriesContainerWrapper } from './StoryFeedStyles';

export const StoryFeed = () => {
  const { count } = useInfiniteScroll();
  const [storyIds, setStoryIds] = useState([]);
  useEffect(() => {
    getStoryIds()
      .then(data => setStoryIds(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <GlobalStyle />
      <StoriesContainerWrapper data-test-id="stories-container">
        <h1>Hacker News Feed</h1>
        {storyIds
          ? storyIds.slice(0, count).map(id => <Story key={id} storyId={id} />)
          : 'Loading'}
      </StoriesContainerWrapper>
    </div>
  );
};

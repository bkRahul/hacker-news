import React, { useEffect, useState } from 'react';
import { getStory } from '../../services/hn-api';
import { mapTime } from '../../utils';
import {
  StoryMeta,
  StoryMetaElement,
  StoryTitle,
  StoryWrapper,
} from './StoryStyles';

export const Story = ({ storyId }) => {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId)
      .then(data => {
        data && data.url && setStory(data);
      })
      .catch(err => console.log(err));
  }, [storyId]);

  return story && story.url ? (
    <StoryWrapper data-test-id="story">
      <StoryTitle>
        <a href={story.url}>{story.title}</a>
      </StoryTitle>
      <StoryMeta>
        <span data-testid="story-by">
          <StoryMetaElement>By:</StoryMetaElement> <span>{story.by}</span>
        </span>
        <StoryMetaElement>Posted:</StoryMetaElement>{' '}
        <span>{mapTime(story.time)}</span>
      </StoryMeta>
    </StoryWrapper>
  ) : null;
};

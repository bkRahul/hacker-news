import axios from 'axios';
import { selectFields } from '../utils';

const baseUrl = `https://hacker-news.firebaseio.com/v0/`;
const newStoriesUrl = `${baseUrl}newstories.json`;
const storyUrl = `${baseUrl}item/`;

export const getStoryIds = async () => {
  const result = await axios
    .get(newStoriesUrl)
    .then(({ data }) => data)
    .catch(err => console.log(err));
  return result;
};

export const getStory = async storyId => {
  const result = await axios
    .get(`${storyUrl}${storyId}.json`)
    .then(({ data }) => data && selectFields(data))
    .catch(err => console.log(err));
  return result;
};

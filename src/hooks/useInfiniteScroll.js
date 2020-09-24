import { useEffect, useState } from 'react';
import { MAX_STORIES, MAX_INCREMENT } from '../constants';
import { debounce } from '../utils';
export const useInfiniteScroll = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(MAX_INCREMENT);

  useEffect(() => {
    if (!loading) return;
    //if count is 480 and Inc is 30 set count to max count
    if (count + MAX_INCREMENT >= MAX_STORIES) {
      setCount(MAX_STORIES);
    } else {
      setCount(count + MAX_INCREMENT);
    }
    setLoading(false);
    //watch for loading and render again
  }, [loading, count]);

  //fire handleScroll event on scroll
  useEffect(() => {
    const handleScroll = debounce(() => {
      console.log('count1', count);
      console.log('window.innerHeight', window.innerHeight);
      console.log(
        'document.documentElement.scrollTop',
        document.documentElement.scrollTop
      );
      console.log('window.offsetHeight', document.documentElement.offsetHeight);

      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      ) {
        return false;
      } else {
        return setLoading(true);
      }
    }, 500);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, count]);

  return { count };
};

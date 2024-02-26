import { useState, useEffect } from 'react';

const useInaStar = () => {
  const [starredComments, setStarredComments] = useState(() => {
    const storedStarredComments = localStorage.getItem('starredComments');
    return storedStarredComments ? JSON.parse(storedStarredComments) : {};
  });

  useEffect(() => {
    localStorage.setItem('starredComments', JSON.stringify(starredComments));
  }, [starredComments]);

  const handleToggleStar = (commentId) => {
    setStarredComments((prevStarredComments) => {
      const updatedStarredComments = { ...prevStarredComments };
      if (updatedStarredComments[commentId]) {
        delete updatedStarredComments[commentId];
      } else {
        updatedStarredComments[commentId] = true;
      }
      return updatedStarredComments;
    });
  };

  const isCommentStarred = (commentId) => {
    return starredComments[commentId];
  };

  return { handleToggleStar, isCommentStarred };
};

export default useInaStar;
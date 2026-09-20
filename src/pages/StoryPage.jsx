import React from 'react';
import StoryPlayer from '../components/StoryPlayer';

export default function StoryPage({ 
  flagshipChain, 
  chapters = [], 
  initialChapterId = null,
  onExploreThread,
  onExploreConnections,
  onBackToChapters,
  onNavigateToExplore 
}) {
  return (
    <div className="story-page-container">
      <StoryPlayer
        flagshipChain={flagshipChain}
        chapters={chapters}
        initialChapterId={initialChapterId}
        onExploreThread={onExploreThread}
        onExploreConnections={onExploreConnections}
        onBackToChapters={onBackToChapters}
        onNavigateToExplore={onNavigateToExplore}
      />
    </div>
  );
}

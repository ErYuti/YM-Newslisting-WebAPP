import React from 'react';

const SkeletonCard = () => (
  <div className="glass-card rounded-[2rem] overflow-hidden p-4 animate-pulse">
    <div className="bg-slate-200 dark:bg-slate-700 h-64 rounded-2xl mb-4"></div>
    <div className="space-y-3 p-4">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mt-4"></div>
    </div>
  </div>
);

export default SkeletonCard;
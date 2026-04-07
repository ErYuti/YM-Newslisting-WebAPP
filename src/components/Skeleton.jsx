import React from 'react';

const Skeleton = () => (
    <div className="glass-panel rounded-[2.5rem] p-6 h-[520px] flex flex-col">
        <div className="w-full h-64 rounded-3xl shimmer-bg mb-6" />
        <div className="h-4 w-24 rounded-lg shimmer-bg mb-4" />
        <div className="h-8 w-full rounded-lg shimmer-bg mb-3" />
        <div className="h-8 w-2/3 rounded-lg shimmer-bg mb-6" />
        <div className="mt-auto h-12 w-32 rounded-xl shimmer-bg" />
    </div>
);

export default Skeleton;
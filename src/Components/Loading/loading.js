import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Loading=()=>{
    return(
        <div>
            <div className="text-center">
                <Skeleton  height={70} width="100%" />
            </div>
            <div className="text-center">
                {[...Array(8).keys()].map(i =>{
                    return(
                        <Skeleton  height={150} width={750} />
                    )
                })}
            </div>
        </div>
    )
}
export default Loading;
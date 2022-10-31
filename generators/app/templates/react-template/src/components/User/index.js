import React from 'react';

/**
 * User component
 * Operations about user
 */

export default function User({ 
    className,
    ...attrs
}) {
    return (
        <div className={className} {...attrs} >
            <p>Operations about user</p> 
        </div>
    );
}
import React from 'react';

/**
 * Pet component
 * Everything about your Pets
 */

export default function Pet({ 
    className,
    ...attrs
}) {
    return (
        <div className={className} {...attrs} >
            <p>Everything about your Pets</p> 
        </div>
    );
}
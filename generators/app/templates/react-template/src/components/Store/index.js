import React from 'react';

/**
 * Store component
 * Access to Petstore orders
 */

export default function Store({ 
    className,
    ...attrs
}) {
    return (
        <div className={className} {...attrs} >
            <p>Access to Petstore orders</p> 
        </div>
    );
}
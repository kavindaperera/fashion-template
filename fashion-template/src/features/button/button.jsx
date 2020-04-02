import React from 'react'

function Button ({label}) {
    return (
        <div data-testid="button" >
            Hi{label}
        </div>
    )
}

export default Button;

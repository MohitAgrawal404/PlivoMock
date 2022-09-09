import React from 'react'
import { EmailBar } from './EmailBar'
import { FullEmail } from './FullEmail'
import "./Email.css"

export const Email = () => {
    return (
        <div className="display">
            <EmailBar/>
            <FullEmail/>
        </div>
    )
}

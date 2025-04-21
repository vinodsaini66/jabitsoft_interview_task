import React from 'react'
function Footer() {
    return (
        <div className="flex justify-between items-center py-4 bg-gray-800 text-white">
            <div className="text-sm">
                &copy; {new Date().getFullYear()} Vinod Saini. All rights reserved.
            </div>  
            </div>
    )  
}

export default Footer
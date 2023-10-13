import React, { useEffect } from 'react'

function Auto() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div>Auto</div>
  )
}

export default Auto
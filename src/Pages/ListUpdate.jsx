import React, { useEffect } from 'react'

function ListUpdate() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div>ListUpdate</div>
  )
}

export default ListUpdate
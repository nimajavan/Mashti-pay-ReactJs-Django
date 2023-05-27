import React from 'react'

function Spinner() {
  return (
    <button className="btn btn-outline-primary" type="button" disabled>
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      در حال آپلود....
    </button>
  )
}

export default Spinner
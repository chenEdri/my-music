import React from 'react'

export function ListPaginator({ page, totalPages, onSwitchPage }) {
  
  const routeToNewPage = (pageNum) => {
    if (pageNum < 1) return
    onSwitchPage(pageNum)
  }

  return (
      <section className='paginator-container flex '>
        <div className='page-buttons '>
          {page > 1 ? <button onClick={() => routeToNewPage(+page - 1)}>
            -
          </button>:''}
        </div>
        <div className='page-number'>{`${page} of ${totalPages}`}</div>
        {totalPages > page ? (
          <div className='page-buttons'>
            <button onClick={() => routeToNewPage(+page + 1)}>+</button>
          </div>
        ) : (
          ''
        )}
      </section>
  )
}

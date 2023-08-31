import ReactPaginate from 'react-paginate';
import style from './style.module.css'

export const Paginate = ({ pageCount, onPageChange }) => {
    return (
        <ReactPaginate
            nextLabel="next >"
            previousLabel="< previous"
            onPageChange={onPageChange}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount} /* total number of pages in the pagination */
            pageClassName={style.pageItem}
            pageLinkClassName={style.pageLink}
            previousClassName={style.pageItem}
            previousLinkClassName={style.pageLink}
            nextClassName={style.pageItem} 
            nextLinkClassName={style.pageLink22}
            breakLabel="..."
            breakClassName={style.pageItem}
            breakLinkClassName={style.pageLink}
            containerClassName={style.pagination}
            activeClassName={style.active}
            renderOnZeroPageCount={null}
            forcePage={0} // Reset to page 0
        />
    );
}
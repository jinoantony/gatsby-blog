import React from 'react'
import '../assets/css/paginator.css'
import { Link } from 'gatsby';

const Paginator = ({pages, currentPage, maxLength}) => (
    <div className= "navigator">
        <ul className="paginator">
            {getPageList(pages, currentPage, maxLength).map((page, index) => (
                <li className={page == 0 ? '' : 'paginator-link'} key={index}>
                    {page != 0 
                        ? <Link to={getPageLink(page)}>{page}</Link>
                        : '...'
                    }
                </li>
            ))}
        </ul>
    </div>
)

const getPageLink = (page) => page == 1 ? '/blog' : `/blog/${page}`; 

/**
 * Get paginator
 * 
 * @source https://stackoverflow.com/questions/46382109/limit-the-number-of-visible-pages-in-pagination#answer-46385144
 * @param {int} totalPages 
 * @param {int} page Current Page
 * @param {int} maxLength 
 */
const getPageList = (totalPages, page, maxLength) => {
    if (maxLength < 5) throw "maxLength must be at least 5";

    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start); 
    }

    let sideWidth = maxLength < 9 ? 1 : 2;
    let leftWidth = (maxLength - sideWidth*2 - 3) >> 1;
    let rightWidth = (maxLength - sideWidth*2 - 2) >> 1;
    if (totalPages <= maxLength) {
        // no breaks in list
        return range(1, totalPages);
    }
    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        // no break on left of page
        return range(1, maxLength - sideWidth - 1)
            .concat(0, range(totalPages - sideWidth + 1, totalPages));
    }
    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        // no break on right of page
        return range(1, sideWidth)
            .concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }
    // Breaks on both sides
    return range(1, sideWidth)
        .concat(0, range(page - leftWidth, page + rightWidth),
                0, range(totalPages - sideWidth + 1, totalPages));
}

export default Paginator
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Pagination = ({ totalRecords, pageLimit = 20, neighbours = 0, onPageChanged, currentPage, setCurrentPage }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [pageNeighbours, setPageNeighbours] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPageNeighbours(typeof neighbours === 'number' ? Math.max(0, Math.min(neighbours, 2)) : 0);
  }, [neighbours]);

  useEffect(() => {
    /* Total: 1322212 hits but actually pixabay only allow us get about 200 hits */
    // setTotalPages(Math.ceil(totalRecords / pageLimit));
    setTotalPages(26);
  }, [totalRecords, pageLimit]);

  useEffect(() => {
    const _pages = fetchPageNumbers(pageNeighbours, totalPages, currentPage);
    setPages(_pages);
  }, [pageNeighbours, totalPages, currentPage]);

  const fetchPageNumbers = (pageNeighbours, totalPages, currentPage) => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;
    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  const gotoPage = page => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages)));
  };

  const handleMoveLeft = evt => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = evt => {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  };

  const handleClick = (page, evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <nav aria-label="Countries Pagination">
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li key={index} className="page-item mr-3">
                  <Button className="page-link" href="#" aria-label="Previous" onClick={handleMoveLeft}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </Button>
                </li>
              );

            if (page === RIGHT_PAGE)
              return (
                <li key={index} className="page-item mr-3">
                  <Button className="page-link" href="#" aria-label="Next" onClick={handleMoveRight}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </Button>
                </li>
              );

            return (
              <li key={index} className={`page-item${currentPage === page ? ' active' : ''}  mr-3`}>
                <Button className="page-link" href="#" onClick={e => handleClick(page, e)}>
                  {page}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default Pagination;

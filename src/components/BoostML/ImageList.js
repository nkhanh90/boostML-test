import React from 'react';
import { Row, Col } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import { Pagination } from 'components/Commons';

const ImageList = ({ total, sizePerPage, handleOnClickPage, page, setPage, data }) => (
  <>
    <Row>
      {data.map(item => (
        <Col lg={3} key={item.id} className="text-center py-3">
          <Link to={`/image/${item.id}`}>
            <img src={item.previewURL} alt="pixabay" />
          </Link>
        </Col>
      ))}
    </Row>
    {page && (
      <Pagination
        totalRecords={total}
        pageLimit={sizePerPage}
        onPageChanged={handleOnClickPage}
        currentPage={page}
        setCurrentPage={setPage}
        neighbours={5}
      />
    )}
  </>
);

export default withRouter(ImageList);

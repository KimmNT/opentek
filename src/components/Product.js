import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../scss/Product.scss";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { data, balance } = props;
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 6;

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="product__container">
        {currentItems.map((item) => {
          return (
            <div className="product__item" key={item.productId}>
              <img
                className="product__image"
                src={item.productImage}
                alt={item.productName}
              />
              <div className="product__info">
                <div className="product__name">{item.productName}</div>
                <div className="product__buy">
                  <div className="product__price">
                    {item.productPrice}
                    <span className="currency">gt</span>
                  </div>
                  <Link
                    to={`/detail/${item.productId}`}
                    state={{
                      productId: item.productId,
                      productName: item.productName,
                      productImage: item.productImage,
                      productPrice: item.productPrice,
                      userBalance: balance,
                    }}
                    className="product__buy_btn"
                  >
                    <FaAngleRight className="buy__icon" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FaAngleRight />}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel={<FaAngleLeft />}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page__num_container"
        pageLinkClassName="page__num"
        previousLinkClassName="page__nav"
        nextLinkClassName="page__nav"
        activeClassName="page__active"
      />
    </>
  );
}

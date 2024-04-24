import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../scss/Product.scss";
import { useNavigate } from "react-router-dom";

export default function Product(props) {
  const { data, balance, agencyId, machineId, token } = props;
  const [toDetail, setToDetail] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  const navigateToPage = (pageUrl, stateData) => {
    navigate(pageUrl, { state: stateData });
  };

  useEffect(() => {
    if (toDetail) {
      navigateToPage(`/detail/${productDetail.productId}`, {
        productInfo: productDetail,
        machineId: machineId,
        agencyId: agencyId,
        token: token,
        balance: balance,
      });
    }
  }, [toDetail]);

  //PAGINATION
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

  const handelFormat = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const handleCreateTransaction = (productDetail) => {
    setProductDetail(productDetail);
    setToDetail(true);
  };

  return (
    <>
      <div className="product__container">
        {currentItems.map((item) => {
          return (
            <div
              onClick={() => handleCreateTransaction(item)}
              className="product__item"
              key={item.productId}
            >
              <img
                className="product__image"
                src={item.productImage}
                alt={item.productName}
              />
              <div className="product__info">
                <div className="product__name">
                  {item.productName.substring(0, 20)}...
                </div>
                <div className="product__buy">
                  <div className="product__price">
                    {handelFormat(item.productPrice)}
                    <span className="currency">gt</span>
                  </div>
                  {/* <div
                    onClick={() => handleCreateTransaction(item)}
                    className="product__buy_btn"
                  >
                    <FaAngleRight className="buy__icon" />
                  </div> */}
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

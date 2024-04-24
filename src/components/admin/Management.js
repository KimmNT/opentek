import React, { useEffect, useState } from "react";
import "../../scss/AdminManage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPenAlt, FaTimes } from "react-icons/fa";

export default function Management() {
  const navigate = useNavigate();

  const navigateToPage = (pageUrl, stateData) => {
    navigate(pageUrl, { state: stateData });
  };

  //INSERT FUNCTION
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [slot, setSlot] = useState(0);
  const [slotArr, setSlotArr] = useState([]);

  //EDIT FUNCTION
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  //DELETE FUNCTION
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [productInfo, setproductInfo] = useState({});

  let allSlots = [
    { productSlot: 1 },
    { productSlot: 2 },
    { productSlot: 3 },
    { productSlot: 4 },
    { productSlot: 5 },
    { productSlot: 6 },
    { productSlot: 7 },
    { productSlot: 8 },
    { productSlot: 9 },
    { productSlot: 10 },
    { productSlot: 11 },
    { productSlot: 12 },
    { productSlot: 13 },
    { productSlot: 14 },
    { productSlot: 15 },
    { productSlot: 16 },
    { productSlot: 17 },
    { productSlot: 18 },
    { productSlot: 19 },
    { productSlot: 20 },
  ];
  const remainingSlots = [];

  const { state } = useLocation();
  const userInfo = state?.userInfo;

  const DBurl = "http://localhost:5000";

  //GET PRODUCTS BY machineId
  const getProductsByMachine = async () => {
    try {
      const res = await axios.get(`${DBurl}/getProductByMachine`, {
        params: {
          machineId: userInfo.machineId,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  //GET USED SLOTS
  const getUsedSlots = async () => {
    try {
      const res = await axios.get(`${DBurl}/getSlotMachine`, {
        params: {
          machineId: userInfo.machineId,
        },
      });
      setSlotArr(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  //FILTER THE UNMATCHING ITEMS
  allSlots.forEach((item2) => {
    if (!slotArr.some((item1) => item1.productSlot === item2.productSlot)) {
      remainingSlots.push(item2);
    }
  });

  //RUN ONCE WHEN COMPONENT MOUNTED
  useEffect(() => {
    getProductsByMachine();
    getUsedSlots();
  }, []);

  //RESET THE SLOTS LIST EACH TIME OPEN MODAL
  useEffect(() => {
    if (isOpenModal || isOpenEdit) {
      getUsedSlots();
      allSlots.forEach((item2) => {
        if (!slotArr.some((item1) => item1.productSlot === item2.productSlot)) {
          remainingSlots.push(item2);
        }
      });
    }
  }, [isOpenModal, isOpenEdit]);

  const handelFormat = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  //INSERT PRODUCT
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${DBurl}/insertData`, {
        name: name,
        image: image,
        price: price,
        slot: slot.productSlot,
        machineId: userInfo.machineId,
      });
      console.log("Data inserted successfully");
    } catch (err) {
      console.error("Error inserting data:", err);
    }
    setName("");
    setImage("");
    setImageURL("");
    setPrice(0);
    setSlot(0);
    getProductsByMachine();
    setIsOpenModal(false);
  };

  //EDIT PRODUCT
  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      // Check if name, price, image, or slot are empty, if so, use the existing product info
      const editedData = {
        name: name !== "" ? name : productInfo.productName,
        image: image !== "" ? image : productInfo.productImage,
        price: price !== "" ? price : productInfo.productPrice,
        // slot:
        //   slot.productSlot !== productInfo.productSlot
        //     ? slot.productSlot
        //     : productInfo.productSlot,

        //Temporary user have to choose the slot each time they edit product
        slot: slot.productSlot,
      };

      await axios.put(
        `http://localhost:5000/updateData/${productInfo.productId}`,
        editedData
      );
      console.log("Data updated successfully");

      // Reset form inputs
      setName("");
      setImage("");
      setImageURL("");
      setPrice(0);
      setSlot(0);
      setIsOpenEdit(false); // Close the edit modal
      getProductsByMachine(); // Refresh product list
    } catch (err) {
      console.error("Error updating data:", err);
    }
  };

  //DELETE PRODUCT
  const handleDeleteProduct = async (id) => {
    try {
      await axios.put(`${DBurl}/deleteData`, {
        id: id,
      });
      console.log("Data deleted successfully");
    } catch (err) {
      console.error("Error deleting data:", err);
    }
    getProductsByMachine();
    setDeleteAlert(false);
  };

  return (
    <div className="admin__manage_container">
      <div className="admin__manage_content">
        <div className="admin__manage_header">
          <div className="admin__manage_headline">
            <div>
              Welcome back
              <span className="headline__user"> {userInfo.userName}</span>.
            </div>
          </div>
          <div className="admin__manage_control">
            <div
              onClick={() => setIsOpenModal(true)}
              className="admin__manage_create"
            >
              add new item
            </div>
            <div>
              <div className="headline_count">
                Total: {products.length} items
              </div>
            </div>
          </div>
        </div>
        <div className="admin__manage_list">
          {products.map((product) => (
            <div className="item" key={product.productId}>
              <img className="item__image" src={product.productImage} />
              <div className="item__info">
                <div className="item__name">{product.productName}</div>
                <div className="item__price">
                  {handelFormat(product.productPrice)}
                </div>
                <div className="item__info_bottom">
                  <div className="item__info_slot">
                    Slot
                    <div className="item__info_slot_number">
                      {product.productSlot}
                    </div>
                  </div>
                  <div className="item__controller">
                    <div
                      className="controller edit"
                      onClick={() => {
                        setIsOpenEdit(true);
                        setproductInfo(product);
                      }}
                    >
                      <FaPenAlt className="controller__icon edit" />
                    </div>
                    <div
                      onClick={() => {
                        setDeleteAlert(true);
                        setproductInfo(product);
                      }}
                      className="controller delete"
                    >
                      <FaTimes className="controller__icon delete" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="logout" onClick={() => navigateToPage("/scanqrcode")}>
        log out
      </div>
      {isOpenModal ? (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__image">
              <img src={imageURL} alt="product's image" className="image" />
            </div>
            <div className="modal__input">
              <div className="modal__input_headline">Add new product</div>
              <div className="modal__input_form">
                <div className="modal__input_field">
                  <div className="field__lable">Name</div>
                  <input
                    placeholder="Product's name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="modal__input_field">
                  <div className="field__lable">Price</div>
                  <input
                    placeholder="Product's price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="modal__input_field">
                  <div className="field__lable">Image</div>
                  <input
                    placeholder="Product's image"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      setImageURL(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="modal__slot_container">
                <div className="field__lable">Slot</div>
                <div className="modal__input_slots">
                  {remainingSlots.map((item, index) => (
                    <div
                      key={index}
                      className="slot__value"
                      onClick={() => setSlot(item)}
                    >
                      {item.productSlot}
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal__input_btn" onClick={handleSubmitProduct}>
                add
              </div>
              <div
                className="modal__close"
                onClick={() => setIsOpenModal(false)}
              >
                <FaTimes className="modal__close_icon" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {isOpenEdit ? (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__image">
              <img
                src={productInfo.productImage}
                alt="product's image"
                className="image"
              />
            </div>
            <div className="modal__input">
              <div className="modal__input_headline">Edit product</div>
              <div className="modal__input_form">
                <div className="modal__input_field">
                  <div className="field__lable">Name</div>
                  <input
                    placeholder={productInfo.productName}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="modal__input_field">
                  <div className="field__lable">Price</div>
                  <input
                    placeholder={productInfo.productPrice}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="modal__input_field">
                  <div className="field__lable">Image</div>
                  <input
                    placeholder={productInfo.productImage}
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      setImageURL(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="modal__slot_container">
                <div className="field__lable">
                  Slot {productInfo.productSlot}
                </div>
                <div className="modal__input_slots">
                  {remainingSlots.map((item, index) => (
                    <div
                      key={index}
                      className="slot__value"
                      onClick={() => {
                        setSlot(item);
                        console.log(item);
                      }}
                    >
                      {item.productSlot}
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal__input_btn" onClick={handleEditProduct}>
                edit
              </div>
              <div
                className="modal__close"
                onClick={() => setIsOpenEdit(false)}
              >
                <FaTimes className="modal__close_icon" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {deleteAlert ? (
        <div className="modal">
          <div className="modal__content">
            <div className="delete__container">
              <div className="delete__header">
                Do you want to delete <br />
                <strong>{productInfo.productName}</strong> ?
              </div>
              <div className="delete__controller">
                <div
                  className="delete__btn cancel"
                  onClick={() => setDeleteAlert(false)}
                >
                  Cancel
                </div>
                <div
                  className="delete__btn confirm"
                  onClick={() => handleDeleteProduct(productInfo.productId)}
                >
                  OK
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

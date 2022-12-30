import React, { useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
// import "./styles.css";
import { Navigation } from "swiper";
import { Pagination } from "swiper";

import ShopContext from "../context/ShopContext";
import SingleProductCard from "../components/SingleProductCard";
export default function SingleProduct() {
  const { singleProduct, allProducts } = useContext(ShopContext);
  return (
    <div
      className="row singleProduct justify-content-center"
      style={{ backgroundColor: "white" }}
    >
      <div className="col-3 my-4">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          style={{ border: "1px solid #a05841" }}
        >
          {singleProduct.pictures.map((val) => {
            return (
              <SwiperSlide>
                {/* <div className="card"> */}
                <img src={val.value} width="100%" height="100%" />
                {/* </div> */}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="col-3 my-4 details">
        <div className="description">
          <div className="fs-3">I'm a {singleProduct.name}</div>
          <div>code: {singleProduct.code}</div>
          <br />
          <div className="col-3">
            {singleProduct.discount !== "" ? (
              <div className="d-flex justify-content-between">
                <div className="card-text text-decoration-line-through">
                  ${singleProduct.price}.00
                </div>
                <div className="card-text">
                  $
                  {singleProduct.price -
                    (singleProduct.price * singleProduct.discount) / 100}
                  .00
                </div>
              </div>
            ) : (
              <div className="card-text">${singleProduct.price}.00</div>
            )}
          </div>
          <br />
          <div>Quantity</div>
          <input
            type="number"
            defaultValue={1}
            max={singleProduct.stock}
            className="my-2"
          />
        </div>
        <br />
        <div className="d-flex flex-column mt-4 w-80">
          <div className="d-flex">
            <a
              href="#"
              className="btn shopbtn"
              style={{
                marginTop: "0px",
                width: "100%",
                marginRight: "10px",
                padding: "9px 50px",
              }}
              onClick={(e) => {
                //change value order to true
              }}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              Add to Cart
            </a>
            <a
              href="#"
              className="btn shopbtn"
              style={{
                margin: "0px",
                border: "1px solid #a05841",
                backgroundColor: "white",
                padding: "6px 12px",
              }}
              onClick={(e) => {
                //change value order to true
              }}
            >
              <i
                class="bi bi-heart"
                style={{ color: "#a05841", fontSize: "22px" }}
              ></i>
            </a>
          </div>
          <div className="btn shopbtn buy my-2">Buy Now</div>
        </div>

        <div className="accordion my-3" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Product Info
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">{singleProduct.productInfo}</div>
            </div>
          </div>
          <hr />
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Return & Refund Policy
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                I’m a Return and Refund policy. I’m a great place to let your
                customers know what to do in case they are dissatisfied with
                their purchase. Having a straightforward refund or exchange
                policy is a great way to build trust and reassure your customers
                that they can buy with confidence.
              </div>
            </div>
          </div>
          <hr />

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Shipping Info
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                I'm a shipping policy. I'm a great place to add more information
                about your shipping methods, packaging and cost. Providing
                straightforward information about your shipping policy is a
                great way to build trust and reassure your customers that they
                can buy from you with confidence.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="related col-7 text-center mb-5">
        <div className="fs-5 mb-4">RELATED PRODUCTS</div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {allProducts.products.map((value) =>
            value.relatedCode === singleProduct.relatedCode ? (
              <SwiperSlide>
                <SingleProductCard value={value} />
              </SwiperSlide>
            ) : (
              ""
            )
          )}
        </Swiper>
      </div>
    </div>
  );
}

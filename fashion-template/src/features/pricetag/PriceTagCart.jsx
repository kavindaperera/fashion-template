import React from "react";

function PriceTagCart({ currency, price, discount, discountActive }) {

  return (
    <div data-testid="price-tag-cart">
      { discountActive  &&  discount > 0 && price && (
          <p>
            <del style={{ color: "grey", fontFamily: "Lato" }}>
              {currency}
              {price.toFixed(2)}
            </del>
            <a style={{ color: "red" , fontFamily: "Lato" }}>
              {currency}
              { (price - (price * discount) / 100).toFixed(2)}
            </a>
          </p>
      )}

      { (!discountActive || discount == 0) && price && (
        <p style={{ color: "grey", fontFamily: "Lato" }}>
          {currency}
          {(price).toFixed(2)}
        </p>
      )}
    </div>
  );
}

export default PriceTagCart;

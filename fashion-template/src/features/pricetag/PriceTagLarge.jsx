import React from "react";

function PriceTagLarge({ currency, price, discount }) {
  return (
    <div data-testid="price-tag">
      { discount  &&  discount > 0 && (
          <h2>
            <del style={{ color: "grey" }}>
              {currency}
              {price}
            </del>
            <a style={{ color: "red" }}>
             {"   "} {currency}
              { price - (price * discount) / 100}
            </a>
          </h2>
      )}

      { discount  && discount == 0 && (
        <h1>
          {currency}
          {price}
        </h1>
      )}
    </div>
  );
}

export default PriceTagLarge;

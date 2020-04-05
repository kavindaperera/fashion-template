import React from "react";

function PriceTag({ currency, price, discount }) {
  return (
    <div data-testid="price-tag">
      { discount  &&  discount > 0 && (
          <p>
            <del style={{ color: "grey" }}>
              {currency}
              {price}
            </del>
            <a style={{ color: "red" }}>
              {currency}
              { price - (price * discount) / 100}
            </a>
          </p>
      )}

      { discount  && discount == 0 && (
        <p>
          {currency}
          {price}
        </p>
      )}
    </div>
  );
}

export default PriceTag;

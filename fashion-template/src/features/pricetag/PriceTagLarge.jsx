import React from "react";

function PriceTagLarge({
  currency,
  price,
  displayPrice,
  discount,
  discountActive,
}) {
  console.log(discountActive);
  return (
    <div>
      {displayPrice ? (
        <div data-testid="price-tag">
          {discountActive && discount > 0 && (
            <h2>
              <del style={{ color: "grey" }}>
                {currency}
                {displayPrice}
              </del>
              <a style={{ color: "red" }}>
                {"   "} {currency}
                {displayPrice - (displayPrice * discount) / 100}
              </a>
            </h2>
          )}

          {(!discountActive || discount == 0) && (
            <h1>
              {currency}
              {displayPrice}
            </h1>
          )}
        </div>
      ): (
        <div data-testid="price-tag">
          {discountActive && discount > 0 && (
            <h2>
              <del style={{ color: "grey" }}>
                {currency}
                {price}
              </del>
              <a style={{ color: "red" }}>
                {"   "} {currency}
                {price - (price * discount) / 100}
              </a>
            </h2>
          )}

          {(!discountActive || discount == 0) && (
            <h1>
              {currency}
              {price}
            </h1>
          )}
        </div>
      )}
    </div>
  );
}

export default PriceTagLarge;

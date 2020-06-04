import React from "react";

function PriceTagLarge({
  currency,
  price,
  displayPrice,
  discount,
  discountActive,
}) {
  //console.log(discountActive);
  return (
    <div>
      {displayPrice ? (
        <div data-testid="price-tag">
          {discountActive && discount > 0 && price &&(
            <h2>
              <del style={{ color: "grey", fontFamily: "Lato"  }}>
                {currency}
                {displayPrice.toFixed(2)}
              </del>
              <a style={{ color: "red" , fontFamily: "Lato" }}>
                {"   "} {currency}
                {(displayPrice - (displayPrice * discount) / 100).toFixed(2)}
              </a>
            </h2>
          )}

          {(!discountActive || discount == 0) && price && (
            <h1>
              {currency}
              {displayPrice.toFixed(2)}
            </h1>
          )}
        </div>
      ): (
        <div data-testid="price-tag">
          {discountActive && discount > 0 && price &&(
            <h2>
              <del style={{ color: "grey", fontFamily: "Lato"  }}>
                {currency}
                {price.toFixed(2)}
              </del>
              <a style={{ color: "red", fontFamily: "Lato"  }}>
                {"   "} {currency}
                {(price - (price * discount) / 100).toFixed(2)}
              </a>
            </h2>
          )}

          {(!discountActive || discount == 0) && price && (
            <h1>
              {currency}
              {price.toFixed(2)}
            </h1>
          )}
        </div>
      )}
    </div>
  );
}

export default PriceTagLarge;

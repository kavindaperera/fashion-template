import React from "react";

function PriceTag({ currency, price, discount, discountActive }) {

  return (
    <div data-testid="price-tag">
      { discountActive  &&  discount > 0 && (
          <p>
            <del style={{ color: "grey", fontFamily: "Lato"  }}>
              {currency}
              {price}
            </del>
            <a style={{ color: "red", fontFamily: "Lato"  }}>
              {currency}
              { price - (price * discount) / 100}
            </a>
          </p>
      )}

      { (!discountActive || discount == 0) && (
        <p style={{ color: "grey", fontFamily: "Lato"  }}>
          {currency}
          {price}
        </p>
      )}
    </div>
  );
}

export default PriceTag;

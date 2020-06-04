import React from "react";

function PriceTag({ currency, price, discount, discountActive }) {

  return (
    <div data-testid="price-tag">
      { discountActive  &&  discount > 0 && price && (
          <p>
            <del style={{ color: "#565656", fontFamily: "Lato"  }}>
              {currency}
              {price.toFixed(2)}
            </del>
            <a style={{ color: "red", fontFamily: "Lato"  }}>
              {currency}
              { (price - (price * discount) / 100).toFixed(2)}
            </a>
          </p>
      )}

      { (!discountActive || discount == 0) && price && (
        <p style={{ color: "#565656", fontFamily: "Lato"  }}>
          {currency}
          {price.toFixed(2)}
        </p>
      )}
    </div>
  );
}

export default PriceTag;

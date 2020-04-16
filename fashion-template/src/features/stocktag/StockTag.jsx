import React from "react";
import { Label, Icon } from "semantic-ui-react";
function StockTag({ stock, selectedVariant }) {
  return (
    <div>
    {stock!= null ? (
        <div>
        {stock > 0 ? (
          <Label size="big" color="green">
            <Icon name="check" /> {stock + " items in stock"}
          </Label>
        ) : (
          <Label size="big" color="red">
            <Icon name="ban" /> {"Out of Stock"}
          </Label>
        )}
      </div>
    ): ( <p></p>)
    }
    </div>
  );
}

export default StockTag;

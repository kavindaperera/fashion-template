import React from "react";
import { Label, Icon } from "semantic-ui-react";
function StockTag({ stock, selectedVariant }) {
  return (
    <div data-testid="stock-tag">
    {stock!= null ? (
        <div>
        {stock > 0 ? (
          <Label size="small" basic color="green">
            <Icon name="check" /> {stock + " items in stock"}
          </Label>
        ) : (
          <Label size="small" basic color="red">
            <Icon name="ban" /> {"Out of Stock"}
          </Label>
        )}
      </div>
    ): (<p></p>)
    }
    </div>
  );
}

export default StockTag;

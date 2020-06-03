import React from "react";
import { Label, Icon } from "semantic-ui-react";
function StockTag({ stock, selectedVariant, enableInventoryManagement }) {
  return (
    <div data-testid="stock-tag">
    {stock!= null ? (
        <div>
        {stock > 0  ? ( enableInventoryManagement &&
          <Label className='green-tag'  size="small" basic color="green">
            <Icon name="check" /> {stock + " items in stock"}
          </Label>
        ) : (
          <Label className='red-tag'  size="small" basic color="red">
            <Icon name="ban" /> {"Out of Stock"}
          </Label>
        )}
      </div>
    ): ("")
    }

    </div>
  );
}

export default StockTag;

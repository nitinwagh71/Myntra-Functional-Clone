let bagItemsObjects;
const CONVENIENCE_FEES = 99;
onLoad();

function onLoad() {
  loadBagItemsObjects();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");

  let totalItem = bagItemsObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  

  bagItemsObjects.forEach((bagsummary) => {
    totalMRP = totalMRP + bagsummary.original_price;
    totalDiscount += bagsummary.original_price - bagsummary.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;
  



  bagSummaryElement.innerHTML = `
  <div class="bag-details-container">

    <div class="price-header">PRICE DETAILS (${totalItem} Items)</div>

    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹${totalMRP}</span>
    </div>

    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount"
        >-₹${totalDiscount}
      </span>
    </div>

    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹99</span>
    </div>

    <hr />

    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
       <span class="price-item-value">₹${finalPayment}</span>
    </div>
      
  </div>

  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`;
}

function loadBagItemsObjects() {
  bagItemsObjects = bagItems.map((itemID) => {
    for (let i = 0; i < items.length; i++) {
      if (itemID == items[i].id) {
        return items[i];
      }
    }
  });
  // console.log(bagItemsObjects);
}

function removeBagItems(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemsObjects();
  displayBagCount();
  displayBagItems();
  displayBagSummary();
}

function displayBagItems() {
  let bagContainerElement = document.querySelector(".bag-items-container");
  let innerHtml = "";
  bagItemsObjects.forEach((bagItemData) => {
    innerHtml = innerHtml + generateItemHtml(bagItemData);
    bagContainerElement.innerHTML = innerHtml;
  });
}

function generateItemHtml(bagItem) {
  return `
  <div class="bag-item-container">

    <div class="item-left-part">
      <img class="bag-item-img" src="../${bagItem.image}" />
    </div>

    <div class="item-right-part">

      <div class="company">${bagItem.company}</div>

      <div class="item-name">
      ${bagItem.item_name}
      </div>

      <div class="price-container">
        <span class="current-price">Rs ${bagItem.current_price}</span>
        <span class="original-price">Rs ${bagItem.original_price}</span>
        <span class="discount-percentage">(${bagItem.discount_percentage}% OFF)</span>
      </div>

      <div class="return-period">
        <span class="return-period-days">${bagItem.return_period} days</span> return available
      </div>

      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${bagItem.delivery_date}</span>
      </div>

    </div>

    <div class="remove-from-cart" onclick="removeBagItems(${bagItem.id})">X</div>

  </div>`;
}

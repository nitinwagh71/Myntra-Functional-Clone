let bagItems;

// when page will load this function will call.
onLoad();
function onLoad() {
  let bagItemStr = localStorage.getItem("bagItems");
  // console.log(bagItemStr);
  bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
  displayItemsOnHomePage();
  displayBagCount();
}

// add bag
function addBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagCount();
}

// displayBagCount
function displayBagCount() {
  let bagItemCountElement = document.querySelector(".add-bag-count");
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = "visible";
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = "hidden";
  }
}

// displayItemsOnHomePage
function displayItemsOnHomePage() {
  let itemsContainerElement = document.querySelector(".items-container");
  if (!itemsContainerElement) {
    return;
  }
  let innerHtml = "";

  items.forEach((item) => {
    // innerHtml = innerHtml +  `` long way // innerHtml += `` shorthand
    innerHtml += `
  <div class="item-container">
    <img class="img-class" src="${item.image}" alt="img1" />
    <div class="rating"> ${item.rating.stars} ⭐ | ${item.rating.count} </div>
    <div class="company-name">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="prices">
      <span class="current-price">Rs ${item.current_price}</span>
      <span class="original-price">Rs ${item.original_price}</span>
      <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
    </div>
    <button class="add-to-bag" onclick="addBag(${item.id})">Add to Bag</button>
  </div>
  `;
  });

  itemsContainerElement.innerHTML = innerHtml;
}

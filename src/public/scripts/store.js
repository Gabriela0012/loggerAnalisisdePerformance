document.addEventListener('click', event => {
  if(event.target && event.target.className.includes('addToCart')){
    addToCartClicked(event);
  }
})


const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click',comprarButtonClicked);
const modal = document.querySelector('.container-modal')
const closeModal = document.querySelector('.btn-modal')
closeModal.addEventListener('click',()=>{
  modal.classList.remove('modal--show')

})
const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemName = item.querySelector('.item-name').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemThumbnail = item.querySelector('.item-thumbnail').src;
  const itemId = item.dataset.id;

  addItemToShoppingCart(itemName, itemPrice, itemThumbnail, itemId);

}

function addItemToShoppingCart(itemName, itemPrice, itemThumbnail, itemId) {

  const elementsName = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemName')

  for(let i = 0; i < elementsName.length; i++){
 
    if(elementsName[i].innerText === itemName){

      let elementQuantity = elementsName[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity')
      elementQuantity.value++;
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  
  <div class="row shoppingCartItem" data-id=${itemId}>
    <div class="col-6">
      <div class="shopping-cart-item d-flex aling-items-center h-100 border-bottom pb-2 pt-3">
        <img src=${itemThumbnail} alt="" class="shopping-cart-thumbnail" style="height: 7rem;">
        <h6 class="shopping-cart-item-name shoppingCartItemName text-truncate ml-3 mb-0">${itemName}</h6>
      </div>
    </div>
    <div class="col-2">
      <div class="shopping-cart-price d-flex aling-items-center h-100 border-bottom pb-2 pt-3">
        <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
      </div>
    </div>
    <div class="col-4">
      <div class="shopping-cart-quantity d-flex justify-content-between align-items-center  h-100 border-bottom pb-2 pt-3">
        <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
        <button class="btn btn-danger buttonDelete" type="button">X</button>
      </div>
    </div>
  </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow.querySelector('.buttonDelete').addEventListener('click',removeShoppingCartItem);

  shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);

  updateShoppingCartTotal()
}
function updateShoppingCartTotal(){
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
  
  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach(shoppingCartItem => {
    
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice')
    
    const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$',''))

    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity')

    const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value)

    total = total + shoppingCartItemQuantity * shoppingCartItemPrice;
   
  })

  shoppingCartTotal.innerHTML = `$ ${total.toFixed(2)}`
  
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked(){
  const shoppingCartItems = getItemsInShoppingCart()
  addToLocalStorage('shoppingCart', shoppingCartItems)
  modal.classList.add('modal--show')



  updateShoppingCartTotal();
  
  

  
  
}

function getItemsInShoppingCart(){
  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem')
  const arrShoppingCartItems =[]

  shoppingCartItems.forEach(shoppingCartItem =>{
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity')
    const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value)
    const itemId = shoppingCartItem.dataset.id

    const item = {
      id: itemId,
      qty: shoppingCartItemQuantity
    }
    arrShoppingCartItems.push(item);
    
  });
  return arrShoppingCartItems;
}

function addToLocalStorage(key, items){
  localStorage.setItem(key, JSON.stringify(items))

}







const serverUrl ='https://loggeranalisisdeperformance-production.up.railway.app/'
const itemsPath ='items/'
const thumbnailPath = 'img/'


window.onload = getData();
const items = document.querySelector('.items');

function getData() {
  fetch('/items')
  .then(res => res.json())
  .then((data) =>printData(data));
}

function printData(data) {
  const itemContainer = document.createElement('div')
  itemContainer.className = 'row'

  data.forEach((item) => {
    itemContainer.innerHTML += createDomElement(item)
    items.append(itemContainer)
  })
}

function createDomElement(item){
  const itemHtml = `
  <div class="col-12 col-md-6">
    <div class="item shadow mb-4" style="width: 15rem;" data-id=${item._id}>
      <h3 class="item-name">${item.name}</h3>
      <img class="item-thumbnail" src="${item.thumbnail}" style="height: 17rem;" alt="">
      
      <div class="item-details">
        <h4 class="item-price">$ ${item.price}</h4>
        <button class="item-button btn btn-primary addToCart">agregar</button>
      </div>
    </div>
  </div>`;
  return itemHtml
}
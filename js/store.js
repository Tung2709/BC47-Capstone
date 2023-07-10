let arr = [];
let arrShop = [];
const header = document.querySelector(".header__store");
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
});

function getListAxios() {
  const promise = axios({
    url: "https://649e04749bac4a8e669e8718.mockapi.io/products",
    method: "GET",
  });
  promise.then(function (result) {
    let arrContent = [];
    for (let i = 0; i < result.data.length; i++) {
      let sp = result.data[i];
      let dssp = new DSSP(sp.name, sp.img, sp.type, sp.price, 1, sp.id);
      arr.push(dssp);
      arrContent += `<tr>
        <td>${sp.name}</td>
        <td>${sp.price}</td>
        <td>${sp.screen}</td>
        <td>${sp.backCamera}</td>
        <td>${sp.frontCamera}</td>
        <td>
        <image src ='${sp.img}' style = 'width: 100px; height: 100px;'/>
        </td>
        <td>${sp.desc}</td>
        <td>${sp.type}</td>
        <td>
        <button class = "btn btn-success btnThemSP" onclick ="setLocal(${sp.id})">ADD TO CART</button>
        </td>
        </tr>
        `;
    }
    document.querySelector("#tableDanhSach").innerHTML = arrContent;
  });
}
getListAxios();

const setLocal = (id) => {
  const promise = axios({
    url: `https://649e04749bac4a8e669e8718.mockapi.io/products/${id}`,
    method: "GET",
  });
  promise.then(function (result) {
    let sp = result.data;
    let check = arrShop.find((v) => v.id == sp.id);
    if (check) {
      check.price += sp.price;
      check.count += 1;
    } else {
      arrShop.push({
        id: sp.id,
        name: sp.name,
        img: sp.img,
        type: sp.type,
        price: sp.price,
        count: 1,
      });
    }
    localStorage.setItem("dssp", JSON.stringify(arrShop));
  });
  const countNumber = document.querySelector("#countNumber");
  countNumber.innerHTML = parseInt(countNumber.innerHTML) + 1;
};

const getLocal = () => {
  const parseValue = JSON.parse(localStorage.getItem("dssp"));
  let arrShop2 = [];
  for (let i = 0; i < parseValue.length; i++) {
    let sp = parseValue[i];
    arrShop2 += `
    <div class="col-3">
            <div class="shopItem__content">
              <div class="item__name">${sp.name}</div>
              <div class="item__image">
              <image class="img-fluid" src ='${sp.img}'/>
              </div>
              <div class="item__type">${sp.type}</div>
              <div class="item__price">${sp.price}</div>
              <div class="item__number">
              <button  >-</button>
              <span id="countItem">${sp.count}</span>
              <button class="addPlus" onclick="plusSP(${sp.id})">+</button>
              </div>
            </div>
          </div>
    `;
  }

  document.querySelector("#shopItem").innerHTML = arrShop2;
};

document.querySelector("#cartShop").onclick = function () {
  getLocal();
};


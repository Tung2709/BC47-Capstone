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
  const parseValue = JSON.parse(localStorage.getItem("dssp"));
  if (parseValue == null) {
    const promise = axios({
      url: `https://649e04749bac4a8e669e8718.mockapi.io/products/${id}`,
      method: "GET",
    });
    promise.then(function (result) {
      let sp = result.data;
      arrShop.push({
        id: sp.id,
        name: sp.name,
        img: sp.img,
        type: sp.type,
        price: sp.price,
        count: 1,
      });
      localStorage.setItem("dssp", JSON.stringify(arrShop));
    });
  } else {
    const promise = axios({
      url: `https://649e04749bac4a8e669e8718.mockapi.io/products/${id}`,
      method: "GET",
    });
    promise.then(function (result) {
      const parseValue = JSON.parse(localStorage.getItem("dssp"));
      let sp = result.data;
      let check = parseValue.find((v) => v.id == sp.id);
      if (check) {
        check.price += sp.price;
        check.count += 1;
      } else {
        parseValue.push({
          id: sp.id,
          name: sp.name,
          img: sp.img,
          type: sp.type,
          price: sp.price,
          count: 1,
        });
      }
      localStorage.setItem("dssp", JSON.stringify(parseValue));
    });
  }
  const countNumber = document.querySelector("#countNumber");
  countNumber.innerHTML = parseInt(countNumber.innerHTML) + 1;
};

const getLocal = () => {
  let arrShop2 = [];
  const parseValue = JSON.parse(localStorage.getItem("dssp"));
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
              <button  class="addPlus" onclick="minusSP(${sp.id})" >-</button>
              <span id="countItem">${sp.count}</span>
              <button class="addPlus" onclick="plusSP(${sp.id})">+</button>
              </div>
              <div class= "text-center mt-3">
              <button class= "btn btn-danger" onclick ="delSP(${sp.id})" >Xóa Sản Phẩm</button>
              </div>
            </div>
          </div>
    `;
  }
  document.querySelector("#shopItem").innerHTML = arrShop2;
};

document.querySelector("#cartShop").onclick = function () {
  const parseValue = JSON.parse(localStorage.getItem("dssp"));
  if (parseValue == null) {
    alert("Vui lòng thêm sản phẩm vào giỏ hàng");
  } else {
    getLocal();
  }
  document.querySelector("#totalMonney").innerHTML = "";
};

const plusSP = (id) => {
  let arrShop3 = [];
  const parseValue = JSON.parse(localStorage.getItem("dssp"));
  for (let i = 0; i < parseValue.length; i++) {
    let sp = parseValue[i];
    if (sp.id == id) {
      for (let j = 0; j < arr.length; j++) {
        let spDau = arr[j];
        if (spDau.id == sp.id) {
          sp.price = sp.price + spDau.price;
          sp.count++;
        }
      }
    }
    arrShop3.push(sp);
  }
  localStorage.setItem("dssp", JSON.stringify(arrShop3));
  getLocal();
  const countNumber = document.querySelector("#countNumber");
  countNumber.innerHTML = parseInt(countNumber.innerHTML) + 1;
};

const minusSP = (id) => {
  let arrShop3 = [];
  const parseValue = JSON.parse(localStorage.getItem("dssp"));
  for (let i = 0; i < parseValue.length; i++) {
    let sp = parseValue[i];
    if (sp.id == id) {
      for (let j = 0; j < arr.length; j++) {
        let spDau = arr[j];
        if (spDau.id == sp.id) {
          sp.price = sp.price - spDau.price;
          sp.count--;
        }
      }
    }
    arrShop3.push(sp);
  }
  for (let i = 0; i < arrShop3.length; i++) {
    let sp = arrShop3[i];
    if (sp.count == 0) {
      arrShop3.splice(i, 1);
    }
  }
  localStorage.setItem("dssp", JSON.stringify(arrShop3));
  getLocal();
  const countNumber = document.querySelector("#countNumber");
  countNumber.innerHTML = parseInt(countNumber.innerHTML) - 1;
};

document.querySelector("#btnTinhTien").onclick = function () {
  const parseValue = JSON.parse(localStorage.getItem("dssp"));
  let total = 0;
  let dem = 0;
  for (let i = 0; i < parseValue.length; i++) {
    let sp = parseValue[i];
    total += sp.price;
    dem += sp.count;
  }
  alert(
    "Bạn đã mua: " +
      dem +
      " sản phẩm" +
      "----" +
      "Tổng tiền của bạn hết  " +
      total.toLocaleString() +
      " $"
  );
  document.querySelector("#shopItem").innerHTML = "";
  document.querySelector("#countNumber").innerHTML = 0;
  localStorage.clear();
  location.reload();
};

const typeSP = () => {
  let arrContent2 = [];
  const loaiSP = document.querySelector("#typeSP").value.toLowerCase();

  const promise = axios({
    url: "https://649e04749bac4a8e669e8718.mockapi.io/products",
    method: "GET",
  });
  if (loaiSP == "iphone") {
    promise.then((result) => {
      for (let i = 0; i < result.data.length; i++) {
        let sp = result.data[i];
        if (sp.type.toLowerCase() == "iphone") {
          arrContent2 += `<tr>
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
      }
      document.querySelector("#tableDanhSach").innerHTML = arrContent2;
    });
  } else if (loaiSP == "samsung") {
    promise.then((result) => {
      for (let i = 0; i < result.data.length; i++) {
        let sp = result.data[i];
        if (sp.type.toLowerCase() == "samsung") {
          arrContent2 += `<tr>
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
      }
      document.querySelector("#tableDanhSach").innerHTML = arrContent2;
    });
  } else {
    promise.then((result) => {
      for (let i = 0; i < result.data.length; i++) {
        let sp = result.data[i];
        arrContent2 += `<tr>
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
      document.querySelector("#tableDanhSach").innerHTML = arrContent2;
    });
  }
};

const showInnerCart = () => {
  const parseValue = JSON.parse(localStorage.getItem("dssp"));
  if (parseValue == null) {
    document.querySelector("#countNumber").innerHTML = 0;
  } else {
    let total = 0;
    for (let i = 0; i < parseValue.length; i++) {
      let sp = parseValue[i];
      total += sp.count;
    }
    document.querySelector("#countNumber").innerHTML = total;
  }
};
showInnerCart();

const delSP = (id) => {
  const parseValue = JSON.parse(localStorage.getItem("dssp"));
  const countNumber = document.querySelector("#countNumber");
  for (let i = 0; i < parseValue.length; i++) {
    let sp = parseValue[i];
    if (sp.id == id) {
      parseValue.splice(i, 1);
      countNumber.innerHTML = parseInt(countNumber.innerHTML) - sp.count;
    }
  }
  localStorage.setItem("dssp", JSON.stringify(parseValue));
  getLocal();
};

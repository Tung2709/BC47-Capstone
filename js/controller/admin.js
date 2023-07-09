function getElement(selector) {
  return document.querySelector(selector);
}

var mockAPI = "https://649e04749bac4a8e669e8718.mockapi.io/products";

var listProducts = new listPro();

// call API lấy dữ liệu từ MOCKAPI render ra trang ADMIN-------------------

function render(arr) {
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    var product = arr[i];
    content += `
		<tr>
    <td style="text-transform: capitalize;">${product.name}</td>
    <td>${product.price}</td>
    <td style="text-transform: capitalize;">${product.screen}</td>
    <td>${product.backCamera}</td>
    <td>${product.frontCamera}</td>
    <td><img src="${product.img}" alt="" style="width:50px;height:50px"></td>
    <td>${product.desc}</td>
    <td style="text-transform: capitalize;">${product.type}</td>
    <td>
    <button type="button" class="btn btn-success" onclick="btnEdit(${product.id})" data-toggle="modal" data-target="#myModal" >Edit</button>
    <button class="btn btn-danger" onclick="btnDelete(${product.id})">Delete</button>
    </td>       
    </tr>
		`;
  }
  getElement("#tableDanhSach").innerHTML = content;
}
function getAPI() {
  axios
    .get(mockAPI)
    .then(function (resp) {
      listProducts.arrPro = resp.data;
      render(listProducts.arrPro);
    })
    .catch(function (err) {
      // Handle Error Here
      console.log(err);
    });
}


window.onload = function(){
  getAPI();
}

// Validation--------------------------------------------------------------
//Kiểm tra name , img , thương hiệu không được bỏ trống
getElement("#name").onblur = function () {
  var name = getElement("#name").placeholder;
  var value = getElement("#name").value;
  var alert = "#tbTenSP";
  checkEmty(value, alert, name);
};
getElement("#image").onblur = function () {
  var name = getElement("#image").placeholder;
  var value = getElement("#image").value;
  var alert = "#tbImage";
  checkEmty(value, alert, name);
};
getElement("#typeSP").onblur = function () {
  var name = getElement("#typeSP").placeholder;
  var value = getElement("#typeSP").value;
  var alert = "#tbTypeSP";
  checkEmty(value, alert, name);
};

//Kiểm tra giá không được bỏ trống, phải là số
getElement("#price").onblur = function () {
  var name = getElement("#price").placeholder;
  var value = getElement("#price").value;
  var alert = "#spGiaSP";
  if (checkEmty(value, alert, name)) {
    if (checkNumber(value, alert, name)) {
      checkValue(value, alert, name, 1000, 50000);
    }
  }
};
//Kiểm tra desc không được bỏ trống,
getElement("#desc").onblur = function () {
  var name = getElement("#desc").placeholder;
  var value = getElement("#desc").value;
  var alert = "#tbDesc";
  if (checkEmty(value, alert, name)) {
    checkLength(value, alert, name, 10, 50);
  }
};

//Kiểm tra screen, backCamera, frontCamera không được bỏ trống
getElement("#screen").onblur = function () {
  var name = getElement("#screen").placeholder;
  var value = getElement("#screen").value;
  var alert = "#tbScreen";
  if (checkEmty(value, alert, name)) {
    checkHaveNumber(value, alert, name);
  }
};
getElement("#BackCMR").onblur = function () {
  var name = getElement("#BackCMR").placeholder;
  var value = getElement("#BackCMR").value;
  var alert = "#tbBCMR";
  if (checkEmty(value, alert, name)) {
    checkHaveNumber(value, alert, name);
  }
};

getElement("#FrontCMR").onblur = function () {
  var name = getElement("#FrontCMR").placeholder;
  var value = getElement("#FrontCMR").value;
  var alert = "#tbFCMR";
  if (checkEmty(value, alert, name)) {
    checkHaveNumber(value, alert, name);
  }
};

function checkValid() {
  var name = getElement("#name").value;
  var price = getElement("#price").value;
  var screen = getElement("#screen").value;
  var backCamera = getElement("#BackCMR").value;
  var frontCamera = getElement("#FrontCMR").value;
  var img = getElement("#image").value;
  var desc = getElement("#desc").value;
  var type = getElement("#typeSP").value;

  var valid =
    checkEmty(name, "#tbTenSP", getElement("#name").placeholder) &
    checkEmty(price, "#spGiaSP", getElement("#price").placeholder) &
    checkEmty(screen, "#tbScreen", getElement("#screen").placeholder) &
    checkEmty(backCamera, "#tbBCMR", getElement("#BackCMR").placeholder) &
    checkEmty(frontCamera, "#tbFCMR", getElement("#FrontCMR").placeholder) &
    checkEmty(img, "#tbImage", getElement("#image").placeholder) &
    checkEmty(desc, "#tbDesc", getElement("#desc").placeholder) &
    checkEmty(type, "#tbTypeSP", getElement("#typeSP").placeholder);

  if (checkEmty(price, "#spGiaSP", getElement("#price").placeholder)) {
    valid &= checkNumber(price, "#spGiaSP", getElement("#price").placeholder);
    if (checkNumber(price, "#spGiaSP", getElement("#price").placeholder)) {
      valid &= checkValue(
        price,
        "#spGiaSP",
        getElement("#price").placeholder,
        1000,
        50000
      );
    }
  }

  if (checkEmty(desc, "#tbDesc", getElement("#desc").placeholder)) {
    valid &= checkLength(
      desc,
      "#tbDesc",
      getElement("#desc").placeholder,
      10,
      50
    );
  }

  if (checkEmty(backCamera, "#tbBCMR", getElement("#BackCMR").placeholder)) {
    valid &= checkHaveNumber(
      backCamera,
      "#tbBCMR",
      getElement("#BackCMR").placeholder
    );
  }
  if (checkEmty(frontCamera, "#tbFCMR", getElement("#FrontCMR").placeholder)) {
    valid &= checkHaveNumber(
      frontCamera,
      "#tbFCMR",
      getElement("#FrontCMR").placeholder
    );
  }
  if (checkEmty(screen, "#tbScreen", getElement("#screen").placeholder)) {
    valid &= checkHaveNumber(
      screen,
      "#tbScreen",
      getElement("#screen").placeholder
    );
  }

  console.log(valid);

  return valid;
}

// Add sản phẩm------------------------------------------------------------
getElement("#btnThemSP").onclick = function () {
  if (!checkValid()) {
    alert("Điền chính xác thông tin");
    return;
  }
  var name = getElement("#name").value;
  var price = getElement("#price").value;
  var screen = getElement("#screen").value;
  var backCamera = getElement("#BackCMR").value;
  var frontCamera = getElement("#FrontCMR").value;
  var img = getElement("#image").value;
  var desc = getElement("#desc").value;
  var type = getElement("#typeSP").value;
  var addPro = new products(
    (id = ""),
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  promise = axios({
    url: mockAPI,
    method: "POST",
    data: addPro,
  });

  promise
    .then(function () {
      getAPI();
      render(listProducts.arrPro);
      getElement("#btnDong").click();
      alert("Thêm thành công");
    })
    .catch(function () {
      alert("Thêm thất bại");
    });
};

// Edit sản phẩm-----------------------------------------------------------

function btnEdit(id) {
  var arrPro = listProducts.arrPro;
  for (i = 0; i < arrPro.length; i++) {
    if (id == arrPro[i].id) {
      getElement("#name").value = arrPro[i].name;
      getElement("#price").value = arrPro[i].price;
      getElement("#screen").value = arrPro[i].screen;
      getElement("#BackCMR").value = arrPro[i].backCamera;
      getElement("#FrontCMR").value = arrPro[i].frontCamera;
      getElement("#image").value = arrPro[i].img;
      getElement("#desc").value = arrPro[i].desc;
      getElement("#typeSP").value = arrPro[i].type.toLowerCase();

      getElement(
        "#capNhat"
      ).innerHTML = `<button id="btnCapNhat" type="button" onclick="editProduct(${arrPro[i].id})" class="btn btn-primary" >Sửa Thông Tin</button>`;
    }
  }
}

function editProduct(idProduct) {
  if (!checkValid()) {
    alert("Điền chính xác thông tin");
    return;
  }
  var id = idProduct;
  var name = getElement("#name").value;
  var price = getElement("#price").value;
  var screen = getElement("#screen").value;
  var backCamera = getElement("#BackCMR").value;
  var frontCamera = getElement("#FrontCMR").value;
  var img = getElement("#image").value;
  var desc = getElement("#desc").value;
  var type = getElement("#typeSP").value;

  checkValid();

  var editPro = new products(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  console.log(editPro);
  // gửi thông tin sp đã chỉnh sửa
  promise = axios({
    url: `${mockAPI}/${id}`,
    method: "PUT",
    data: editPro,
  });

  promise
    .then(function () {
      getElement("#btnDong").click();
      getAPI();
      render(listProducts.arrPro);
      alert("Cập nhật thành công");
    })
    .catch(function () {
      alert("Cập nhật thất bại");
    });
}

// Delete sản phẩm-----------------------------------------------------------

function btnDelete(id) {
  //find thông tin sp muốn xóa
  var arrPro = listProducts.arrPro;
  console.log(id);
  for (i = 0; i < arrPro.length; i++) {
    if (id == arrPro[i].id) {
      // gửi repuest xóa sp
      promise = axios({
        url: `${mockAPI}/${id}`,
        method: "DELETE",
      });

      promise
        .then(function () {
          getAPI();
          render(listProducts.arrPro);
          alert("Xóa thành công");
        })
        .catch(function () {
          alert("Xóa thất bại");
        });
    }
  }
}

// button đóng---------------------------------------------------------------
getElement("#btnDong").onclick = function () {
  getElement("#tbTenSP").style.display = "none";
  getElement("#spGiaSP").style.display = "none";
  getElement("#tbScreen").style.display = "none";
  getElement("#tbBCMR").style.display = "none";
  getElement("#tbFCMR").style.display = "none";
  getElement("#tbImage").style.display = "none";
  getElement("#tbDesc").style.display = "none";
  getElement("#tbTypeSP").style.display = "none";

  getElement("#fromList").reset();
};

// Tìm kiếm sản phẩm theo tên
getElement("#btnSearch").onclick = function () {
  var namePro = getElement("#searchPro").value.toLowerCase();
  if (namePro) {
    var sp = [];
    for (var i = 0; i < listProducts.arrPro.length; i++) {
      var namesp = listProducts.arrPro[i].name.toLowerCase();
      if (namesp.indexOf(namePro) != -1) {
        sp.push(listProducts.arrPro[i]);
      }
    }
    if (Object.keys(sp).length) {
      render(sp);
    } else if (Object.keys(sp).length === 0) {
      getElement("#tableDanhSach").innerHTML =
        "KHÔNG CÓ KẾT QUẢ PHÙ HỢP OKE CHƯA!!!";
    }
  } else {
    render(listProducts.arrPro)
  }
};

getElement("#searchPro").onblur = function () {
  var namePro = getElement("#searchPro").value.toLowerCase();
  if (!namePro) {
    render(listProducts.arrPro)
  }
};

// sắp xếp sản phẩm---------------------------------------------------------------

getElement("#sapXep").onchange = function () {
  if (getElement("#sapXep").value == 1) {
    var array=listProducts.arrPro
    console.log
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (+array[j].price < +array[i].price) {
          var t = array[i];
          array[i] = array[j];
          array[j] = t;
        }
      }
    }
    render(array)
  }
  else if (getElement("#sapXep").value == 2) {
    var arrlist = listProducts
    var array=arrlist.arrPro
    console.log
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (+array[j].price > +array[i].price) {
          var t = array[i];
          array[i] = array[j];
          array[j] = t;
        }
      }
    }
    render(array)
  }
  else{
    getAPI()
  }
};

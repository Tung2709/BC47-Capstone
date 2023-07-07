function getElement(selector) {
  return document.querySelector(selector);
}

var listProducts = new listPro();

// call API lấy dữ liệu từ MOCKAPI

axios
  .get("https://649e04749bac4a8e669e8718.mockapi.io/products")
  .then(function (resp) {
    listProducts.arrPro = resp.data;
    var content = "";
    for (var i = 0; i < listProducts.arrPro.length; i++) {
      var product = listProducts.arrPro[i];
      content += `
		<tr id="${product.name}">
    <td style="text-transform: capitalize;">${product.name}</td>
    <td>${product.price}</td>
    <td style="text-transform: capitalize;">${product.screen}</td>
    <td>${product.backCamera}</td>
    <td>${product.frontCamera}</td>
    <td><img src="${product.img}" alt="" style="width:50px;height:50px"></td>
    <td>${product.desc}</td>
    <td style="text-transform: capitalize;">${product.type}</td>
    <td><button class="btn btn-success">Edit</button><button class="btn btn-danger">Delete</button></td>       
    </tr>
		`;
    }
    getElement("#tableDanhSach").innerHTML = content;
  })
  .catch(function (err) {
    // Handle Error Here
    console.log(err);
  });

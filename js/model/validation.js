// kiểm cho các thông tin nhân viên điền vào

function checkEmty(value, alert, name) {
  if (!value) {
    getElement(alert).style.display = "block";
    getElement(alert).style.color = "white";
    getElement(alert).innerHTML = name + " không được bỏ trống";
    return false;
  }

  if (value === "thuong hieu") {
    getElement(alert).style.display = "block";
    getElement(alert).style.color = "white";
    getElement(alert).innerHTML = "Hãy chọn thương hiệu";
    return false;
  }

  getElement(alert).style.display = "none";
  getElement(alert).innerHTML = " ";
  return true;
}

function checkNumber(value, alert, name) {
  var regexNumber = /^\d+$/;
  var number = regexNumber.test(value);
  if (!number) {
    getElement(alert).style.display = "block";
	getElement(alert).style.color = "white";
    getElement(alert).innerHTML = name + " chỉ được điền số";
    return false;
  }
  getElement(alert).style.display = "none";
  getElement(alert).innerHTML = " ";
  return true;
}

function checkHaveNumber(value, alert, name) {
	var regex =/\d/;
	var number = regex.test(value);
	if (!number) {
	  getElement(alert).style.display = "block";
	  getElement(alert).style.color = "white";
	  getElement(alert).innerHTML = name + " phải có số";
	  return false;
	}
	getElement(alert).style.display = "none";
	getElement(alert).innerHTML = " ";
	return true;
  }

function checkLength(value, alert, name, minLength, maxLength) {
  if (value.length < minLength || value.length > maxLength) {
    document.querySelector(alert).style.display = "block";
    getElement(alert).style.color = "white";
    document.querySelector(alert).innerHTML =
      name+" phải có độ dài từ " + minLength + " đến " + maxLength + " ký tự";
    return false;
  }
  document.querySelector(alert).style.display = "none";
  document.querySelector(alert).innerHTML = "";
  return true;
}

// Kiểm thông tin có phải là chữ
function checkLetter(value, alert) {
  var regex =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  if (regex.test(value)) {
    document.querySelector(alert).style.display = "none";
    document.querySelector(alert).innerHTML = "";
    return true;
  }
  document.querySelector(alert).style.display = "block";
  document.querySelector(alert).innerHTML = "Phải là chuỗi ký tự";
  return false;
}

//Kiểm tra định dạng email
function checkEmail(value, alert) {
  var regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(value)) {
    document.querySelector(alert).style.display = "none";
    document.querySelector(alert).innerHTML = "";
    return true;
  }
  document.querySelector(alert).style.display = "block";
  document.querySelector(alert).innerHTML =
    "Phải đúng theo định dạng. Ví dụ: abc@gmail.com";
  return false;
}

// Kiểm định dạng mật khẩu
function checkPassword(value, alert) {
  var regex = /(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  if (regex.test(value)) {
    document.querySelector(alert).style.display = "none";
    document.querySelector(alert).innerHTML = "";
    return true;
  }
  document.querySelector(alert).style.display = "block";
  document.querySelector(alert).innerHTML =
    "Phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
  return false;
}

// Kiểm tra định dạng ngày làm
function checkDate(value, alert) {
  var regex =
    /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
  if (regex.test(value)) {
    document.querySelector(alert).style.display = "none";
    document.querySelector(alert).innerHTML = "";
    return true;
  }
  document.querySelector(alert).style.display = "block";
  document.querySelector(alert).innerHTML = "Phải đúng định dạng dd/mm/yyyy";
  return false;
}

//Kiểm tra min - max
function checkValue(value, alert, name, minValue, maxValue) {
  if (value < minValue || value > maxValue) {
    document.querySelector(alert).style.display = "block";
    document.querySelector(alert).style.color = "white";
    document.querySelector(alert).innerHTML =
      name + " phải từ " + minValue + " đến " + maxValue;
    return false;
  }
  document.querySelector(alert).style.display = "none";
  document.querySelector(alert).innerHTML = "";
  return true;
}

//   getElement("#tknv").onblur = function () {
// 	if (checkEmty(getElement("#tknv").value, "#tbTKNV")) {
// 		if (checkNumber(getElement("#tknv").value, "#tbTKNV")) {
// 			checkLength(getElement("#tknv").value.trim(), "#tbTKNV", 4, 6);
// 	  }
// 	}
//   };
//   getElement("#name").onblur = function () {
// 	if (checkEmty(getElement("#name").value.trim(), "#tbTen")) {

// 	  checkLetter(getElement("#name").value, "#tbTen");
// 	}
//   };
//   getElement("#email").onblur = function () {
// 	  if (checkEmty(getElement("#email").value, "#tbEmail")) {
// 		   checkEmail(getElement("#email").value, "#tbEmail");
// 		}

//   };
//   getElement("#password").onblur = function () {
// 	  if (checkEmty(getElement("#password").value, "#tbMatKhau")) {
// 		  if (checkLength(getElement("#password").value, "#tbMatKhau", 6, 10)) {
// 			checkPassword(getElement("#password").value, "#tbMatKhau");
// 		  }
// 		}
//   };
//   getElement("#datepicker").onblur = function () {
// 	  if (checkEmty(getElement("#datepicker").value, "#tbNgay")) {
// 		  checkDate(getElement("#datepicker").value, "#tbNgay");
// 		}
//   };
//   getElement("#luongCB").onblur = function () {
// 	  if (checkEmty(getElement("#luongCB").value, "#tbLuongCB")) {
// 		  checkValue(getElement("#luongCB").value, "#tbLuongCB", 1000000, 20000000);
// 		}
//   };
//   getElement("#chucvu").onblur = function () {
// 	checkEmty(getElement("#chucvu").value, "#tbChucVu");
//   };
//   getElement("#gioLam").onblur = function () {
// 	  if (checkEmty(getElement("#gioLam").value, "#tbGiolam")) {
// 		  checkValue(getElement("#gioLam").value, "#tbGiolam", 80, 200);
// 		}
//   };

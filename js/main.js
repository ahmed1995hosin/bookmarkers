// selection elements
const bookmarkName = document.getElementById("bookmarkName");
const websiteUrl = document.getElementById("bookmarkUrl");
const btnSubmit = document.getElementById("mainBtn");
const tableContent = document.getElementById("tableContent");
const popUp = document.querySelector(".popup");
var btnDelete;
var btnVisit;

let bookmarkArrays = JSON.parse(localStorage.getItem("bookmarkList")) || [];
console.log(bookmarkArrays);

if (localStorage.getItem("bookmarkList")) {
  for (let index = 0; index < bookmarkArrays.length; index++) {
    displayBookmark(index);
  }
}
// displayBookmark() function;
function displayBookmark(index) {
  // custom attributes for the data-index
  var elements = `<tr>
<td>${index + 1}</td>
<td>${bookmarkArrays[index].bookmarkName}</td>
<td>
  <button type="button" class="btn btn-visit" data-index="${index}">
    <i class="fa-solid fa-eye pe-2"></i>Visit
  </button>
</td>
<td>
  <button type="button" class="btn btn-delete" data-index="${index}">
    <i class="fa-solid fa-trash-can pe-2"></i>Delete
  </button>
</td>
</tr>
`;
  tableContent.innerHTML += elements;
  // event delete  button
  btnDelete = document.querySelectorAll(".btn-delete");
  for (let i = 0; i < btnDelete.length; i++) {
    btnDelete[i].addEventListener("click", function (e) {
      console.log(e.target.dataset);
      deleteBookmark(e.target.dataset);
    });
  }
  // event visit button
  btnVisit = document.querySelectorAll(".btn-visit");
  for (let i = 0; i < btnVisit.length; i++) {
    btnVisit[i].addEventListener("click", function (e) {
      console.log(e.target.dataset);
      visitBookmark(e.target.dataset);
    });
  }
}
// delete bookmark function
function deleteBookmark(ele) {
  tableContent.innerHTML = "";
  bookmarkArrays.splice(ele.index, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkArrays));
  for (var i = 0; i < bookmarkArrays.length; i++) {
    displayBookmark(i);
  }
}
// visitBookmark function
function visitBookmark(element) {
  var rexExTest = /^http(s)?\:\/\//;
  if (regularExpression(bookmarkArrays[element.index].websiteUrl, rexExTest)) {
    open(bookmarkArrays[element.index].websiteUrl);
  } else {
    open(`https://${bookmarkArrays[element.index].websiteUrl}`);
  }
}

const regExUrl =
  /^(http(s?)(:\/\/))?(w{3,4}\.)?\w+\.\w+(:\d{2,5})?((\/|\=)(.)+)*$/;
const regExName = /^\D+\w*(\s*\w+)*$/;
//function regular expression pattern for URL and name
function regularExpression(str, regExp) {
  return new RegExp(regExp, "g").test(str);
}
//check name matches  of web
bookmarkName.addEventListener("input", function (e) {
  validationInput(e, regExName);
});
//check name matches  of url web
websiteUrl.addEventListener("input", function (e) {
  validationInput(e, regExUrl);
});
// validate(check) name and  url
function validationInput(item, regExp) {
  if (regularExpression(item.target.value, regExp)) {
    item.target.classList.add("is-valid");
    item.target.classList.remove("is-invalid");
  } else {
    item.target.classList.add("is-invalid");
    item.target.classList.remove("is-valid");
  }
}
// clearInput function
function clearInput() {
  bookmarkName.value = "";
  websiteUrl.value = "";
}
// capitalization function
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
// submit function
btnSubmit.addEventListener("click", function (e) {
  if (
    bookmarkName.classList.contains("is-valid") &&
    websiteUrl.classList.contains("is-valid")
  ) {
    let bookmark = {
      bookmarkName: capitalize(bookmarkName.value),
      websiteUrl: websiteUrl.value,
    };
    bookmarkArrays.push(bookmark);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkArrays));
    clearInput();
    bookmarkName.classList.remove("is-valid");
    websiteUrl.classList.remove("is-valid");
    displayBookmark(bookmarkArrays.length - 1);
  } else {
    popUp.classList.remove("d-none");
  }
});
// function close popUp
function closePopUp() {
  popUp.classList.add("d-none");
}

// there are three ways to  close popup
popUp.addEventListener("click", function (e) {
  closePopUp();
  // if (e.target.classList.contains("popup")) closePopUp();
});
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") closePopUp();
});

document.getElementById("closeBtn").addEventListener("click", closePopUp);

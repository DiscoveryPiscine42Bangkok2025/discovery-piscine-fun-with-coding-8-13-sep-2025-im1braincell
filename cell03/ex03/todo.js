const LIST_ID = "ft_list";
const COOKIE_NAME = "todo_list";

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days*24*60*60*1000);
  document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
  const key = name + "=";
  const parts = document.cookie.split("; ");
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].indexOf(key) === 0) return decodeURIComponent(parts[i].substring(key.length));
  }
  return "";
}

function save() {
  const list = document.getElementById(LIST_ID);
  const items = [];
  for (let i = 0; i < list.children.length; i++) {
    items.push(list.children[i].textContent);
  }
  setCookie(COOKIE_NAME, JSON.stringify(items), 365);
}

function makeItem(text) {
  const item = document.createElement("div");
  const tnode = document.createTextNode(text);
  item.appendChild(tnode);
  item.className = "todo";
  item.addEventListener("click", function () {
    if (confirm("Do you want to remove this TO DO?")) {
      const list = document.getElementById(LIST_ID);
      list.removeChild(item);
      save();
    }
  });
  return item;
}

function addTop(text, doSave = true) {
  const list = document.getElementById(LIST_ID);
  const item = makeItem(text);
  list.insertBefore(item, list.firstChild);
  if (doSave) save();
}

function loadFromCookie() {
  const raw = getCookie(COOKIE_NAME);
  if (!raw) return;
  let arr = [];
  try { arr = JSON.parse(raw); } catch(e) { arr = []; }
  for (let i = arr.length - 1; i >= 0; i--) {
    addTop(arr[i], false);
  }
}

document.getElementById("new").addEventListener("click", function () {
  let txt = prompt("What is your new TO DO?");
  if (txt === null) return;
  txt = txt.trim();
  if (txt.length === 0) return;
  addTop(txt);
});

document.addEventListener("DOMContentLoaded", loadFromCookie);

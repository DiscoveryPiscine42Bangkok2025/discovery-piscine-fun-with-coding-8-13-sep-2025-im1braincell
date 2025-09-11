const LIST_ID = "ft_list";
const COOKIE_NAME = "todo_list";

function sc(name, val, days) {
  var d = new Date();
  d.setTime(d.getTime() + days*24*60*60*1000);
  document.cookie = name + "=" + encodeURIComponent(val) +
                    ";expires=" + d.toUTCString() + ";path=/";
}

function rc(name) {
  var key = name + "=";
  var parts = document.cookie.split("; ");
  for (var i=0; i<parts.length; i++) {
    if (parts[i].indexOf(key) === 0) return decodeURIComponent(parts[i].substring(key.length));
  }
  return "";
}

function sl() {
  var box = document.getElementById(LIST_ID);
  var arr = [];
  for (var i=0; i<box.children.length; i++) arr.push(box.children[i].textContent);
  sc(COOKIE_NAME, JSON.stringify(arr), 365);
}

function ci(txt) {
  var el = document.createElement("div");
  el.className = "todo";
  el.appendChild(document.createTextNode(txt));
  el.addEventListener("click", function () {
    var ok = confirm("Do you want to remove this TO DO?");
    if (ok) {
      var box = document.getElementById(LIST_ID);
      box.removeChild(el);
      sl();
    }
  });
  return el;
}

function at(txt, save) {
  var box = document.getElementById(LIST_ID);
  var el = ci(txt);
  box.insertBefore(el, box.firstChild);
  if (save === true) sl();
}

function ld() {
  var raw = rc(COOKIE_NAME);
  if (raw === "") return;
  var arr;
  try { arr = JSON.parse(raw); } catch(e) { arr = []; }
  for (var i=arr.length-1; i>=0; i--) at(arr[i], false);
}

document.getElementById("new").addEventListener("click", function () {
  let txt = prompt("What is your new TO DO?");
  if (txt === null) return;
  txt = txt.trim();
  if (txt.length === 0) return;
  at(txt);
});

document.addEventListener("DOMContentLoaded", ld);

var lstid = "ft_list";
var COOKIE_NAME = "todo_list";

function sc(name, value, days){
  var d = new Date();
  d.setTime(d.getTime() + days*24*60*60*1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function rc(name){
  var key = name + "=";
  var parts = document.cookie.split(";");
  for(var i=0; i<parts.length; i++){
    if(parts[i].indexOf(key) === 0){
      return decodeURIComponent(parts[i].substring(key.length));
    }
  }
  return "";
}

function sl(){
  var items = [];
  $("#" + lstid).children(".todo").each(function(){
    items.push($(this).text());
  });
  sc(COOKIE_NAME, JSON.stringify(items), 365);
}

function ci(txt){
  var $el = $("<div/>", { "class":"todo", "text": txt, "tabindex": 0, "title":"Click to remove" });

  $el.on("click", function(e){
    if(e.type === "click"){
      if(confirm("Do you want to remove this TO DO?")){
        $(this).remove();
        sl();
      }
    }
  });

  return $el;
}

function at(txt, save){
  if(save === undefined) save = true;
  var $list = $("#" + lstid);
  var $item = ci(txt);
  $list.prepend($item);
  if(save) sl();
}

function ld(){
  var raw = rc(COOKIE_NAME);
  if(!raw) return;

  var arr;
  try{
    arr = JSON.parse(raw);
    if(!Array.isArray(arr)) arr = [];
  }catch(_){
    arr = [];
  }

  for(var i = arr.length - 1; i >= 0; i--){
    at(arr[i], false);
  }
}

$(function(){
  $("#new").on("click", function(){
    var txt = prompt("New TO DO:");
    if(txt === null) return;
    txt = $.trim(txt);
    if(!txt) return;
    at(txt);
  });

  ld();
});

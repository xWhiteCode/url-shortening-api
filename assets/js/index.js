(function () {

  const Request = async ($URL) => await (await fetch($URL)).json(),
  Connect = function ($URL) {
    Request(`https://is.gd/create.php?format=json&url=${$URL}`).then(data => show(data, $URL)).catch(err => Error(err));
  };
  
  let ID = 0;

  function addSessionStorage (v) {

    let $URL = sessionStorage.getItem("URL") ? JSON.parse(sessionStorage.getItem("URL")) : [];
    
    $URL.push(v);

    sessionStorage.setItem("URL", JSON.stringify($URL));

  }
  
  function show ($data, longURL) {

    let url = {};
    
    url.id = ID++;
    url.longURL = longURL;
    url.shorturl = $data.shorturl;


    addSessionStorage(url);

    showSessionStorage();

  }

  function toggleMenu () {

    const toggle = document.getElementById("toggle"),
      menu = document.getElementById("menu");

      toggle.addEventListener("click", () => menu.classList.toggle("active"));

  }

  function noDrag () {

    const images = document.querySelectorAll("img");

    images.forEach(img => img.draggable = false);

  }

  function showSessionStorage() {
    let result = document.getElementById("result");
    result.innerHTML = "";
    if (sessionStorage.getItem("URL")) {
      let $URL = JSON.parse(sessionStorage.getItem("URL"));
      $URL.forEach(obj => {
        result.innerHTML +=  `<div class="xl:flexbox" style="background-color: white; padding: 10px 24px;border-radius:8px; margin:20px 0">
  <p>${obj.longURL}</p>
  <div class="xl:flexbox">
    <a href="${obj.shorturl}" style="color: hsl(180, 66%, 49%);display:block; margin:20px" target="_blank">${obj.shorturl}</a>
    <button type="button" onclick="copy(this)" aria-label="copy URL" data-url="${obj.shorturl}" class="copy cyanBtn flexbox" style="border-radius:8px">Copy</button>
  </div>
</div>`;
      });
    }
  }
  function copySize() {
    console.log(window.matchMedia("max-width: 1199px"));
    document.querySelectorAll(".copy").forEach(e => {
        if (window.matchMedia("(max-width: 1199px)").matches) {
          e.style.cssText = "border-radius:8px;width:100%;justify-content:center";
        } else {
          e.style.cssText = "border-radius:8px;width:auto;justify-content:center";        }
      });
  }

  window.addEventListener("resize", copySize);

  this.copy = function (v) {
    try {
      navigator.clipboard.writeText(v.dataset.url);
      document.querySelectorAll(".copy").forEach(c => {
        c.innerHTML = "Copy";
        c.style.backgroundColor = "hsl(180, 66%, 49%)";
      });
      v.innerHTML = "Copied";
      v.style.backgroundColor = "hsl(257, 27%, 26%)";
    } catch (err) {
      throw err;
    }
  }
  
  function main () {

    const search = document.getElementById("search"),
      submit = document.getElementById("submit");

    submit.addEventListener("click", function () {

      const err = document.getElementById("err");
      if (search.value.trim() != "") {
        err.style.display = "none";
        Connect(search.value);
      } else {
        err.style.display = "block";
      }

    });
   
    showSessionStorage();
    toggleMenu();
    noDrag();
    copySize();

  }

  main();

})();

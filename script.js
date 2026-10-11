gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".jutsu-box").forEach((box) => {
  const isLeft = box.classList.contains("left-box");

  gsap.fromTo(
    box,
    {
      x: isLeft ? -300 : 300,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: box,
        start: "top 80%",
        end: "top 35%",
        scrub: 1.5,
        delay: 1,
      },
    },
  );
});

let form = document.querySelector(".search-box");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("search-input").value;
  fetchData(input);
  form.reset()
});

const API_LINK = "https://dattebayo-api.onrender.com/characters?name=";
function fetchData(input) {
  fetch(`${API_LINK}${input}`)
    .then((response) => response.json())
    .then((data) => {
      data.characters?.[0] ? showData(data.characters[0]) : err();
    })
    .catch(console.error);
}
fetchData("naruto");

const output = document.getElementById("search-output");
function showData(data) {
  let image = data.images?.[0] ? data.images[0] : "fallback.jpg";
  let name = data.name ? data.name : "unknow";
  let clan = data.personal.clan ? data.personal.clan : "unknow";
  let jutsu = data.jutsu?.[0] ? data.jutsu[0] : "unknow";
  let title = data.personal.titles?.[0] ? data.personal.titles[0] : "unknown";
  let nature = data.natureType?.[0] ? data.natureType[0] : "unknow";
  output.innerHTML = `
    <div class="shinobi-image">
    <img src="${image}" alt="" />
    </div>
    <div class="shinobi">
        <p class="shinobi-name"><span>NAME :</span> ${name}</p>
        <p class="shinobi-clan"><span>CLAN :</span> ${clan}</p>
        <p class="shinobi-jutsu"><span>JUTSU :</span> ${jutsu}</p>
        <p class="shinobi-tite"><span>TITLE :</span> ${title}</p>
        <p class="shinobi-nature"><span>NATURE TYPE :</span> ${nature}</p>
        </div>
  `;
}

function err(){
  output.innerHTML = `Character Not Found`
}

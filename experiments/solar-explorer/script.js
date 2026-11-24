
const planets = [
  {
    name: "Mercury",
    className: "mercury",
    type: "Terrestrial",
    tagline: "The smallest planet",
    description: "Mercury is the smallest planet in our Solar System and the closest to the Sun. Its surface is covered with craters, much like our Moon.",
    day: "58.6 Earth days",
    year: "88 Earth days",
    moons: "0",
    fact: "A single day on Mercury lasts longer than its entire year."
  },
  {
    name: "Venus",
    className: "venus",
    type: "Terrestrial",
    tagline: "Our hottest neighbor",
    description: "Venus is wrapped in thick clouds that trap heat. Although Mercury is closer to the Sun, Venus is the hottest planet in our Solar System.",
    day: "243 Earth days",
    year: "225 Earth days",
    moons: "0",
    fact: "Venus rotates in the opposite direction to most planets."
  },
  {
    name: "Earth",
    className: "earth",
    type: "Terrestrial",
    tagline: "Our home planet",
    description: "Earth is the only world we currently know to support life. Its liquid water, protective atmosphere, and comfortable distance from the Sun make it special.",
    day: "24 hours",
    year: "365.25 days",
    moons: "1",
    fact: "About 71% of Earth's surface is covered by water."
  },
  {
    name: "Mars",
    className: "mars",
    type: "Terrestrial",
    tagline: "The Red Planet",
    description: "Mars gets its rusty red color from iron-rich dust. It has enormous volcanoes, deep canyons, polar ice caps, and signs of ancient flowing water.",
    day: "24.6 hours",
    year: "687 Earth days",
    moons: "2",
    fact: "Mars is home to Olympus Mons, the largest known volcano in the Solar System."
  },
  {
    name: "Jupiter",
    className: "jupiter",
    type: "Gas giant",
    tagline: "The giant of our system",
    description: "Jupiter is the largest planet in the Solar System. It is a gas giant with powerful storms, colorful cloud bands, and a famous Great Red Spot.",
    day: "9.9 hours",
    year: "11.86 Earth years",
    moons: "95 confirmed",
    fact: "Jupiter's Great Red Spot is a giant storm that has lasted for centuries."
  },
  {
    name: "Saturn",
    className: "saturn",
    type: "Gas giant",
    tagline: "The ringed wonder",
    description: "Saturn is famous for its spectacular rings, made mostly of pieces of ice and rock. It is a gas giant with a large family of moons.",
    day: "10.7 hours",
    year: "29.4 Earth years",
    moons: "146 confirmed",
    fact: "Saturn is less dense than water, so in a gigantic ocean it would float."
  },
  {
    name: "Uranus",
    className: "uranus",
    type: "Ice giant",
    tagline: "The sideways planet",
    description: "Uranus is an ice giant with a blue-green color caused by methane in its atmosphere. It rotates on its side, giving it very unusual seasons.",
    day: "17.2 hours",
    year: "84 Earth years",
    moons: "28 confirmed",
    fact: "Uranus is tilted so far that it essentially rolls around the Sun on its side."
  },
  {
    name: "Neptune",
    className: "neptune",
    type: "Ice giant",
    tagline: "The distant blue world",
    description: "Neptune is the most distant recognized planet from the Sun. It is a cold, dark world with powerful winds and a deep blue appearance.",
    day: "16.1 hours",
    year: "165 Earth years",
    moons: "16 confirmed",
    fact: "Neptune has some of the fastest winds measured on any planet."
  }
];

const facts = [
  "The Sun contains more than 99% of the total mass of the Solar System.",
  "Jupiter is so large that more than 1,300 Earths could fit inside it by volume.",
  "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
  "A year on Neptune lasts about 165 Earth years.",
  "Venus is hotter than Mercury, even though Mercury is closer to the Sun.",
  "Saturn's rings are made mostly of ice particles, with some rocky material.",
  "Mars has the largest volcano known in the Solar System.",
  "Uranus has an extreme axial tilt and rotates almost on its side."
];

const planetGrid = document.getElementById("planetGrid");
const detailVisual = document.getElementById("detailVisual");
const detailName = document.getElementById("detailName");
const detailDescription = document.getElementById("detailDescription");
const detailType = document.getElementById("detailType");
const detailDay = document.getElementById("detailDay");
const detailYear = document.getElementById("detailYear");
const detailMoons = document.getElementById("detailMoons");
const detailFact = document.getElementById("detailFact");
const randomFact = document.getElementById("randomFact");
const factButton = document.getElementById("factButton");

function renderPlanetCards() {
  planetGrid.innerHTML = planets.map((planet, index) => `
    <button
      class="planet-card"
      type="button"
      data-planet="${index}"
      aria-pressed="false"
      aria-label="Explore ${planet.name}"
    >
      <span class="planet-number">PLANET 0${index + 1}</span>
      <span class="planet-art">
        <span class="planet-ball ${planet.className}"></span>
      </span>
      <h3>${planet.name}</h3>
      <p>${planet.tagline}</p>
    </button>
  `).join("");
}

function selectPlanet(index) {
  const planet = planets[index];

  if (!planet) return;

  document.querySelectorAll(".planet-card").forEach((card) => {
    const isActive = Number(card.dataset.planet) === index;
    card.classList.toggle("active", isActive);
    card.setAttribute("aria-pressed", String(isActive));
  });

  detailVisual.innerHTML = `
    <span class="detail-planet ${planet.className}" aria-hidden="true"></span>
  `;

  detailName.textContent = planet.name;
  detailDescription.textContent = planet.description;
  detailType.textContent = planet.type;
  detailDay.textContent = planet.day;
  detailYear.textContent = planet.year;
  detailMoons.textContent = planet.moons;
  detailFact.textContent = "✦ " + planet.fact;
}

function showRandomFact() {
  const currentFact = randomFact.textContent;
  const availableFacts = facts.filter((fact) => fact !== currentFact);
  const nextFact = availableFacts[
    Math.floor(Math.random() * availableFacts.length)
  ];

  randomFact.textContent = nextFact;
}

planetGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".planet-card");

  if (!card) return;

  selectPlanet(Number(card.dataset.planet));
});

factButton.addEventListener("click", showRandomFact);

renderPlanetCards();
selectPlanet(2);

const planets = [
  {
    name: "Mercury",
    className: "mercury",
    type: "Terrestrial",
    tagline: "The smallest planet",
    description: "Mercury is the smallest planet in our Solar System and the closest to the Sun. Its surface is covered with craters, much like our Moon.",
    day: "58.6 Earth days",
    year: "88 Earth days",
    moons: "0",
    fact: "A single day on Mercury lasts longer than its entire year."
  },
  {
    name: "Venus",
    className: "venus",
    type: "Terrestrial",
    tagline: "Our hottest neighbor",
    description: "Venus is wrapped in thick clouds that trap heat. Although Mercury is closer to the Sun, Venus is the hottest planet in our Solar System.",
    day: "243 Earth days",
    year: "225 Earth days",
    moons: "0",
    fact: "Venus rotates in the opposite direction to most planets."
  },
  {
    name: "Earth",
    className: "earth",
    type: "Terrestrial",
    tagline: "Our home planet",
    description: "Earth is the only world we currently know to support life. Its liquid water, protective atmosphere, and comfortable distance from the Sun make it special.",
    day: "24 hours",
    year: "365.25 days",
    moons: "1",
    fact: "About 71% of Earth's surface is covered by water."
  },
  {
    name: "Mars",
    className: "mars",
    type: "Terrestrial",
    tagline: "The Red Planet",
    description: "Mars gets its rusty red color from iron-rich dust. It has enormous volcanoes, deep canyons, polar ice caps, and signs of ancient flowing water.",
    day: "24.6 hours",
    year: "687 Earth days",
    moons: "2",
    fact: "Mars is home to Olympus Mons, the largest known volcano in the Solar System."
  },
  {
    name: "Jupiter",
    className: "jupiter",
    type: "Gas giant",
    tagline: "The giant of our system",
    description: "Jupiter is the largest planet in the Solar System. It is a gas giant with powerful storms, colorful cloud bands, and a famous Great Red Spot.",
    day: "9.9 hours",
    year: "11.86 Earth years",
    moons: "95 confirmed",
    fact: "Jupiter's Great Red Spot is a giant storm that has lasted for centuries."
  },
  {
    name: "Saturn",
    className: "saturn",
    type: "Gas giant",
    tagline: "The ringed wonder",
    description: "Saturn is famous for its spectacular rings, made mostly of pieces of ice and rock. It is a gas giant with a large family of moons.",
    day: "10.7 hours",
    year: "29.4 Earth years",
    moons: "146 confirmed",
    fact: "Saturn is less dense than water, so in a gigantic ocean it would float."
  },
  {
    name: "Uranus",
    className: "uranus",
    type: "Ice giant",
    tagline: "The sideways planet",
    description: "Uranus is an ice giant with a blue-green color caused by methane in its atmosphere. It rotates on its side, giving it very unusual seasons.",
    day: "17.2 hours",
    year: "84 Earth years",
    moons: "28 confirmed",
    fact: "Uranus is tilted so far that it essentially rolls around the Sun on its side."
  },
  {
    name: "Neptune",
    className: "neptune",
    type: "Ice giant",
    tagline: "The distant blue world",
    description: "Neptune is the most distant recognized planet from the Sun. It is a cold, dark world with powerful winds and a deep blue appearance.",
    day: "16.1 hours",
    year: "165 Earth years",
    moons: "16 confirmed",
    fact: "Neptune has some of the fastest winds measured on any planet."
  }
];

const facts = [
  "The Sun contains more than 99% of the total mass of the Solar System.",
  "Jupiter is so large that more than 1,300 Earths could fit inside it by volume.",
  "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
  "A year on Neptune lasts about 165 Earth years.",
  "Venus is hotter than Mercury, even though Mercury is closer to the Sun.",
  "Saturn's rings are made mostly of ice particles, with some rocky material.",
  "Mars has the largest volcano known in the Solar System.",
  "Uranus has an extreme axial tilt and rotates almost on its side."
];

const planetGrid = document.getElementById("planetGrid");
const detailVisual = document.getElementById("detailVisual");
const detailName = document.getElementById("detailName");
const detailDescription = document.getElementById("detailDescription");
const detailType = document.getElementById("detailType");
const detailDay = document.getElementById("detailDay");
const detailYear = document.getElementById("detailYear");
const detailMoons = document.getElementById("detailMoons");
const detailFact = document.getElementById("detailFact");
const randomFact = document.getElementById("randomFact");
const factButton = document.getElementById("factButton");

function renderPlanetCards() {
  planetGrid.innerHTML = planets.map((planet, index) => `
    <button
      class="planet-card"
      type="button"
      data-planet="${index}"
      aria-pressed="false"
      aria-label="Explore ${planet.name}"
    >
      <span class="planet-number">PLANET 0${index + 1}</span>
      <span class="planet-art">
        <span class="planet-ball ${planet.className}"></span>
      </span>
      <h3>${planet.name}</h3>
      <p>${planet.tagline}</p>
    </button>
  `).join("");
}

function selectPlanet(index) {
  const planet = planets[index];

  if (!planet) return;

  document.querySelectorAll(".planet-card").forEach((card) => {
    const isActive = Number(card.dataset.planet) === index;
    card.classList.toggle("active", isActive);
    card.setAttribute("aria-pressed", String(isActive));
  });

  detailVisual.innerHTML = `
    <span class="detail-planet ${planet.className}" aria-hidden="true"></span>
  `;

  detailName.textContent = planet.name;
  detailDescription.textContent = planet.description;
  detailType.textContent = planet.type;
  detailDay.textContent = planet.day;
  detailYear.textContent = planet.year;
  detailMoons.textContent = planet.moons;
  detailFact.textContent = "✦ " + planet.fact;
}

function showRandomFact() {
  const currentFact = randomFact.textContent;
  const availableFacts = facts.filter((fact) => fact !== currentFact);
  const nextFact = availableFacts[
    Math.floor(Math.random() * availableFacts.length)
  ];

  randomFact.textContent = nextFact;
}

planetGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".planet-card");

  if (!card) return;

  selectPlanet(Number(card.dataset.planet));
});

factButton.addEventListener("click", showRandomFact);

renderPlanetCards();
selectPlanet(2);

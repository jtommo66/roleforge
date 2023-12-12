const raceDropDown = document.querySelector(".inputs__race");

async function getRace() {
  const response = await axios.get("https://www.dnd5eapi.co/api/races");
  const racesInfoData = response.data;

  const racesObject = racesInfoData.results;

  for (let i = 0; i < racesObject.length; i++) {
    const raceArray = racesObject[i].name;
    console.log(raceArray);
    //create elements
    const inputRaceEl = document.createElement("option");
    inputRaceEl.classList.add("inputs__race-option");
    inputRaceEl.innerText = racesObject[i].name;

    raceDropDown.appendChild(inputRaceEl);
  }
}

getRace();

const number = Math.trunc(Math.random() * 20) + 1;
console.log(number);

const classDropDown = document.querySelector(".inputs__class");

async function getClass() {
  const response = await axios.get("https://www.dnd5eapi.co/api/classes");
  const classesInfoData = response.data;

  const classesObject = classesInfoData.results;

  for (let j = 0; j < classesObject.length; j++) {
    const classesArray = classesObject[j].name;

    console.log(classesArray);

    const inputClassEl = document.createElement("option");
    inputClassEl.classList.add("inputs__class-option");
    inputClassEl.innerText = classesObject[j].name;

    classDropDown.appendChild(inputClassEl);
  }
}

getClass();

const formEl = document.querySelector(".inputs__form");

console.log(formEl);

const receiveBonusAndDescription = async (event) => {
  event.preventDefault();
  console.log(event);

  const form = event.target;

  const raceType = document.getElementById("race").value;
  console.log(raceType);

  async function getBonusAndDescription(raceType) {
    const response = await axios.get(
      "https://www.dnd5eapi.co/api/races/" + raceType.toLowerCase()
    );
    return response.data;
  }

  const data = await getBonusAndDescription(raceType);
  console.log(data);

  const descriptionEL = document.querySelector(".inputs__description");
  descriptionEL.innerText = data.alignment;

  const conModEl = document.querySelector(".output__stats-con-mod");
  conModEl.innerText = data.ability_bonuses[0].bonus;
  let bonus = data.ability_bonuses[0].bonus;

  const generateRandomNumber = () => Math.trunc(Math.random() * 20) + 1;

  const strengthEl = document.querySelector(".output__stats-number--strength");
  strengthEl.innerText = generateRandomNumber();
  const dexterityEl = document.querySelector(
    ".output__stats-number--dexterity"
  );
  dexterityEl.innerText = generateRandomNumber();
  const constitutionEl = document.querySelector(
    ".output__stats-number--constitution"
  );
  constitutionEl.innerText = generateRandomNumber();
  const intelligenceEl = document.querySelector(
    ".output__stats-number--intelligence"
  );
  intelligenceEl.innerText = generateRandomNumber();
  const wisdomEl = document.querySelector(".output__stats-number--wisdom");
  wisdomEl.innerText = generateRandomNumber();
  const charismaEl = document.querySelector(".output__stats-number--charisma");
  charismaEl.innerText = generateRandomNumber();

  const receiveHitDice = async () => {
    const classType = document.getElementById("class").value;
    console.log(classType);

    async function getHitDice(classType) {
      const response = await axios.get(
        "https://www.dnd5eapi.co/api/classes/" + classType.toLowerCase()
      );
      return response.data;
    }

    const data = await getHitDice(classType);
    console.log(data.hit_die);
    const hpEl = document.querySelector(".output__hp");

    hpEl.innerText = data.hit_die + bonus;

    const acEl = document.querySelector(".output__ac");
    acEl.innerHTML = 10 + bonus;
  };
  receiveHitDice();
};

formEl.addEventListener("submit", receiveBonusAndDescription);

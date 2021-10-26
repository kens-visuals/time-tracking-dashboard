const dailyBtn = document.querySelector('.js-daily');
const weeklyBtn = document.querySelector('.js-weekly');
const monthlyBtn = document.querySelector('.js-monthly');
const titles = document.querySelectorAll('.js-title');
const currentDates = document.querySelectorAll('.js-current');
const previousDates = document.querySelectorAll('.js-previous');
const links = [dailyBtn, weeklyBtn, monthlyBtn];

const setActiveState = (btn) => btn.classList.add('content__link--active');
const setInactiveState = (btn) => btn.classList.remove('content__link--active');

const setCurrentDateText = (timeframe) =>
  [...currentDates].forEach((el, i) => (el.textContent = `${timeframe[i]}hrs`));
const setPreviousDateText = (timeframe, dateMsg) =>
  [...previousDates].forEach(
    (el, i) => (el.textContent = `${dateMsg} - ${timeframe[i]}hrs`)
  );

const getData = async function () {
  try {
    const data = await fetch('../data.json');
    const jsonData = await data.json();
    return jsonData;
  } catch (error) {
    console.error(`❌ ${error.message} ❌`);
  }
};

const setTitlesText = async () => {
  const data = await getData();
  const dataTitles = data.map((el) => el.title);

  [...titles].forEach((el, i) => (el.textContent = dataTitles[i]));
};

const getDailyTimeframes = async () => {
  const data = await getData();

  const [currDates, prevDates] = data.reduce(
    (acc, { timeframes: { daily } }) => {
      acc[0].push(daily.current);
      acc[1].push(daily.previous);
      return acc;
    },
    [[], []]
  );

  setCurrentDateText(currDates);
  setPreviousDateText(prevDates, 'Yesterday');
};

const getWeeklyTimeframes = async () => {
  const data = await getData();

  const [currDates, prevDates] = data.reduce(
    (acc, { timeframes: { weekly } }) => {
      acc[0].push(weekly.current);
      acc[1].push(weekly.previous);
      return acc;
    },
    [[], []]
  );

  setCurrentDateText(currDates);
  setPreviousDateText(prevDates, 'Last week');
};

const getMonthlyTimeframes = async () => {
  const data = await getData();

  const [currDates, prevDates] = data.reduce(
    (acc, { timeframes: { monthly } }) => {
      acc[0].push(monthly.current);
      acc[1].push(monthly.previous);
      return acc;
    },
    [[], []]
  );

  setCurrentDateText(currDates);
  setPreviousDateText(prevDates, 'Last Month');
};

dailyBtn.addEventListener('click', () => getDailyTimeframes());
weeklyBtn.addEventListener('click', () => getWeeklyTimeframes());
monthlyBtn.addEventListener('click', () => getMonthlyTimeframes());

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    links.forEach((l) => setInactiveState(l));
    setActiveState(e.target);
  });
});

const init = function () {
  getWeeklyTimeframes();
  setTitlesText();
};

init();

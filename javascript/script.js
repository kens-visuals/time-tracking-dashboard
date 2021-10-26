const dailyBtn = document.querySelector('.js-daily');
const weeklyBtn = document.querySelector('.js-weekly');
const monthlyBtn = document.querySelector('.js-monthly');
const titles = document.querySelectorAll('.js-title');
const currentDates = document.querySelectorAll('.js-current');
const previousDates = document.querySelectorAll('.js-previous');

const getData = async function () {
  try {
    const data = await fetch('../data.json');
    const jsonData = await data.json();
    return jsonData;
  } catch (error) {
    console.error(`❌ ${error} ❌`);
  }
};

const getTitles = async () => {
  const data = await getData();
  const dataTitles = data.map((el) => el.title);

  [...titles].forEach((el, i) => (el.textContent = dataTitles[i]));
};

const setCurrentDate = (timeframe) =>
  [...currentDates].forEach((el, i) => (el.textContent = `${timeframe[i]}hrs`));

const setPreviousDate = (timeframe, dateMsg) =>
  [...previousDates].forEach(
    (el, i) => (el.textContent = `${dateMsg} - ${timeframe[i]}hrs`)
  );

const getDailyTimeframes = async () => {
  const data = await getData();
  // DAILY
  const dailyCurrentTimeframes = data.map(
    ({ timeframes }) => timeframes.daily.current
  );
  const dailyPrevioustTimeframes = data.map(
    ({ timeframes }) => timeframes.daily.previous
  );

  setCurrentDate(dailyCurrentTimeframes);
  setPreviousDate(dailyPrevioustTimeframes, 'Yesterday');
};

const getWeeklyTimeframes = async () => {
  const data = await getData();

  // WEEKLY
  const weeklyCurrentTimeframes = data.map(
    ({ timeframes }) => timeframes.weekly.current
  );
  const weeklyPrevioustTimeframes = data.map(
    ({ timeframes }) => timeframes.weekly.previous
  );

  setCurrentDate(weeklyCurrentTimeframes);
  setPreviousDate(weeklyPrevioustTimeframes, 'Last week');
};

const getMonthlyTimeframes = async () => {
  const data = await getData();

  // WEEKLY
  const monthlyCurrentTimeframes = data.map(
    ({ timeframes }) => timeframes.monthly.current
  );
  const monthlyPrevioustTimeframes = data.map(
    ({ timeframes }) => timeframes.monthly.previous
  );

  setCurrentDate(monthlyCurrentTimeframes);
  setPreviousDate(monthlyPrevioustTimeframes, 'Last Month');
};

const setActiveState = (btn) => (btn.style.color = '#fff');

dailyBtn.addEventListener('click', () => getDailyTimeframes());
weeklyBtn.addEventListener('click', () => getWeeklyTimeframes());
monthlyBtn.addEventListener('click', () => getMonthlyTimeframes());

const init = function () {
  getWeeklyTimeframes();
  getTitles();
};

init();

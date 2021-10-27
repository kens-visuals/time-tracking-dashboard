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

const setTimeFrame = async (current, previous, time) => {
  const data = await getData();

  setCurrentDateText(data.map(current));
  setPreviousDateText(data.map(previous), time);
};

dailyBtn.addEventListener('click', () =>
  setTimeFrame(
    ({ timeframes }) => timeframes.daily.current,
    ({ timeframes }) => timeframes.daily.previous,
    'Yesterday'
  )
);
weeklyBtn.addEventListener('click', () =>
  setTimeFrame(
    ({ timeframes }) => timeframes.weekly.current,
    ({ timeframes }) => timeframes.weekly.previous,
    'Last Week'
  )
);
monthlyBtn.addEventListener('click', () =>
  setTimeFrame(
    ({ timeframes }) => timeframes.monthly.current,
    ({ timeframes }) => timeframes.monthly.previous,
    'Last Month'
  )
);

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    links.forEach((l) => setInactiveState(l));
    setActiveState(e.target);
  });
});

(() => {
  setTimeFrame(
    ({ timeframes }) => timeframes.weekly.current,
    ({ timeframes }) => timeframes.weekly.previous,
    'Yesterday'
  );
  setTitlesText();
})();

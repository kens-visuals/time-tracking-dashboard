const links = document.querySelectorAll('.js-link');
const list = document.querySelector('.js-list');
const titles = document.querySelectorAll('.js-title');
const currentDates = document.querySelectorAll('.js-current');
const previousDates = document.querySelectorAll('.js-previous');

const getData = async function () {
  try {
    const data = await fetch('../data.json');
    return await data.json();
  } catch (error) {
    console.error(`❌ ${error.message} ❌`);
  }
};

const setCurrentDateText = (timeframe) =>
  [...currentDates].forEach((el, i) => (el.textContent = `${timeframe[i]}hrs`));

const setPreviousDateText = (timeframe, dateMsg) =>
  [...previousDates].forEach(
    (el, i) => (el.textContent = `${dateMsg} - ${timeframe[i]}hrs`)
  );

const setTitlesText = async () => {
  const data = await getData();

  data.map((el, i) => (titles[i].textContent = el.title));
};

const setTimeFrame = async (current, previous, time) => {
  const data = await getData();

  setCurrentDateText(data.map(current));
  setPreviousDateText(data.map(previous), time);
};

list.addEventListener('click', (e) => {
  if (e.target.textContent.trim() === 'Daily')
    setTimeFrame(
      ({ timeframes }) => timeframes.daily.current,
      ({ timeframes }) => timeframes.daily.previous,
      'Yesterday'
    );

  if (e.target.textContent.trim() === 'Weekly')
    setTimeFrame(
      ({ timeframes }) => timeframes.weekly.current,
      ({ timeframes }) => timeframes.weekly.previous,
      'Last Week'
    );

  if (e.target.textContent.trim() === 'Monthly')
    setTimeFrame(
      ({ timeframes }) => timeframes.monthly.current,
      ({ timeframes }) => timeframes.monthly.previous,
      'Last Month'
    );
});

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    links.forEach((l) => l.classList.remove('content__link--active'));
    e.target.classList.add('content__link--active');
  });
});

(() => {
  setTimeFrame(
    ({ timeframes }) => timeframes.weekly.current,
    ({ timeframes }) => timeframes.weekly.previous,
    'Last Week'
  );
  setTitlesText();
})();

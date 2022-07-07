const capitalise = (str) => {
  if (typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function simpleFormatString(title, format = 'id') {
  title = title.trim();
  if (typeof title !== 'string') return title;
  const dash = new RegExp('-', 'gm');
  const underscore = new RegExp('_', 'gm');
  const space = new RegExp(' ', 'gm');
  const quotes = new RegExp('"', 'gm');

  if (format.toLowerCase() === 'id') {
    if (space.test(title)) {
      title = title.replace(space, '-');
    }
    if (underscore.test(title)) {
      title = title.replace(underscore, '-');
    }
    if (quotes.test(title)) {
      title = title.replace(quotes, '');
    }
    return title.toLowerCase();
  } else if (format.toLowerCase() === 'headline') {
    if (dash.test(title)) {
      title = capitalise(title.replace(dash, '_'));
      return title;
    } else {
      console.log('Nothing to format!');
    }
  } else {
    console.error("Please provide a format argument, either 'id' or 'headline'");
  }
  return title;
}

export const isBrowser = () => typeof window !== 'undefined';
export const isNavbarBrandUp = (boo = false) => {
  if (boo === false) {
    return false;
  }
  if (isBrowser()) {
    const lsState = localStorage.getItem('navbarBrand_mode');
    if (!lsState) {
      return true;
    } else {
      return lsState === 'up';
    }
  } else {
    return false;
  }
};

export { capitalise, simpleFormatString };

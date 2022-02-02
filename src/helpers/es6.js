const capitalise = (str) => {
  if (typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function formatTitle(title, format = 'url') {
  title = title.trim();
  if (typeof title !== 'string') return title;
  const dash = new RegExp('-', 'g');
  const underscore = new RegExp('_', 'g');
  const space = new RegExp(' ', 'g');

  if (format.toLowerCase() === 'url') {
    if (space.test(title)) {
      title = title.replace(space, '-');
    }
    if (underscore.test(title)) {
      title = title.replace(underscore, '-');
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
    console.log("Please provide a format argument, either 'url' or 'headline'");
    return title;
  }
}

export const isNavbarBrandUp = (boo = false) => {
  if (boo === false) {
    return false;
  }
  console.log('trigger isNavbarBrandUp');
  if (typeof window !== 'undefined') {
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

export { capitalise, formatTitle };

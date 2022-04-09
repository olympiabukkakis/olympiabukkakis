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

module.exports = { simpleFormatString };

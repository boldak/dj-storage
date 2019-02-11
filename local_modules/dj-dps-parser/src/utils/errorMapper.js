
// TODO refactor code

class ErrorMapper {

// function to find correct line of code, which contains invalid COMMAND
// strs - script from input
// num - number of invalid command
  static findLineOfCommandStart(strs, num) {
    if (num < 0)
      return -1;

    const commandMap = strs.split('\n');

    if (num >= commandMap.length)
      return -1;

    let iter = -1;

    for (let i = 0; i < commandMap.length; i++) {

      if (commandMap[i]) {
        // identify commands like "<?html something ?>"
        if (commandMap[i].indexOf('<?') != -1) {
          iter += 2;

          if (iter == num || iter - 1 == num)
            return i;

          while ((commandMap[i].indexOf('?>') == -1) && (i < commandMap.length))
            i++;

          continue;
        }

        // skip comments
        if (commandMap[i].trim().indexOf('//') == 0)
          continue;

        if (commandMap[i].indexOf('/*') != -1) {
          while ((commandMap[i].indexOf('*/') == -1) && (i < commandMap.length))
            i++;

          continue;
        }

        // identify commands like "html(something)"
        if (commandMap[i].indexOf('(') != -1) {
          iter++;

          if (iter == num)
            return i;

          while ((commandMap[i].indexOf(')') == -1) && (i < commandMap.length))
            i++;

          continue;
        } else {
          // if missing "()" after command
          if ((commandMap[i].trim() != ')') && (commandMap[i].trim() != '?>'))
            return i;
        }
      }
    }

    return -1;
  }

  static findTextOfCommand(strs, num) {
    let index = ErrorMapper.findLineOfCommandStart(strs, num);
    return strs.split('\n')[index];
  }
}

module.exports = ErrorMapper;

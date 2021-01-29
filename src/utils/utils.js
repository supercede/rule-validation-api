module.exports = {
  getNestedfield: (field, data) => {
    let val;
    const nestLevel = field.split('.');
    if (nestLevel.length === 1) {
      val = data[`${field}`];
    } else {
      for (const level of nestLevel) {
        if (data && data.hasOwnProperty(level)) {
          val = data[level];
        }
        data = data[level];
      }
    }
    return val;
  },
};

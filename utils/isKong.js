var isKong = function isKong(str) {
  if (str == "" || str == "&nbsp;" || undefined == str || str == null || str == "null" || str == "undefined") {
    return true;
  }
  return false;
}

module.exports = isKong;
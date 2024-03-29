exports.arrayHasObjectWithPropAndValue = (array, propName, value) => {
  if (!Array.isArray(array)) {
    return false;
  }
  // e.g. array = friends, propName = "username", value = "pillowOwO"
  for (let item of array) {
    if (item.friend[propName] === value) return true;
  }
  return false;
};

exports.isAddedFriend = (friends, usernameToAdd) => {
  if (!Array.isArray(friends)) {
    return false;
  }
  for (let friend of friends) {
    let { username } = friend.friend;
    if (username === usernameToAdd) {
      if (friend.status === "requested" || friend.status === "accepted") {
        return true;
      }
    }
  }
  return false;
};

exports.sortAlphabeticallyByProp = (property) =>
  function (a, b) {
    var textA = a[property].toUpperCase();
    var textB = b[property].toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };

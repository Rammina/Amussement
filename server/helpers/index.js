exports.arrayHasObjectWithPropAndValue = (array, propName, value) => {
  console.log(array);
  console.log(propName);
  console.log(value);
  if (!Array.isArray(array)) {
    return false;
  }
  // e.g. array = friends, propName = "username", value = "pillowOwO"
  for (let item of array) {
    console.log(propName);
    console.log(value);
    console.log(item);
    console.log(`${item.friend[propName]} === ${value}`);
    if (item.friend[propName] === value) return true;
  }
  return false;
};

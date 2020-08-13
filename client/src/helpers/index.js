import warningImg from "../icons/warning.png";

import _ from "lodash";
import React from "react";
import { format, endOfYesterday, isBefore } from "date-fns";
import compareAsc from "date-fns/compareAsc";
// import CryptoJS from "crypto-js";

// Helper functions

// date-time functions
export const getCurrentDate = () => {
  console.log(format(new Date(), "yyyy-MM-dd"));
  return format(new Date(), "yyyy-MM-dd");
};

export const getCurrentTime = () => {
  return format(new Date(), "hh:mma");
};

export const convertToMDY = date => {
  console.log(date);
  return date ? format(new Date(date.replace(/-/g, "/")), "MM/dd/yyyy") : null;
};

export const toMilitaryTime = datetime => {
  return format(datetime, "HH:mm");
};

export const toStandardTime = time => {
  console.log(time);
  if (!time) {
    // Use this if you want to bypass the error
    // return null;
  }
  return format(new Date(`${getCurrentDate()}T${time}`), "hh:mma");
};

export const standardToMilitary = function standardToMilitary(time) {
  var PM = time.match("PM") ? true : false;
  var hour;
  var minute;

  time = time.split(":");

  if (PM) {
    hour = 12 + parseInt(time[0], 10);
    minute = time[1].replace("PM", "");
  } else {
    hour = time[0];
    minute = time[1].replace("AM", "");
  }

  return `${hour}:${minute}`;
};

// regular expression testing
export const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// filetype functions
/*
export const checkFileType = (regexp, file, cb) => {
  // check extension type
  const extname = regexp.test(path.extname(file.originalname).toLowerCase());
  // check mimetype
  const mimetype = regexp.test(file.mimetype);

  // check if both are true
  if (extname && mimetype) {
    return true;
  } else {
    return false;
  }
};
*/

// styling functions
export const autoGrow = function(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + 3.7813 + "px";
};

export const autoGrowValue = function(element) {
  if (!element) {
    return "0px";
  }
  return element.offsetHeight + 3.7813 + "px";
};

// error display functions
export const renderError = (meta, sectionName) => {
  const { error, touched } = meta;
  // Creates an error message if there is an error in the input field is touched
  if (error && touched) {
    return (
      <div className={`${sectionName} error`}>
        <img className="error-image" src={warningImg} alt="warning sign"></img>
        {error}
      </div>
    );
  }
  return null;
};

export const getErrorClass = ({ error, touched }) => {
  return error && touched ? "error" : null;
};

// This is used for helping sort object based on property names' values
// key refers to The name of the property, order can either be asc or desc
export const compareValues = (key, order = "asc") => {
  console.log("comparing values");
  // if date values are being compared
  if (key === "date") {
    return function innerDateSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        console.log(`${key} doesn't exist`);
        return 0;
      }
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      const orderValue = order === "desc" ? -1 : 1;
      return compareAsc(dateTimeA, dateTimeB) * orderValue;
    };
  }
  // typical lexical comparison, or numerical comparison
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      console.log(`${key} doesn't exist`);
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};
// // usage: array is sorted by band, in ascending order by default:
// // //singers.sort(compareValues('band'));

export const comparePriorityValues = (order = "asc") => {
  console.log("comparing values");
  // Compare by priority strings
  return function innerSort(a, b) {
    if (!a.hasOwnProperty("priority") || !b.hasOwnProperty("priority")) {
      // property doesn't exist on either object
      console.log(`priority key doesn't exist`);
      return 0;
    }
    let comparison = 0;
    if (
      a.priority === "high" &&
      (b.priority === "medium" || b.priority === "low")
    ) {
      comparison = 1;
    } else if (a.priority === "high" && b.priority === "high") {
      comparison = 0;
    } else if (a.priority === "medium" && b.priority === "low") {
      comparison = 1;
    } else if (a.priority === "medium" && b.priority === "medium") {
      comparison = 0;
    } else if (a.priority === "medium" && b.priority === "high") {
      comparison = -1;
    } else if (
      a.priority === "low" &&
      (b.priority === "medium" || b.priority === "high")
    ) {
      comparison = -1;
    } else if (a.priority === "low" && b.priority === "low") {
      comparison = 0;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

// Use this to compare objects based on key count of their property
//  a & b - objects to be compared
//  propName - string name of property to be used as basis for comparison
export const compareKeysInProp = (a, b, propName) => {
  // If both items don't have the property name, they are equal
  if (!a[propName] && !b[propName]) {
    return 0;
  } // if a has the property and b does not, a is greater
  else if (a[propName] && !b[propName]) {
    return 1;
  } // if a does not have the property and b does, b is greater
  else if (!a[propName] && b[propName]) {
    return -1;
  } // if both of them have the property, compare their keys' lengths
  else if (a[propName] && b[propName]) {
    return Object.keys(a[propName]).length > Object.keys(b[propName]).length
      ? 1
      : -1;
  }
};

//String functions
export const ellipsifyString = (string, length = 10) => {
  if (!string) {
    return null;
  }
  if (string.length > length) {
    return `${string.substring(0, length)}...
    `;
  }
  return string;
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// array functions
export const replaceAt = (array, index, value) => {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
};
// usage: const newArray = replaceAt(items, index, "J");

export const objectToArray = (
  object,
  keyAsProp /*string(optional)
            ---name of a property in which the original object key will be stored */
) => {
  let array = [];
  for (let objectKey in object) {
    if (object.hasOwnProperty(objectKey)) {
      if (keyAsProp) {
        object[objectKey][keyAsProp] = objectKey;
      }
      array.push(object[objectKey]);
    }
  }
  return array;
};
/*
// CryptoJS functions
const keySize = 256;
const ivSize = 128;
const iterations = 1000;

// var message = "Hello World";
// var password = "Secret Password";

export const encrypt = function encrypt(msg, pass) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);

  const key = CryptoJS.PBKDF2(pass, salt, {
    keySize: keySize / 32,
    iterations: iterations
  });

  const iv = CryptoJS.lib.WordArray.random(128 / 8);

  const encrypted = CryptoJS.AES.encrypt(msg, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });

  // salt, iv will be hex 32 in length
  // append them to the ciphertext for use  in decryption
  const transitmessage = salt.toString() + iv.toString() + encrypted.toString();
  return transitmessage;
};

export const decrypt = function decrypt(transitmessage, pass) {
  const salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
  const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
  const encrypted = transitmessage.substring(64);

  const key = CryptoJS.PBKDF2(pass, salt, {
    keySize: keySize / 32,
    iterations: iterations
  });

  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return decrypted;
};

export const decryptedMsgToString = decryptedMsg => {
  return decryptedMsg.toString(CryptoJS.enc.Utf8);
};
*/

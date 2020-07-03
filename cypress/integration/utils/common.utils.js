import { exists } from "fs";

// Utilities

/**
 * The function merges two objects to create a new object. Please note that the function expects
 *      a value to be <code>null</code> only if it is not required, and thus converts it to <code>undefined</code>
 *
 * @param {*} base The base object to be considered for the merge - Template
 * @param {*} changes The modifications to be applied to the template
 */

const uuid = require("uuid");
function mergeWithOverwrite(base, changes) {
  if (changes === null) return undefined;
  const baseCopy = JSON.parse(JSON.stringify(base));
  const changesCopy = JSON.parse(JSON.stringify(changes));

  return nullToUndefined(Object.assign(baseCopy, changesCopy));
}

function nullToUndefined(value) {
  if (value != null && value.constructor.name === "Object") {
    let tempEntries = {};
    for (let [key, val] of Object.entries(value)) {
      tempEntries[key] = nullToUndefined(val);
    }

    return tempEntries;
  }
  if (Array.isArray(value)) {
    return value.map(nullToUndefined);
  }
  if (value === null) {
    return undefined;
  }
  return value;
}

// TODO Add an additional step to modify dynamic values
export function goHome(url) {
  cy.setCookie("betacookie", "NO");
  cy.visit(url);
}
export function windowRoll(roll) {
  cy.window().then((win) => {
    win.scrollTo(0, roll);
  });
}
export function byPassRecapcha(url, cardNumber, Pin, element, link) {
  goHome(url);
  var loginURL = null;
  console.log("elements is: ", elements);
  console.log(
    "elements[element] ",
    elements[element],
    "externalURL ",
    externalURL,
    "externalURL[link] ",
    externalURL[link]
  );
  cy.get(elements[element])
    .should("have.attr", "href")
    .then((href) => {
      console.log("before repalce recaptcha", href);
      loginURL = href.replace("recaptcha", "fugible");
      console.log("login URL", loginURL);
      expect(href).to.contain(externalURL[link]);
      cy.visit(loginURL);

      cy.get(
        '[data-track-id="collector-number-frm"][data-track-click="on-page-interaction"]'
      )
        .focus()
        .type(cardNumber);
      cy.get(
        '[data-track-id="collector-pin-frm"][data-track-click="on-page-interaction"]'
      )
        .focus()
        .type(Pin);
      cy.get(".login-form").submit();
    });
  cy.on("uncaught:exception", () => false);
}

var langSeleEle;
export function langSelElement(language, enCss, frCss) {
  if (language == "en") {
    langSeleEle = enCss;
  } else {
    langSeleEle = frCss;
  }
  return langSeleEle;
}

export function callHttpEndpoint(
  common,
  testCaseData,
  httpMethod,
  addFormDataHeader,
  path,
  x
) {
  var bdy = "body" + (x || "");

  const headers =
    testCaseData && testCaseData.headers !== undefined
      ? mergeWithOverwrite(common.headers, testCaseData.headers)
      : common.headers;
  const body =
    testCaseData && testCaseData.body !== undefined
      ? mergeWithOverwrite(common[bdy], testCaseData.body)
      : common[bdy];

  return cy.request({
    url: common.endpoint + (path || ""),
    method: httpMethod || "POST",
    body: body,
    headers: headers,
    failOnStatusCode: false,
    form: addFormDataHeader || false,
  });
}

export function callHttpEndpointX(
  common,
  testCaseData,
  httpMethod,
  addFormDataHeader,
  x
) {
  const headers =
    testCaseData && testCaseData.headers !== undefined
      ? mergeWithOverwrite(common.headers, testCaseData.headers)
      : common.headers;
  const body =
    testCaseData && testCaseData.body !== undefined
      ? mergeWithOverwrite(common.body, testCaseData.body)
      : common.body;

  var urlx = "endpoint" + x;
  console.log(urlx);

  return cy.request({
    url: common[urlx],
    method: httpMethod || "POST",
    body: body,
    headers: headers,
    failOnStatusCode: false,
    form: addFormDataHeader || false,
  });
}

export function callHttpEndpointOtherBody(
  common,
  testCaseData,
  httpMethod,
  addFormDataHeader,
  path,
  x
) {
  var bdy = "body" + x;
  console.log(bdy);

  return cy.request({
    url: common.endpoint + (path || ""),
    method: httpMethod || "POST",
    body: body,
    headers: headers,
    failOnStatusCode: false,
    form: addFormDataHeader || false,
  });
}

export function callSimpleGetRequest(endpoint, headers, path, queryParams) {
  return cy.request({
    url: endpoint + (path || ""),
    method: "GET",
    headers: headers,
    failOnStatusCode: false,
    qs: queryParams,
  });
}

export function callHttpEndpointSta(
  common,
  testCaseData,
  endpointp,
  httpMethod,
  addFormDataHeader
) {
  const headers =
    testCaseData && testCaseData.headers !== undefined
      ? mergeWithOverwrite(common.headers, testCaseData.headers)
      : common.headers;
  const body =
    testCaseData && testCaseData.body !== undefined
      ? mergeWithOverwrite(common.body, testCaseData.body)
      : common.body;

  return cy.request({
    url: common.endpoint1,
    method: httpMethod || "POST",
    body: body,
    headers: headers,
    failOnStatusCode: false,
    form: addFormDataHeader || false,
  });
}

export function checkAssertionsForValidRequests(response) {
  cy.wrap(response).its("status").should("equal", 201);
}
export function checkAssertionsForValidRequests200(response) {
  cy.wrap(response).its("status").should("equal", 200);
}

export function checkAssertionsForvalidReqResponse(
  response,
  parameter,
  correctCode
) {
  console.log("correctCode ", correctCode);
  cy.wrap(response).its("status").should("equal", correctCode.httpResponseCode);
  cy.wrap(response)
    .its("body")
    .its(parameter)
    .should("have.string", correctCode.code);
}

export function checkAssertionsForvalidReqResDate(
  response,
  parameter,
  correctCode
) {
  console.log("correctCode ", correctCode);
  cy.wrap(response).its("status").should("equal", correctCode.httpResponseCode);
  cy.wrap(response)
    .its("body")
    .its(parameter)
    .should("match", /^\d{4}-\d{1,2}-\d{1,2}$/);
}

export function checkAssertionsForInvalidReqRespCode(response, errorCode) {
  cy.wrap(response).its("status").should("equal", errorCode.httpResponseCode);
}

export function checkAssertionsForInvalidReqResponse(
  response,
  parameter,
  errorCode
) {
  cy.wrap(response).its("status").should("equal", errorCode.httpResponseCode);
  cy.wrap(response)
    .its("body")
    .its(parameter)
    .should("have.string", errorCode.code);
}

export function checkAssertionsForInvalidReqResPara(
  response,
  parameter,
  errorCode,
  errorPara
) {
  cy.wrap(response).its("status").should("equal", errorCode.httpResponseCode);
  console.log(errorCode[errorPara]);
  cy.wrap(response)
    .its("body")
    .its(parameter)
    .should("have.string", errorCode[errorPara]);
}

export function generateRandomUUID() {
  return uuid.v4();
}

export function getFormattedDateStr(
  date,
  invert,
  overideDay,
  overideMonth,
  overideYear
) {
  let year = overideYear || date.getFullYear();
  let month = overideMonth || date.getMonth() + 1;
  let day = overideDay || date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  const twoDigitConv = (digit) => {
    return digit < 10 ? "0" + digit : digit;
  };

  if (invert) {
    return (
      twoDigitConv(day) +
      "-" +
      twoDigitConv(month) +
      "-" +
      year +
      "T" +
      twoDigitConv(hour) +
      ":" +
      twoDigitConv(minute) +
      ":" +
      twoDigitConv(second)
    );
  } else {
    return (
      year +
      "-" +
      twoDigitConv(month) +
      "-" +
      twoDigitConv(day) +
      "T" +
      twoDigitConv(hour) +
      ":" +
      twoDigitConv(minute) +
      ":" +
      twoDigitConv(second)
    );
  }
}
export function getDateStrDelayed(
  date,
  invert,
  overideDay,
  overideMonth,
  overideYear
) {
  let year = overideYear + date.getFullYear(); //This year plus delayed years
  let month = overideMonth + (date.getMonth() + 1);
  let day = overideDay + date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  const twoDigitConv = (digit) => {
    return digit < 10 ? "0" + digit : digit;
  };

  if (invert) {
    return (
      twoDigitConv(day) +
      "-" +
      twoDigitConv(month) +
      "-" +
      year +
      "T" +
      twoDigitConv(hour) +
      ":" +
      twoDigitConv(minute) +
      ":" +
      twoDigitConv(second)
    );
  } else {
    return (
      year +
      "-" +
      twoDigitConv(month) +
      "-" +
      twoDigitConv(day) +
      "T" +
      twoDigitConv(hour) +
      ":" +
      twoDigitConv(minute) +
      ":" +
      twoDigitConv(second)
    );
  }
}
export function appendRandomNumber(val, length) {
  if (val) return val + Math.floor(length + Math.random() * length * 9);

  return val;
}
export function appendRandomNumberFront(val, length) {
  if (val) return Math.round(Math.random() * length) + val;
  return val;
}
export function appendRandomDecimal(val, length) {
  if (val)
    return (
      ((val + Math.floor(length + Math.random() * length * 9)) * length) /
      (length + 1)
    );

  return val;
}

export function delta(startTime) {
  // converts nanoseconds to millis
  return Number((process.hrtime.bigint() - startTime) / 1000000);
}

export function getEnvVariable(key) {
  return Cypress.env(key);
}

export function fetchSecret(service, key) {
  const CONFIG = JSON.parse(Cypress.env("SSM_SECRETS"));
  return CONFIG[service] && CONFIG[service][key] ? CONFIG[service][key] : null;
}

export function calculateAge(birthYear) {
  var d = new Date();
  var n = d.getFullYear();
  return n - birthYear;
}

export function wordsRepeatTimes(str, word) {
  var number = str.split(word).length - 1;
  return number;
}
export function sum(...numbers) {
  var result = 0;
  numbers.forEach(function (number) {
    result += number;
  });
  return result;
}

export const arrMin = (arr) => Math.min(...arr);
export const arrMax = (arr) => Math.max(...arr);
export const arrSum = (arr) => arr.reduce((a, b) => a + b, 0);
export function calcAverage(tips) {
  var sum = 0;
  for (var i = 0; i < tips.length; i++) {
    sum = sum + tips[i];
  }
  return sum / tips.length;
}

export function findMostReaptedWord(str) {
  var res = str.split(" ");

  var count;
  var compareString;
  for (var i = 0; i < res.length; i++) {
    count = 0;
    compareString = res[i];
    for (j = 0; i < res.lenth; j++) {
      if (compareString == res[j]) {
        count++;
      }
    }
  }
}

export function wordsRepeatTimes1(str, word) {
  var number = str.split(word).length - 1;
  return number;
}

export function reverseBySeparator(string, separator) {
  return string.split(separator).reverse().join(separator);
}

export function age(years) {
  years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`;
  });
}
export function returnkeyNumberOnlyOfMap(inputMap) {
  let newMap = new Map();
  for (let [key, value] of inputMap.entries()) {
    if (typeof key === "number") {
      console.log(`Answer ${key}: ${value}`);
      newMap.set(key, value);
    }
  }
  return newMap;
}

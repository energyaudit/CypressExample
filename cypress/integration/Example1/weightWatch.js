/// <reference types="Cypress" />
import * as utils from "../utils/common.utils";

const url = "https://www.weightwatchers.com/us/";

describe("Testing of weight watch suites", () => {
  function goHome(url) {
    cy.visit(url);
  }
  it("Step1:Title verifiy ", () => {
    goHome(url);
    cy.title().should(
      "include",
      "WW (Weight Watchers): Weight Loss & Wellness Help"
    );
  });

  it("Step1-2:Find workshop", () => {
    goHome(url);
    console.log("Home page title", cy.title());
    cy.title().should(
      "include",
      "WW (Weight Watchers): Weight Loss & Wellness Help"
    );
    cy.get(
      ":nth-child(1) > .Button_button__RwVHT > .MenuItem_menu-item__inner-wrapper__1trJ0 > :nth-child(2)"
    ).click({
      force: true,
    });
    console.log("find workshop title", cy.title());
    cy.title().should(
      "include",
      "Find WW Studios & Meetings Near You | WW USA"
    );
  });

  it("Step3-7:Input postcode", () => {
    goHome(url);
    cy.title().should(
      "include",
      "WW (Weight Watchers): Weight Loss & Wellness Help"
    );
    cy.get(
      ":nth-child(1) > .Button_button__RwVHT > .MenuItem_menu-item__inner-wrapper__1trJ0 > :nth-child(2)"
    ).click({
      force: true,
    });
    cy.get("#meetingSearch").type("10011");
    cy.get(".form-blue-pill > .input-item > .btn").click({ force: true });
    cy.get(
      "#ml-1180510 > result-location > .meeting-location > .meeting-location__top > a > location-address > .location > .location__container > .location__city-state-zip"
    ).contains("NY 10010");
    cy.get(
      "#ml-1180510 > result-location > .meeting-location > .meeting-location__top > a > location-address > .location > .location__container > .location__top > .location__name > span"
    )
      .invoke("text")
      .as("linkText");
    cy.get("@linkText").then(($x) => {
      expect($x).is.eql("WW Studio Flatiron");
    });
  });
  it("Operation Hours", () => {
    goHome(url);
    cy.title().should(
      "include",
      "WW (Weight Watchers): Weight Loss & Wellness Help"
    );
    cy.get(
      ":nth-child(1) > .Button_button__RwVHT > .MenuItem_menu-item__inner-wrapper__1trJ0 > :nth-child(2)"
    ).click({
      force: true,
    });
    cy.get("#meetingSearch").type("10011");
    cy.get(".form-blue-pill > .input-item > .btn").click({ force: true });
    cy.get(
      "#ml-1180510 > result-location > .meeting-location > .meeting-location__top > a > location-address > .location > .location__container > .location__city-state-zip"
    ).contains("NY 10010");
    cy.get(
      "#ml-1180510 > result-location > .meeting-location > .meeting-location__top > a > location-address > .location > .location__container > .location__top > .location__name > span"
    )
      .invoke("text")
      .as("linkText");
    cy.get("@linkText").then(($x) => {
      expect($x).is.eql("WW Studio Flatiron");
    });
    cy.get(
      "#ml-1180510 > result-location > .meeting-location > .meeting-location__top > a > location-address > .location > .location__container > .location__top > .location__name > span"
    ).click({ force: true });
    cy.window().then((win) => {
      win.scrollTo(0, 800);
    });
  });
  it.only("Step8-9:Each day meetings", () => {
    let sun;
    goHome(url);
    cy.title().should(
      "include",
      "WW (Weight Watchers): Weight Loss & Wellness Help"
    );
    cy.get(
      ":nth-child(1) > .Button_button__RwVHT > .MenuItem_menu-item__inner-wrapper__1trJ0 > :nth-child(2)"
    ).click({
      force: true,
    });
    cy.get("#meetingSearch").type("10011");
    cy.get(".form-blue-pill > .input-item > .btn").click({ force: true });
    cy.get(
      "#ml-1180510 > result-location > .meeting-location > .meeting-location__top > a > location-address > .location > .location__container > .location__city-state-zip"
    ).contains("NY 10010");
    cy.get(
      "#ml-1180510 > result-location > .meeting-location > .meeting-location__top > a > location-address > .location > .location__container > .location__top > .location__name > span"
    )
      .invoke("text")
      .as("linkText");
    cy.get("@linkText").then(($x) => {
      expect($x).is.eql("WW Studio Flatiron");
    });
    cy.get(
      "#ml-1180510 > result-location > .meeting-location > .meeting-location__top > a > location-address > .location > .location__container > .location__top > .location__name > span"
    ).click({ force: true });
    cy.window().then((win) => {
      win.scrollTo(0, 800);
    });

    sun = cy.get(".schedule-detailed > :nth-child(1)").invoke("text").as("sun");
    cy.get(".schedule-detailed > :nth-child(2)").invoke("text").as("mon");
    cy.get(".schedule-detailed > :nth-child(3)").invoke("text").as("tue");
    cy.get(".schedule-detailed > :nth-child(4)").invoke("text").as("wed");
    cy.get(".schedule-detailed > :nth-child(5)").invoke("text").as("thu");
    cy.get(".schedule-detailed > :nth-child(6)").invoke("text").as("fri");
    cy.get(".schedule-detailed > :nth-child(7)").invoke("text").as("sat");
    console.log("sun is:", sun);

    cy.get("@sun").should(
      "contain",
      "Sun   9:00 AM JOHN B.  10:30 AM JOHN B.  12:00 PM JOHN B"
    );
    cy.get("@mon").should(
      "contain",
      "Mon   8:15 AM DANA F.  12:30 PM LISA S.  6:00 PM LISA S"
    );
    cy.get("@tue").should(
      "contain",
      "Tue   11:15 AM LAUREN C.  12:15 PM LAUREN C.  5:15 PM ARANSAS S.  6:45 PM ARANSAS S"
    );
    cy.get("@wed").should(
      "contain",
      "Wed   10:00 AM CAMI B.  12:15 PM CAMI B.  5:30 PM MARIA S"
    );
    cy.get("@thu").should(
      "contain",
      "Thu   8:15 AM STEVEN H.  9:15 AM STEVEN H.  12:15 PM DIANE M.  5:15 PM MINDI K.  6:15 PM MINDI K"
    );
    cy.get("@fri").should(
      "contain",
      "Fri   8:15 AM SILMARA R.  12:15 PM SILMARA R.  5:30 PM RICARDO M"
    );
    cy.get("@sat").should(
      "contain",
      "Sat   8:30 AM ROBERT B.  10:00 AM ROBERT B.  11:30 AM ROBERT B"
    );
    var weekTest = [
      "Sun   9:00 AM JOHN B.  10:30 AM JOHN B.  12:00 PM JOHN B",
      "Mon   8:15 AM DANA F.  12:30 PM LISA S.  6:00 PM LISA S",
      "Tue   11:15 AM LAUREN C.  12:15 PM LAUREN C.  5:15 PM ARANSAS S.  6:45 PM ARANSAS S",
      "Wed   10:00 AM CAMI B.  12:15 PM CAMI B.  5:30 PM MARIA S",
      "Thu   8:15 AM STEVEN H.  9:15 AM STEVEN H.  12:15 PM DIANE M.  5:15 PM MINDI K.  6:15 PM MINDI K",
      "Fri   8:15 AM SILMARA R.  12:15 PM SILMARA R.  5:30 PM RICARDO M",
      "Sat   8:30 AM ROBERT B.  10:00 AM ROBERT B.  11:30 AM ROBERT B",
    ];
    var list = [
      "JOHN",
      "DANA",
      "LISA",
      "LAUREN",
      "ARANSAS",
      "CAMI",
      "MARIA",
      "STEVEN",
      "MINDI",
      "SILMARA",
      "RICARDO",
      "ROBERT",
    ];
    for (var i = 0; i < weekTest.length; i++) {
      for (var j = 0; j < list.length; j++) {
        if (utils.wordsRepeatTimes(weekTest[i], list[j]) != 0) {
          console.log(
            weekTest[i] +
              ":" +
              list[j] +
              "::" +
              utils.wordsRepeatTimes(weekTest[i], list[j])
          );
        }
      }
    }
  });
});

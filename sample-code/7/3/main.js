"use strict";
const dateNow = new Date();
const birthYear = new Date(1896);
const anniversaryYear = dateNow.getFullYear() - birthYear;
const h1 = document.querySelector('h1');
h1.textContent = h1.textContent.replace("好きな作品", `（祝）生誕 ${anniversaryYear}周年`);

"use strict";

// named export
import { sayHello } from "./hello.js";
sayHello("Tom");


// named export
// ※：importする関数名は asで変更できる
import { sayHello as h } from "./hello.js";
h("John");


// default export
// ※：{}不要。
// ※：default exportの場合は、sayGoodLuckのように好きなように関数名をつけることができる。
import sayGoodLuck from "./goodLuck.js";
sayGoodLuck("Susan");

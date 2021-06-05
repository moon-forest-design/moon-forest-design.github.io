{ // ブロックスコープ(START)
"use strict";

const googleMap = document.querySelector(".googleMap iframe"); // Googleマップの要素を取得
const googleMapWidth = googleMap.getAttribute("width"); // Googleマップiframeのwidth属性値を取得
const googleMapHeight = googleMap.getAttribute("height"); // Googleマップiframeのheight属性値を取得
const mapRatio = googleMapHeight / googleMapWidth; // Googleマップiframeの比率を算出（例：横幅600x高さ450なら、450 / 600 = 0.75）
const changeWidth = googleMap.clientWidth; // 実際に表示されているGoogleマップの幅を取得（スクロールバーは含まない）
const changeHeight = Math.round(changeWidth * mapRatio); // 実際に表示されているGoogleマップの幅にあわせて高さを算出
googleMap.setAttribute("width", changeWidth); // Googleマップiframeのwidth属性値を実際に表示されているGoogleマップの幅に変更
googleMap.setAttribute("height", changeHeight); // Googleマップiframeのheight属性値を縦横比を維持して変更


} // ブロックスコープ(END)

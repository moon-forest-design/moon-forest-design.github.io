'use strict';

const getFakeMembers = count => new Promise((resolves, rejects) => {
  const api = `https://api.randomuser.me/?nat=US&results=${count}`;
  const request = new XMLHttpRequest();
  request.open('GET', api);
  request.onload = () =>
  (request.status === 200) ?
    resolves(JSON.parse(request.response).results) :
    rejects(Error(request.statusText));
  request.onerror = (err) => rejects(err);
  request.send();
});


// 処理例1：本P30
// ・取得したデータをコンソール表示するだけ
getFakeMembers(3).then(
  members => console.log(members),
  err => console.error(
    new Error("cannot load members from randomuser.me"))
);


// 処理例2：本P54
// ・関数を返すことによる段階的な処理。userNameだけ入れておいて、通信が成功したらさらに処理をする
const userLogs = userName => message =>
    console.log(`${userName} -> ${message}`);

const log = userLogs("grandpa23");

log("attempted to load 20 fake members");

getFakeMembers(20).then(
    members => log(`successfully loaded ${members.length} members`)
  ).catch(
    error => log("encountered an error loading members")
  );

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

getFakeMembers(3).then(
  members => console.log(members),
  err => console.error(
    new Error("cannot load members from randomuser.me"))
);

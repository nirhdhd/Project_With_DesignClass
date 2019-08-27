export const fetchList = async url => {
  return await fetch(url, {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json;charset=utf-8"
    })
  })
    .then(res => res.json())
    .then(
      result => JSON.parse(result.d),
      error => {
        console.log("err post=", error);
      }
    );
};

export const fetchLogin = async (id, password) => {
  return await fetch(
    "http://ruppinmobile.tempdomain.co.il/site04/AdminService.asmx/Login",
    {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json;charset=utf-8"
      }),
      body: JSON.stringify({ id, password })
    }
  )
    .then(res => res.json())
    .then(
      result => JSON.parse(result.d),
      error => {
        console.log("err post=", error);
      }
    );
};

export const fetchDelete = async (id, url, prop) => {
  prop = prop === "UserName" ? "userName" : "id";
  return await fetch(url, {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json;charset=utf-8"
    }),
    body: JSON.stringify({ [prop]: id })
  })
    .then(res => res.json())
    .then(
      result => JSON.parse(result.d),
      error => {
        console.log("err post=", error);
      }
    );
};

export const fetchAdd = async (item, url, tableName) => {
  let obj = {};
  item
    .getProp(tableName)
    .map(
      val =>
        (obj[
          val === "ID" ? val.toLowerCase() : val[0].toLowerCase() + val.slice(1)
        ] = item[val])
    );
  return await fetch(url, {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json;charset=utf-8"
    }),
    body: JSON.stringify(obj)
  })
    .then(res => res.json())
    .then(
      result => JSON.parse(result.d),
      error => {
        console.log("err post=", error);
      }
    );
};

export const fetchUpdate = async (lastID, item, url, prop, tableName) => {
  prop = prop === "UserName" ? "lastUserName" : "lastID";
  let obj = {};
  obj[prop] = lastID;
  item
    .getProp(tableName)
    .map(
      val =>
        (obj[
          val === "ID" ? val.toLowerCase() : val[0].toLowerCase() + val.slice(1)
        ] = item[val])
    );
  return await fetch(url, {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json;charset=utf-8"
    }),
    body: JSON.stringify(obj)
  })
    .then(res => res.json())
    .then(
      result => JSON.parse(result.d),
      error => {
        console.log("err post=", error);
      }
    );
};

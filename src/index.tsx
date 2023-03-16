import React from "react";
import ReactDOM from "react-dom/client";
import "tdesign-react/es/style/index.css";
import "./styles/index.scss";
import App from "./App";
// import { db } from "@teamworktoolbox/sdk";

// db.sync.index.create({
//   fields: ["indexInfo.createAt"],
// });

// db.sync.index.create({
//   fields: ["indexInfo.dataType"],
// });

// db.sync.index.create({
//   fields: ["indexInfo.sorted"],
// });

// db.sync.index.create({
//   fields: ["appInfo.name"],
// });
// 立即执行函数
function test() {
  let arr = []
  for (let i = 0; i < 10; i++) {
    arr[i] = function () {
      console.log(i + ' 哈哈')
    }
  }
  return arr
}
let myArr = test()
for (let j = 0; j < 10; j++) {
  myArr[j]()
}


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

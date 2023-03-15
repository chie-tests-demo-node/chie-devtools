import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Loading } from "tdesign-react";
import { Header } from "./pages/Header";
import { firstOrderRouterList, NOT_FOUND_ROUTE_PATH } from "./router";
import { GlobalData, LoadingInfo } from "./types";

export const GlobalDataContext = React.createContext<GlobalData>({} as any);

function App() {
  const [loadingInfo, setLoadingInfo] = useState<LoadingInfo>({
    loading: false,
  });
  const routeList = useMemo(() => {
    return firstOrderRouterList.map((r) => {
      return <Route path={r.path} element={r.element} key={r.path} />;
    });
  }, []);

  const showLoading = useCallback((text?: string) => {
    setLoadingInfo({
      loading: true,
      text,
    });
  }, []);

  const hideLoading = useCallback(() => {
    setLoadingInfo({
      loading: false,
    });
  }, []);

  useEffect(() => {
    //  斐波那契数列
    // 1 1 3 4 7 11 18 29
    // const feiArrayFn = function (n: any): any {
    //   if (n === 1 || n === 2) {
    //     return 1
    //   }
    //   return feiArrayFn(n - 1) + feiArrayFn(n - 2)
    // }
    // console.log(feiArrayFn(29))
    // 阶乘 (先执行的最后被执行完)
    // 5*4*3*2*1
    // const factorialFun = function (n: any): any {
    //   if (n === 1 || n === 0) {
    //     return 1
    //   }
    //   return n * factorialFun(n - 1)
    // }
    // console.log(factorialFun(5))
    // 闭包
  }, [])

  return (
    <GlobalDataContext.Provider
      value={{
        showLoading,
        hideLoading,
      }}
    >
      <HashRouter>
        <div className="layout">
          <Header />
          <div className="layout-content">
            <Routes>
              {routeList}
              <Route
                path="*"
                element={<Navigate to={NOT_FOUND_ROUTE_PATH} />}
              />
            </Routes>
          </div>
        </div>
      </HashRouter>
      <Loading
        loading={loadingInfo.loading}
        fullscreen
        preventScrollThrough={true}
        text={loadingInfo.text}
      ></Loading>
    </GlobalDataContext.Provider>
  );
}

export default App;

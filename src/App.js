import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment, useContext } from "react";

import { publicRoutes } from "./routes/index";
import DefaultLayout from "~/Layouts/DefaultLayout/DefaultLayout";
import { AuthContext } from "./Components/AuthProvider/AuthProvider";
import MenuModalItem from "~/Components/AuthForm/MenuModalItem/MenuModalItem";

function App() {

  const {isAuth} = useContext(AuthContext);
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((item, index) => {
            const Layout = item.layout === null ? Fragment : DefaultLayout;
            const Page = item.component;

            if(item.requireAuth && !isAuth){
                return <Route key={index} path={item.path} element={<MenuModalItem/>}/>
            }

            return (
              <Route
                key={index}
                path={item.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

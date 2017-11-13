import React from "react";
import { Route, Link } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "../loading";
import Header from "../header";

const Home = Loadable({
  loader: () => import("../../scenes/home"),
  loading: Loading
});
const About = Loadable({
  loader: () => import("../../scenes/about"),
  loading: Loading
});
const Users = Loadable({
  loader: () => import("../../scenes/users"),
  loading: Loading
});

const Container = () => (
  <div>
    <Header />
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/users">User</Link>
    </nav>
    <main>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/users" component={Users} />
    </main>
  </div>
);

export default Container;

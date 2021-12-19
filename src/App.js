import React from "react";

import "./index.css";

import { Header } from "./components/header/Header.js";
import OrgChart from "./components/chart/OrgChart.js";
import { Footer } from "./components/footer/Footer.js";

function App() {
  return (
    <section>
      <Header />
      <div>
        <OrgChart />
      </div>
      <Footer />
    </section>
  );
}

export default App;

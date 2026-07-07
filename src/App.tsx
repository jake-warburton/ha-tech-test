import "./App.css";
import { ResourceCentre } from "./components/organisms/ResourceCentre/ResourceCentre";

const App = () => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Resource Centre</h1>
      </header>
      <ResourceCentre />
    </div>
  );
};

export default App;

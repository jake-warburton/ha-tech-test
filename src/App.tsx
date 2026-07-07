import { ResourceCentre } from "./components/organisms/ResourceCentre/ResourceCentre";

const App = () => {
  return (
    <div className="min-h-svh bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase text-teal-700">
            HA | Wisdom Wellbeing
          </p>
          <h1 className="text-4xl font-semibold text-slate-950 sm:text-5xl">
            Resource Centre
          </h1>
          <p className="max-w-2xl text-base text-slate-600">
            Browse wellbeing resources grouped by category, with quick access
            to tags and estimated read or watch times.
          </p>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <ResourceCentre />
      </main>
    </div>
  );
};

export default App;

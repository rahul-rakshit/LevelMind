import { useState } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import MainView from "./views/MainView";
import ConfigureView from "./views/ConfigureView";
import AboutView from "./views/AboutView";
import type { Stressor } from "./types";

type View = "main" | "configure" | "about";

function randomId(length: number = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

function App() {
  const [currentView, setCurrentView] = useState<View>("main");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [stressors, setStressors] = useState<Stressor[]>([]);

  const addStressor = (stressor: Omit<Stressor, "id">) => {
    const newStressor: Stressor = {
      ...stressor,
      id: randomId()
    };
    setStressors((prev) => [...prev, newStressor]);
  };

  const updateStressor = (id: string, updates: Partial<Stressor>) => {
    setStressors((prev) =>
      prev.map((stressor) =>
        stressor.id === id ? { ...stressor, ...updates } : stressor
      )
    );
  };

  const deleteStressor = (id: string) => {
    setStressors((prev) => prev.filter((stressor) => stressor.id !== id));
  };

  const getTotalScore = () => {
    return stressors.reduce((total, stressor) => total + stressor.severity, 0);
  };

  const renderView = () => {
    switch (currentView) {
      case "main":
        return (
          <MainView
            stressors={stressors}
            updateStressor={updateStressor}
            totalScore={getTotalScore()}
          />
        );
      case "configure":
        return (
          <ConfigureView
            stressors={stressors}
            addStressor={addStressor}
            updateStressor={updateStressor}
            deleteStressor={deleteStressor}
          />
        );
      case "about":
        return <AboutView />;
      default:
        return (
          <MainView
            stressors={stressors}
            updateStressor={updateStressor}
            totalScore={getTotalScore()}
          />
        );
    }
  };

  const handleNavigation = (view: View) => {
    setCurrentView(view);
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow-sm border-b z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsDrawerOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">LevelMind</h1>
          <div className="w-10"></div>
        </div>
      </header>

      {renderView()}

      <Transition show={isDrawerOpen}>
        <Dialog onClose={setIsDrawerOpen} className="relative z-50">
          <TransitionChild
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="w-64 bg-white shadow-xl">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                    <button
                      className="p-1 rounded-md hover:bg-gray-100"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <nav className="space-y-2">
                    <button
                      className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                      onClick={() => handleNavigation("main")}
                    >
                      Set Stressors
                    </button>
                    <button
                      className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                      onClick={() => handleNavigation("configure")}
                    >
                      Edit Stressors
                    </button>
                    <button
                      className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                      onClick={() => handleNavigation("about")}
                    >
                      About
                    </button>
                  </nav>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default App;

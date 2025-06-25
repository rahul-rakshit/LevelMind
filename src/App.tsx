import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import MainView from "./views/MainView";
import ConfigureView from "./views/ConfigureView";
import AboutView from "./views/AboutView";

type View = "main" | "configure" | "about";

function App() {
  const [currentView, setCurrentView] = useState<View>("main");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case "main":
        return <MainView />;
      case "configure":
        return <ConfigureView />;
      case "about":
        return <AboutView />;
      default:
        return <MainView />;
    }
  };

  const handleNavigation = (view: View) => {
    setCurrentView(view);
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
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

      <Dialog
        open={isDrawerOpen}
        onClose={setIsDrawerOpen}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
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
        </div>
      </Dialog>
    </div>
  );
}

export default App;

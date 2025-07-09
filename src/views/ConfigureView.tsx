import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import type { Stressor } from "../types";

interface ConfigureViewProps {
  stressors: Stressor[];
  addStressor: (stressor: Omit<Stressor, "id">) => void;
  updateStressor: (id: string, updates: Partial<Stressor>) => void;
  deleteStressor: (id: string) => void;
}

function ConfigureView({ stressors, addStressor, updateStressor, deleteStressor }: ConfigureViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStressor, setEditingStressor] = useState<Stressor | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const openAddModal = () => {
    setEditingStressor(null);
    setTitle("");
    setDescription("");
    setIsModalOpen(true);
  };

  const openEditModal = (stressor: Stressor) => {
    setEditingStressor(stressor);
    setTitle(stressor.title);
    setDescription(stressor.description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStressor(null);
    setTitle("");
    setDescription("");
  };

  const handleSave = () => {
    if (!title.trim()) return;

    if (editingStressor) {
      updateStressor(editingStressor.id, {
        title: title.trim(),
        description: description.trim(),
      });
    } else {
      addStressor({
        title: title.trim(),
        description: description.trim(),
        severity: 0,
      });
    }
    closeModal();
  };


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Stressors</h2>

      {stressors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No stressors configured yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {stressors.map((stressor) => (
            <div key={stressor.id} className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="font-semibold text-gray-900 mb-1 break-words">{stressor.title}</h3>
                  {stressor.description && (
                    <p className="text-sm text-gray-600 break-words">{stressor.description}</p>
                  )}
                </div>
                <button
                  onClick={() => openEditModal(stressor)}
                  className="text-blue-600 hover:text-blue-800 p-3 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors ml-2 flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={openAddModal}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          + Add Stressor
        </button>
      </div>

      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50" data-testid="configure-stressor-modal">
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingStressor ? "Edit Stressor" : "Add Stressor"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="stressor-title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  id="stressor-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter stressor title"
                />
              </div>

              <div>
                <label htmlFor="stressor-description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="stressor-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Optional description"
                />
              </div>

              <div className="flex justify-between items-center pt-4">
                {editingStressor ? (
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this stressor?")) {
                        deleteStressor(editingStressor.id);
                        closeModal();
                      }
                    }}
                    className="px-4 py-2 text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                ) : (
                  <div></div>
                )}
                
                <div className="flex space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!title.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {editingStressor ? "Save Changes" : "Add Stressor"}
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default ConfigureView;

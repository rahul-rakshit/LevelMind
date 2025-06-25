import type { Stressor } from "../types";

interface MainViewProps {
  stressors: Stressor[];
  updateStressor: (id: string, updates: Partial<Stressor>) => void;
  totalScore: number;
}

const severityValues = [0, 1, 5, 25] as const;

function MainView({ stressors, updateStressor, totalScore }: MainViewProps) {
  const handleSliderChange = (stressorId: string, sliderValue: number) => {
    const severity = severityValues[sliderValue] as 0 | 1 | 5 | 25;
    updateStressor(stressorId, { severity });
  };

  const getSeverityIndex = (severity: 0 | 1 | 5 | 25): number => {
    return severityValues.indexOf(severity);
  };

  if (stressors.length === 0) {
    return (
      <div className="p-4">
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No stressors configured yet.</p>
          <p className="text-sm text-gray-400">
            Use the menu to "Edit Stressors" to add some.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-safe">
      <div className="mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              Σ {totalScore}
            </div>
            <div className="text-base text-gray-500">Total Overwhelm Score</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {stressors.map((stressor) => (
          <div key={stressor.id} className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900">
              {stressor.title}
            </h3>

            <div className="relative">
              <input
                type="range"
                min="0"
                max="3"
                value={getSeverityIndex(stressor.severity)}
                onChange={(e) =>
                  handleSliderChange(stressor.id, parseInt(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${(getSeverityIndex(stressor.severity) / 3) * 100}%, #e5e7eb ${(getSeverityIndex(stressor.severity) / 3) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                <span>Neutral</span>
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainView;

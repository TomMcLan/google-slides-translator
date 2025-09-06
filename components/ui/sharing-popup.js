import { useState } from 'react';
import { X, Share2, Edit3, Copy, CheckCircle, AlertTriangle } from 'lucide-react';

export function SharingPopup({ isOpen, onClose, onRetry }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  if (!isOpen) return null;

  const steps = [
    {
      title: "Open Your Google Slides",
      description: "Go to your Google Slides presentation",
      icon: <Share2 className="w-6 h-6 text-blue-600" />,
      content: (
        <div className="text-sm text-gray-600">
          <p>Make sure you have your Google Slides presentation open in your browser.</p>
        </div>
      )
    },
    {
      title: "Click the Share Button",
      description: "Find and click the blue 'Share' button in the top right",
      icon: <Share2 className="w-6 h-6 text-blue-600" />,
      content: (
        <div className="text-sm text-gray-600">
          <p>Look for the blue <strong>"Share"</strong> button in the top-right corner of your Google Slides.</p>
          <div className="mt-2 p-2 bg-blue-50 rounded border">
            <p className="text-xs text-blue-800">💡 It's usually next to the "Present" button</p>
          </div>
        </div>
      )
    },
    {
      title: "Change to 'Anyone with the link'",
      description: "Set sharing to public with edit permissions",
      icon: <Edit3 className="w-6 h-6 text-green-600" />,
      content: (
        <div className="text-sm text-gray-600 space-y-2">
          <p>1. Click <strong>"Change to anyone with the link"</strong></p>
          <p>2. In the dropdown, select <strong>"Editor"</strong> (not "Viewer")</p>
          <p>3. Click <strong>"Done"</strong></p>
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <p className="text-xs text-yellow-800">
                <strong>Important:</strong> Make sure to select "Editor" permissions, not just "Viewer"
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Copy the New Link",
      description: "Get the updated sharing link",
      icon: <Copy className="w-6 h-6 text-purple-600" />,
      content: (
        <div className="text-sm text-gray-600 space-y-2">
          <p>1. Click <strong>"Copy link"</strong> to get the new URL</p>
          <p>2. Use this new link in the translator</p>
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <p className="text-xs text-green-800">
                The new link will work with our translator!
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Fix Sharing Permissions
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start space-x-3 mb-4">
            {currentStepData.icon}
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                {currentStepData.title}
              </h3>
              <p className="text-sm text-gray-600">
                {currentStepData.description}
              </p>
            </div>
          </div>
          
          {currentStepData.content}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep < totalSteps ? (
            <button
              onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onRetry();
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
            >
              Try Again
            </button>
          )}
        </div>

        {/* Quick Action */}
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-600 mb-2">
            <strong>Quick tip:</strong> Create a backup copy of your presentation before translating!
          </p>
          <button
            onClick={() => {
              onClose();
              onRetry();
            }}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            I've Updated the Permissions - Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

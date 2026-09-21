'use client'

import { motion } from 'framer-motion'

interface StepIndicatorProps {
  steps: { key: string; label: string }[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-swiss-text">
          {steps[currentStep]?.label}
        </h2>
        <span className="text-sm font-medium text-swiss-body">
          {currentStep + 1} / {steps.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-swiss-gray-100 rounded-full h-2 overflow-hidden">
        <motion.div
          className="bg-swiss-red h-2 rounded-full"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>

      {/* Step dots (desktop) */}
      <div className="hidden md:flex items-center justify-between mt-4">
        {steps.map((step, i) => (
          <div key={step.key} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                i < currentStep
                  ? 'bg-swiss-red text-white'
                  : i === currentStep
                  ? 'bg-swiss-red text-white ring-4 ring-swiss-red/20'
                  : 'bg-swiss-gray-100 text-swiss-body'
              }`}
            >
              {i < currentStep ? '✓' : i + 1}
            </div>
            <span
              className={`text-[11px] mt-1 text-center leading-tight max-w-[80px] ${
                i === currentStep ? 'text-swiss-text font-semibold' : 'text-swiss-body'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

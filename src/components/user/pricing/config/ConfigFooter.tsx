'use client'

import React from 'react'
import { Button } from '../../../ui/button'
import { CardFooter } from '../../../ui/card'

interface ConfigFooterProps {
  step: number
  setStep: (step: number) => void
  resetProgress: () => void
  startFetching: () => void
}

export function ConfigFooter({
  step,
  setStep,
  resetProgress,
  startFetching,
}: ConfigFooterProps) {
  return (
    <CardFooter className="flex justify-between mt-6">
      <div>
        {step > 1 && step < 5 && (
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            className="border-slate-600 text-white hover:bg-slate-700"
          >
            Back
          </Button>
        )}
        {step === 5 && (
          <Button
            variant="outline"
            onClick={() => {
              setStep(3)
              resetProgress()
            }}
            className="border-slate-600 text-white hover:bg-slate-700"
          >
            Back to Summary
          </Button>
        )}
      </div>
      <div>
        {step < 3 && (
          <Button
            onClick={() => setStep(step + 1)}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
          >
            Next
          </Button>
        )}
        {step === 3 && (
          <Button
            onClick={startFetching}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
          >
            Run
          </Button>
        )}
        {step === 5 && (
          <Button
            onClick={() => {
              setStep(1)
              resetProgress()
            }}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
          >
            Restart
          </Button>
        )}
      </div>
    </CardFooter>
  )
}

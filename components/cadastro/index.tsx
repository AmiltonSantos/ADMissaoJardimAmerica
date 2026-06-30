"use client";

import { useState } from "react";
import { steps } from "./data/questions";
import FormInput from "./FormInput";
import { generatePdf } from "./generatePdf";
import { FileTextIcon } from "lucide-react";

function useMultiStep(totalSteps: number) {
  const [step, setStep] = useState(0);
  return {
    step,
    next: () => setStep((s) => Math.min(s + 1, totalSteps - 1)),
    previous: () => setStep((s) => Math.max(s - 1, 0)),
    reset: () => setStep(0),
    isFirstStep: step === 0,
    isLastStep: step === totalSteps - 1,
  };
}

export default function Cadastro() {
  const [data, setData] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { step, next, previous, reset, isFirstStep, isLastStep } = useMultiStep(steps.length);
  const currentStep = steps[step];
  const isStepValid = currentStep.fields.every((f) => {
    if (f.id === "batismoEspSanto") return data.batizadoEspSanto === "NÃO" || data[f.id]?.trim();
    return !f.required || data[f.id]?.trim();
  });

  function handleNext() {
    if (isLastStep) setCompleted(true);
    else next();
  }

  async function handleGeneratePdf() {
    setGenerating(true);
    setError(null);
    try {
      await generatePdf(data);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      setError("Erro ao gerar PDF. Verifique o console.");
    } finally {
      setGenerating(false);
    }
  }

  if (completed) {
    return (
      <section className="relative z-10 overflow-hidden pt-6 pb-10 md:pt-8 md:pb-16">
        <div className="container">
          <div className="max-w-md mx-auto bg-white dark:bg-dark rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <FileTextIcon className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-dark dark:text-white">Cadastro concluído!</h2>
              <p className="text-body-color mt-1">Clique abaixo para baixar a ficha em PDF.</p>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              onClick={handleGeneratePdf}
              disabled={generating}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-4 font-medium disabled:bg-gray-300 flex items-center justify-center gap-2 transition"
            >
              <FileTextIcon className="w-5 h-5" />
              {generating ? "Gerando PDF..." : "Baixar Ficha PDF"}
            </button>
            <button
              onClick={() => { setCompleted(false); setData({}); setError(null); reset(); }}
              className="w-full border border-primary text-primary rounded-xl py-4 font-medium hover:bg-primary/5 transition"
            >
              Novo Cadastro
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-10 overflow-hidden pt-6 pb-10 md:pt-8 md:pb-16">
      <div className="container">
        <div className="max-w-md mx-auto bg-white dark:bg-dark rounded-2xl shadow-lg p-8">
          <h1 className="text-center text-3xl font-bold text-dark dark:text-white mb-2">Cadastro</h1>
          <p className="text-center text-body-color text-sm mb-6">
            Passo {step + 1} de {steps.length} &mdash; {currentStep.title}
          </p>

          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition ${
                  i < step
                    ? "bg-primary text-white"
                    : i === step
                    ? "bg-primary text-white ring-2 ring-primary ring-offset-2"
                    : "bg-gray-200 text-gray-500 dark:bg-dark-3"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {currentStep.fields.map((field) => {
              if (field.id === "batismoEspSanto" && data.batizadoEspSanto !== "SIM") {
                return null;
              }
              return (
                <FormInput
                  key={field.id}
                  field={field}
                  value={data[field.id] || ""}
                  onChange={(value) => setData((prev) => ({ ...prev, [field.id]: value }))}
                />
              );
            })}
          </div>

          <div className="flex gap-4 mt-10">
            <button
              onClick={previous}
              disabled={isFirstStep}
              className="flex-1 border border-primary text-primary rounded-xl py-4 font-medium disabled:opacity-30 hover:bg-primary/5 transition"
            >
              Voltar
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid}
              className="flex-1 bg-primary text-white rounded-xl py-4 font-medium disabled:bg-gray-300 hover:bg-primary/90 transition"
            >
              {isLastStep ? "Finalizar" : "Próximo"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

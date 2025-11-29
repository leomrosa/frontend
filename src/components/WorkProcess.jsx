import React from "react";
import "../styles/WorkProcess.css";
import IconStep1 from "../assets/process-1.svg";
import IconStep2 from "../assets/process-3.svg";
import IconStep3 from "../assets/process-1-1.svg";

const steps = [
  { icon: IconStep1, text: "Escolha o melhor profissional para si" },
  { icon: IconStep2, text: "Escolha os horários que mais lhe convêm" },
  { icon: IconStep3, text: "Contacte o terapeuta para mais informação" }
];

const WorkProcess = () => (
  <section className="work-process-section">
    <h3 className="work-process-title">WORK PROCESS</h3>
    <h2 className="work-process-heading">Como funciona?</h2>
    <div className="process-container">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="process-step">
            <div className="step-icon">
              <img src={step.icon} alt={`Step ${index + 1}`} />
            </div>
            <p>{step.text}</p>
          </div>
          {index < steps.length - 1 && <div className="process-arrow">→</div>}
        </React.Fragment>
      ))}
    </div>
  </section>
);

export default WorkProcess;

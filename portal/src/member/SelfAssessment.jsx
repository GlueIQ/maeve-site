import React, { useState } from 'react';
import { ViewTransition } from '../components/GoldSpinner';
import { assessmentSteps, assessmentResults } from '../mockData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SelfAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedPills, setSelectedPills] = useState([]);
  const [sliderValues, setSliderValues] = useState({});

  const step = assessmentSteps[currentStep];
  const progress = ((currentStep + 1) / assessmentSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const togglePill = (pill) => {
    setSelectedPills(prev =>
      prev.includes(pill) ? prev.filter(p => p !== pill) : [...prev, pill]
    );
  };

  return (
    <ViewTransition viewKey="assessment">
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          fontWeight: 600,
          display: 'block',
          marginBottom: '8px',
        }}>Self Assessment</span>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '28px',
          fontWeight: 300,
          color: 'var(--forest)',
          letterSpacing: '-0.02em',
          marginBottom: '32px',
        }}>Readiness Assessment</h1>

        {/* Progress Bar */}
        <div style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '40px',
        }}>
          {assessmentSteps.map((_, i) => (
            <div key={i} style={{
              flex: 1,
              height: '3px',
              borderRadius: '2px',
              background: i <= currentStep ? 'var(--gold)' : 'var(--sandstone)',
              transition: 'background 0.5s var(--ease-out)',
            }} />
          ))}
        </div>

        {/* Step Content */}
        <div key={currentStep} className="view-enter" style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          padding: '48px',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid rgba(0,26,14,0.06)',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ marginBottom: '4px' }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'var(--espresso)',
              opacity: 0.3,
            }}>Step {currentStep + 1} of {assessmentSteps.length}</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '24px',
            fontWeight: 400,
            color: 'var(--forest)',
            marginBottom: '8px',
            letterSpacing: '-0.01em',
          }}>{step.question}</h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--espresso)',
            opacity: 0.5,
            marginBottom: '32px',
          }}>{step.subtitle}</p>

          <div style={{ flex: 1 }}>
            {/* Option Cards */}
            {step.type === 'options' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {step.options.map(opt => {
                  const selected = answers[step.id] === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, [step.id]: opt.id })}
                      style={{
                        padding: '20px',
                        borderRadius: 'var(--radius-lg)',
                        border: selected ? '2px solid var(--gold)' : '2px solid var(--sandstone)',
                        background: selected ? 'var(--gold-soft)' : 'var(--linen)',
                        cursor: 'pointer',
                        transition: 'all 0.2s var(--ease-out)',
                      }}
                    >
                      <div style={{
                        fontSize: '24px',
                        marginBottom: '8px',
                      }}>{opt.icon}</div>
                      <div style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: 'var(--forest)',
                        marginBottom: '4px',
                      }}>{opt.label}</div>
                      <div style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        color: 'var(--espresso)',
                        opacity: 0.6,
                      }}>{opt.description}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pill Multi-Select */}
            {step.type === 'pills' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {step.options.map(pill => {
                  const selected = selectedPills.includes(pill);
                  return (
                    <button
                      key={pill}
                      onClick={() => togglePill(pill)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: 'var(--radius-pill)',
                        border: selected ? '1.5px solid var(--gold)' : '1.5px solid var(--sandstone)',
                        background: selected ? 'var(--gold-soft)' : 'transparent',
                        color: selected ? 'var(--forest)' : 'var(--espresso)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        fontWeight: selected ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s var(--ease-out)',
                      }}
                    >
                      {pill}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Scale/Slider */}
            {step.type === 'scale' && (
              <div style={{ padding: '20px 0' }}>
                <input
                  type="range"
                  min={step.min}
                  max={step.max}
                  value={sliderValues[step.id] || 5}
                  onChange={(e) => setSliderValues({ ...sliderValues, [step.id]: e.target.value })}
                  style={{
                    width: '100%',
                    height: '6px',
                    appearance: 'none',
                    background: `linear-gradient(to right, var(--gold) 0%, var(--gold) ${((sliderValues[step.id] || 5) - step.min) / (step.max - step.min) * 100}%, var(--sandstone) ${((sliderValues[step.id] || 5) - step.min) / (step.max - step.min) * 100}%, var(--sandstone) 100%)`,
                    borderRadius: '3px',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--espresso)', opacity: 0.4 }}>{step.minLabel}</span>
                  <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '28px',
                    fontWeight: 300,
                    color: 'var(--gold)',
                  }}>{sliderValues[step.id] || 5}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--espresso)', opacity: 0.4 }}>{step.maxLabel}</span>
                </div>
              </div>
            )}

            {/* Textarea */}
            {step.type === 'textarea' && (
              <textarea
                placeholder={step.placeholder}
                value={answers[step.id] || ''}
                onChange={e => setAnswers({ ...answers, [step.id]: e.target.value })}
                style={{
                  width: '100%',
                  height: '200px',
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1.5px solid var(--sandstone)',
                  background: 'var(--linen)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  color: 'var(--espresso)',
                  resize: 'vertical',
                  outline: 'none',
                  lineHeight: 1.6,
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderColor = 'var(--sandstone)'}
              />
            )}

            {/* Results - Radar Chart */}
            {step.type === 'results' && (
              <div style={{ textAlign: 'center' }}>
                <ResponsiveContainer width="100%" height={320}>
                  <RadarChart data={assessmentResults.dimensions.map(d => ({
                    subject: d.axis,
                    value: d.value,
                    fullMark: 100,
                  }))}>
                    <PolarGrid stroke="var(--sandstone)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 12, fill: 'var(--espresso)', fontFamily: 'var(--font-sans)' }}
                    />
                    <Radar
                      name="Readiness"
                      dataKey="value"
                      stroke="var(--gold)"
                      fill="var(--gold)"
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '15px',
                  color: 'var(--forest)',
                  marginTop: '16px',
                  lineHeight: 1.6,
                  maxWidth: '500px',
                  margin: '16px auto 0',
                }}>
                  "Your strongest area is Support Network — that's your foundation. Decision Confidence is your growth edge, and that's exactly where Maeve shines."
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(0,26,14,0.06)',
          }}>
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                color: currentStep === 0 ? 'var(--sandstone)' : 'var(--forest)',
                background: 'none',
                border: 'none',
                cursor: currentStep === 0 ? 'default' : 'pointer',
              }}
            >
              <ArrowLeft size={16} /> Back
            </button>
            {currentStep < assessmentSteps.length - 1 ? (
              <button
                onClick={handleNext}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 28px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--linen)',
                  background: 'var(--forest)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'all 0.2s var(--ease-out)',
                }}
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 28px',
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--forest)',
                background: 'var(--gold)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
              }}>
                <CheckCircle2 size={16} /> Complete Assessment
              </button>
            )}
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}

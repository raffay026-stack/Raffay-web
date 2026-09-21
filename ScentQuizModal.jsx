import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { SCENT_QUIZ_QUESTIONS } from "../mock";
import { X, Sparkles, Crown, ArrowRight, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QUIZ } from "../constants/testIds";

export default function ScentQuizModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [resultCategory, setResultCategory] = useState(null);
  const { perfumes } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelectOption = (category) => {
    const updatedAnswers = [...answers, category];
    setAnswers(updatedAnswers);
    
    if (currentStep < SCENT_QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate most frequent category
      const counts = updatedAnswers.reduce((acc, cat) => {
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {});
      const bestCategory = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      setResultCategory(bestCategory);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultCategory(null);
  };

  const recommendedPerfumes = resultCategory 
    ? perfumes.filter(p => p.category === resultCategory).slice(0, 3)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" data-testid="scent-quiz-modal">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#16130D] to-[#0A0A0A] border border-[#D4AF37]/50 rounded-lg p-6 sm:p-8 text-neutral-100 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-[#D4AF37] transition-colors"
          data-testid="quiz-modal-close"
        >
          <X className="w-6 h-6" />
        </button>

        {!resultCategory ? (
          <div>
            <div className="flex items-center justify-center gap-2 text-[#D4AF37] mb-2 font-serif text-xs tracking-widest uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Bespoke Olfactive Profiler</span>
              <Sparkles className="w-4 h-4" />
            </div>
            
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-center text-[#F3E5AB] mb-2">
              Question {currentStep + 1} of {SCENT_QUIZ_QUESTIONS.length}
            </h3>
            <p className="text-sm text-neutral-400 text-center font-serif mb-8">
              {SCENT_QUIZ_QUESTIONS[currentStep].question}
            </p>

            <div className="space-y-3">
              {SCENT_QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.category)}
                  className="w-full text-left p-4 rounded bg-[#1C1710] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#282117] transition-all font-serif text-sm text-neutral-200 flex items-center justify-between group"
                  data-testid={QUIZ.optionBtn}
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8 text-xs text-neutral-500 font-serif">
              <span>Step {currentStep + 1} / {SCENT_QUIZ_QUESTIONS.length}</span>
              <div className="flex gap-1">
                {SCENT_QUIZ_QUESTIONS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-6 h-1 rounded-full ${i <= currentStep ? 'bg-[#D4AF37]' : 'bg-neutral-800'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] flex items-center justify-center text-[#0A0A0A] shadow-lg">
              <Crown className="w-8 h-8 fill-current" />
            </div>

            <div>
              <span className="text-xs text-[#D4AF37] font-serif uppercase tracking-widest">Your Bespoke Profile Match</span>
              <h3 className="font-serif text-2xl font-bold text-[#F3E5AB] mt-1">{resultCategory} Connoisseur</h3>
              <p className="text-xs text-neutral-400 font-serif mt-2 max-w-sm mx-auto">
                Based on your sophisticated preferences, our master noses have curated these exceptional masterworks for your private collection.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {recommendedPerfumes.map((perfume) => (
                <div 
                  key={perfume.id} 
                  onClick={() => { onClose(); navigate(`/perfume/${perfume.id}`); }}
                  className="bg-[#14110C] border border-[#D4AF37]/30 p-3 rounded text-left cursor-pointer hover:border-[#D4AF37] transition-all group"
                >
                  <img src={perfume.image} alt={perfume.name} className="w-full h-28 object-cover rounded mb-2 border border-[#D4AF37]/20" />
                  <span className="text-[9px] text-[#D4AF37] uppercase tracking-wider font-serif">{perfume.brand}</span>
                  <h5 className="font-serif text-xs font-medium text-neutral-200 line-clamp-1 group-hover:text-[#D4AF37]">{perfume.name}</h5>
                  <div className="text-xs font-bold text-[#D4AF37] mt-1">${perfume.price}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleRestart}
                className="flex-1 py-2.5 bg-[#1C1710] border border-[#D4AF37]/40 text-[#D4AF37] font-serif text-xs uppercase tracking-widest rounded hover:bg-[#282117] transition-all flex items-center justify-center gap-2"
                data-testid={QUIZ.restartBtn}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
              <button
                onClick={() => { onClose(); navigate(`/catalog?category=${encodeURIComponent(resultCategory)}`); }}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0A0A0A] font-serif text-xs font-bold uppercase tracking-widest rounded hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>View All Match</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}



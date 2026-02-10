import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { JourneyStep } from '../data/journeyData';
import TicketStubCard from './TicketStubCard';

interface Props {
  steps: JourneyStep[];
  completedSteps: Set<string>;
  unlockedSteps: Set<string>;
  collectedHearts: Set<string>;
  onBack: () => void;
}

const TicketsScreen: React.FC<Props> = ({
  steps,
  unlockedSteps,
  collectedHearts,
  onBack,
}) => {
  const { t } = useLanguage();

  return (
    <div className="tickets-view">
      <div className="tickets-scroll">
        <h2 className="tickets-title">{t('ticketsTitle')}</h2>
        <div className="tickets-list">
          {steps.map((step) => {
            const unlocked = unlockedSteps.has(step.id);
            const hasHeart = collectedHearts.has(step.id);

            return (
              <div
                key={step.id}
                className={unlocked ? '' : 'ticket-locked'}
                style={{ position: 'relative' }}
              >
                <TicketStubCard ticket={step.ticket} stepOrder={step.order} />
                {!unlocked && <div className="ticket-lock-overlay">&#x1F512;</div>}
                {hasHeart && unlocked && (
                  <span className="ticket-heart-badge">&#x1F49C;</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <button className="back-to-map-btn" onClick={onBack}>
        {t('backToMap')}
      </button>
    </div>
  );
};

export default TicketsScreen;

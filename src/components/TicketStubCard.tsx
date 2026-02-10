import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TicketStub } from '../data/journeyData';

interface Props {
  ticket: TicketStub;
  stepOrder: number;
  compact?: boolean;
}

const modeIcons: Record<TicketStub['mode'], React.ReactNode> = {
  flight: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
  train: (
    <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2}>
      <rect x="4" y="3" width="16" height="14" rx="2" />
      <path d="M4 11h16" />
      <path d="M12 3v8" />
      <circle cx="8" cy="20" r="1" />
      <circle cx="16" cy="20" r="1" />
      <path d="M8 17l-2 3" />
      <path d="M16 17l2 3" />
    </svg>
  ),
  meetup: (
    <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

const TicketStubCard: React.FC<Props> = ({ ticket, stepOrder, compact }) => {
  const { lang } = useLanguage();

  return (
    <div className={`ticket-stub${compact ? ' ticket-stub-compact' : ''}`}>
      <div className="ticket-mode-icon">{modeIcons[ticket.mode]}</div>
      <div className="ticket-route">
        <div className="ticket-from-to">
          <span>{ticket.from[lang]}</span>
          <span className="ticket-arrow">&rarr;</span>
          <span>{ticket.to[lang]}</span>
        </div>
        <div className="ticket-code">{ticket.code}</div>
      </div>
      <div className="ticket-order">#{stepOrder}</div>
    </div>
  );
};

export default TicketStubCard;

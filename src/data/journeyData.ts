import type { Lang } from '../i18n/uiStrings';

type BiText = Record<Lang, string>;

export interface QuizOption {
  text: BiText;
  isCorrect: boolean;
}

export interface JourneyStep {
  id: string;
  order: number;
  city: BiText;
  country: BiText;
  lat: number;
  lng: number;
  cardText: BiText;
  quiz: {
    question: BiText;
    options: QuizOption[];
  };
  photos: string[];
}

export const journeySteps: JourneyStep[] = [
  {
    id: 'sarajevo',
    order: 1,
    city: { en: 'Sarajevo', ru: 'Сараево' },
    country: { en: 'Bosnia and Herzegovina', ru: 'Босния и Герцеговина' },
    lat: 43.8563,
    lng: 18.4131,
    cardText: {
      en: 'Where it all began. The city where our eyes met for the first time, and everything changed forever.',
      ru: 'Где всё началось. Город, где наши глаза встретились впервые, и всё изменилось навсегда.',
    },
    quiz: {
      question: {
        en: 'What is Sarajevo often called?',
        ru: 'Как часто называют Сараево?',
      },
      options: [
        { text: { en: 'Jerusalem of Europe', ru: 'Европейский Иерусалим' }, isCorrect: true },
        { text: { en: 'Pearl of the Adriatic', ru: 'Жемчужина Адриатики' }, isCorrect: false },
        { text: { en: 'City of Bridges', ru: 'Город мостов' }, isCorrect: false },
      ],
    },
    photos: ['sarajevo_1.jpg', 'sarajevo_2.jpg', 'sarajevo_3.jpg', 'sarajevo_4.jpg', 'sarajevo_5.jpg'],
  },
  {
    id: 'madrid',
    order: 2,
    city: { en: 'Madrid', ru: 'Мадрид' },
    country: { en: 'Spain', ru: 'Испания' },
    lat: 40.4168,
    lng: -3.7038,
    cardText: {
      en: 'In the heart of Spain, our hearts found each other again. Some connections are simply meant to be.',
      ru: 'В сердце Испании наши сердца нашли друг друга снова. Некоторые связи предначертаны судьбой.',
    },
    quiz: {
      question: {
        en: 'What is the famous royal palace in Madrid called?',
        ru: 'Как называется знаменитый королевский дворец в Мадриде?',
      },
      options: [
        { text: { en: 'Alhambra', ru: 'Альгамбра' }, isCorrect: false },
        { text: { en: 'Palacio Real', ru: 'Королевский дворец' }, isCorrect: true },
        { text: { en: 'Alcázar', ru: 'Алькасар' }, isCorrect: false },
      ],
    },
    photos: ['madrid_1.jpg', 'madrid_2.jpg', 'madrid_3.jpg', 'madrid_4.jpg'],
  },
  {
    id: 'barcelona',
    order: 3,
    city: { en: 'Barcelona', ru: 'Барселона' },
    country: { en: 'Spain', ru: 'Испания' },
    lat: 41.3874,
    lng: 2.1686,
    cardText: {
      en: 'A sun-kissed adventure along the Mediterranean, hand in hand through Gaudí\'s dreamworld.',
      ru: 'Солнечное приключение на побережье Средиземного моря, рука об руку через мир грёз Гауди.',
    },
    quiz: {
      question: {
        en: 'Which famous architect\'s masterpiece Sagrada Família is in Barcelona?',
        ru: 'Чей шедевр Саграда Фамилия находится в Барселоне?',
      },
      options: [
        { text: { en: 'Antoni Gaudí', ru: 'Антони Гауди' }, isCorrect: true },
        { text: { en: 'Santiago Calatrava', ru: 'Сантьяго Калатрава' }, isCorrect: false },
        { text: { en: 'Frank Gehry', ru: 'Фрэнк Гери' }, isCorrect: false },
      ],
    },
    photos: ['barcelona_1.jpg', 'barcelona_2.jpg', 'barcelona_3.jpg', 'barcelona_4.jpg'],
  },
  {
    id: 'valencia',
    order: 4,
    city: { en: 'Valencia', ru: 'Валенсия' },
    country: { en: 'Spain', ru: 'Испания' },
    lat: 39.4699,
    lng: -0.3763,
    cardText: {
      en: 'Warm winds, orange groves, and the sweetness of every moment spent together.',
      ru: 'Тёплый ветер, апельсиновые рощи и сладость каждого мгновения вместе.',
    },
    quiz: {
      question: {
        en: 'What world-famous dish originates from Valencia?',
        ru: 'Какое всемирно известное блюдо родом из Валенсии?',
      },
      options: [
        { text: { en: 'Gazpacho', ru: 'Гаспачо' }, isCorrect: false },
        { text: { en: 'Paella', ru: 'Паэлья' }, isCorrect: true },
        { text: { en: 'Tapas', ru: 'Тапас' }, isCorrect: false },
      ],
    },
    photos: ['valencia_1.jpg', 'valencia_2.jpg', 'valencia_3.jpg', 'valencia_4.jpg'],
  },
  {
    id: 'bosnia',
    order: 5,
    city: { en: 'Bosnia', ru: 'Босния' },
    country: { en: 'Bosnia and Herzegovina', ru: 'Босния и Герцеговина' },
    lat: 43.3438,
    lng: 17.8078,
    cardText: {
      en: 'Back where it started — but this time, with a diamond ring and a promise of forever.',
      ru: 'Туда, где всё началось — но на этот раз с бриллиантовым кольцом и обещанием навсегда.',
    },
    quiz: {
      question: {
        en: 'What special event happened during this visit?',
        ru: 'Какое особенное событие произошло во время этого визита?',
      },
      options: [
        { text: { en: 'We took a day trip', ru: 'Мы поехали на экскурсию' }, isCorrect: false },
        { text: { en: 'A proposal with a diamond ring', ru: 'Предложение с бриллиантовым кольцом' }, isCorrect: true },
        { text: { en: 'We met for the first time', ru: 'Мы встретились впервые' }, isCorrect: false },
      ],
    },
    photos: ['bosnia_1.jpg', 'bosnia_2.jpg', 'bosnia_3.jpg', 'bosnia_4.jpg'],
  },
  {
    id: 'rotterdam',
    order: 6,
    city: { en: 'Rotterdam', ru: 'Роттердам' },
    country: { en: 'Netherlands', ru: 'Нидерланды' },
    lat: 51.9244,
    lng: 4.4777,
    cardText: {
      en: 'Modern love in a modern city. Building our future together, one bridge at a time.',
      ru: 'Современная любовь в современном городе. Строим наше будущее вместе, мост за мостом.',
    },
    quiz: {
      question: {
        en: 'What is Rotterdam famous for in Europe?',
        ru: 'Чем Роттердам знаменит в Европе?',
      },
      options: [
        { text: { en: 'Largest port in Europe', ru: 'Крупнейший порт Европы' }, isCorrect: true },
        { text: { en: 'Oldest university in Europe', ru: 'Старейший университет Европы' }, isCorrect: false },
        { text: { en: 'Largest tulip market', ru: 'Крупнейший рынок тюльпанов' }, isCorrect: false },
      ],
    },
    photos: ['rotterdam_1.jpg', 'rotterdam_2.jpg', 'rotterdam_3.jpg', 'rotterdam_4.jpg'],
  },
  {
    id: 'amsterdam',
    order: 7,
    city: { en: 'Amsterdam', ru: 'Амстердам' },
    country: { en: 'Netherlands', ru: 'Нидерланды' },
    lat: 52.3676,
    lng: 4.9041,
    cardText: {
      en: 'Wandering along the canals, every bridge a reminder that love connects everything.',
      ru: 'Гуляя вдоль каналов, каждый мост — напоминание, что любовь связывает всё.',
    },
    quiz: {
      question: {
        en: 'Approximately how many canals does Amsterdam have?',
        ru: 'Сколько примерно каналов в Амстердаме?',
      },
      options: [
        { text: { en: 'About 50', ru: 'Около 50' }, isCorrect: false },
        { text: { en: 'About 165', ru: 'Около 165' }, isCorrect: true },
        { text: { en: 'About 300', ru: 'Около 300' }, isCorrect: false },
      ],
    },
    photos: ['amsterdam_1.jpg', 'amsterdam_2.jpg', 'amsterdam_3.jpg', 'amsterdam_4.jpg'],
  },
  {
    id: 'eindhoven',
    order: 8,
    city: { en: 'Eindhoven', ru: 'Эйндховен' },
    country: { en: 'Netherlands', ru: 'Нидерланды' },
    lat: 51.4416,
    lng: 5.4697,
    cardText: {
      en: 'The glow of a thousand lights — just like the spark between us that never dims.',
      ru: 'Сияние тысячи огней — как искра между нами, которая никогда не гаснет.',
    },
    quiz: {
      question: {
        en: 'What major technology company was founded in Eindhoven?',
        ru: 'Какая крупная технологическая компания была основана в Эйндховене?',
      },
      options: [
        { text: { en: 'Siemens', ru: 'Сименс' }, isCorrect: false },
        { text: { en: 'Samsung', ru: 'Самсунг' }, isCorrect: false },
        { text: { en: 'Philips', ru: 'Филипс' }, isCorrect: true },
      ],
    },
    photos: ['eindhoven_1.svg', 'eindhoven_2.svg', 'eindhoven_3.svg', 'eindhoven_4.svg'],
  },
];

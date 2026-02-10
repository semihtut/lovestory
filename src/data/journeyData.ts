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
  loveLetter: BiText;
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
    loveLetter: {
      en: 'My love, do you remember that moment in Sarajevo when our eyes met and the whole world went quiet? I didn\'t know it then, but that was the moment my life truly began. Every love story has a first page, and ours was written in the cobblestone streets of that beautiful city.',
      ru: 'Любовь моя, ты помнишь тот момент в Сараево, когда наши глаза встретились и весь мир замолчал? Тогда я ещё не знал, но именно в тот миг началась моя настоящая жизнь. У каждой истории любви есть первая страница, и наша была написана на мощёных улочках этого прекрасного города.',
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
    loveLetter: {
      en: 'My darling, fate brought us back together in Madrid, and I knew then that some things are simply meant to be. The universe conspired to put you in my path again, and this time I wasn\'t going to let you go. In the warm Spanish night I felt my heart come home to yours.',
      ru: 'Родная моя, судьба снова свела нас в Мадриде, и тогда я понял — некоторые вещи просто предначертаны. Вселенная сделала всё, чтобы мы снова оказались рядом, и на этот раз я уже не собирался тебя отпускать. В тёплой испанской ночи моё сердце наконец вернулось домой — к тебе.',
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
    loveLetter: {
      en: 'My love, walking hand in hand with you through Gaudi\'s dreamworld, I realized that no masterpiece could ever compare to you. The Mediterranean sun kissed your skin, and I thought — even Barcelona, with all its beauty, is jealous of the way you glow.',
      ru: 'Любовь моя, гуляя с тобой за руку среди творений Гауди, я понял, что ни один шедевр не сравнится с тобой. Средиземное солнце целовало твою кожу, и я подумал — даже Барселона со всей её красотой завидует тому, как ты сияешь.',
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
    loveLetter: {
      en: 'My sweet one, Valencia smelled of orange blossoms, but nothing in this world is sweeter than the taste of your kiss. Every warm breeze carried your laughter, and I kept thinking — I want every single moment of my life to feel exactly like this, with you beside me.',
      ru: 'Сладкая моя, Валенсия пахла цветами апельсина, но ничто на свете не слаще вкуса твоего поцелуя. Каждый тёплый ветерок нёс твой смех, и я всё думал — я хочу, чтобы каждое мгновение моей жизни было именно таким, с тобой рядом.',
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
    loveLetter: {
      en: 'My forever love, I brought you back to where our story began because this is where I wanted to ask the most important question of my life. With a diamond ring and trembling hands, I promised you forever — and I will spend every day making sure you know it was the truest word I ever spoke.',
      ru: 'Любовь моя навеки, я привёз тебя туда, где началась наша история, потому что именно здесь я хотел задать самый важный вопрос в своей жизни. С бриллиантовым кольцом и дрожащими руками я пообещал тебе вечность — и каждый день я буду доказывать, что это были самые искренние слова, которые я когда-либо произносил.',
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
    loveLetter: {
      en: 'My love, Rotterdam is a city that rebuilt itself from nothing into something extraordinary — just like us. Walking its bold skyline with you, I felt it so clearly: we are building something beautiful together, brick by brick, day by day, and our love is the strongest foundation there is.',
      ru: 'Любовь моя, Роттердам — город, который восстал из руин и стал чем-то невероятным, совсем как мы с тобой. Гуляя среди его смелых небоскрёбов, я чувствовал так ясно: мы строим что-то прекрасное вместе, кирпичик за кирпичиком, день за днём, и наша любовь — самый прочный фундамент на свете.',
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
    loveLetter: {
      en: 'My darling, Amsterdam has a thousand bridges, but none of them is as strong as the one between your heart and mine. As we wandered along the canals in the golden evening light, I whispered a quiet thank you to the universe for connecting my life to yours.',
      ru: 'Родная моя, в Амстердаме тысяча мостов, но ни один из них не крепче того, что соединяет твоё сердце с моим. Когда мы гуляли вдоль каналов в золотом вечернем свете, я тихо прошептал спасибо вселенной за то, что она связала мою жизнь с твоей.',
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
];

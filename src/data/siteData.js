export const telegramLink = "https://t.me/nyxusdt";

export const brand = {
  name: "Vission Studio",
  heroTitle: "/vission-logo-white.png",
  heroSubtitle: "Studio",
};

export const navLinks = [
  ["Портфолио", "#portfolio"],
  ["Услуги", "#services"],
  ["О студии", "#about"],
  ["Отзывы", "#testimonials"],
];

const portfolioImages = [
  { src: "/optimized/portfolio/manimedia.jpg", width: 1300, height: 1082 },
  { src: "/optimized/portfolio/ramka-comunity.jpg", width: 1300, height: 975 },
  { src: "/optimized/portfolio/youtubelab.jpg", width: 1300, height: 975 },
  { src: "/optimized/portfolio/latemhomes.jpg", width: 1500, height: 843 },
  { src: "/optimized/portfolio/simplisft.jpg", width: 1300, height: 975 },
  { src: "/optimized/portfolio/dimatech.jpg", width: 1300, height: 975 },
];

const hiddenModalProjects = [
  {
    title: "Simpli Soft",
    category: "B2B software",
    text: "Платформа для автоматизации операционных процессов, клиентских коммуникаций и рабочих модулей для бизнеса.",
    href: "https://www.simplisoft.app/",
    image: portfolioImages[4].src,
    imageWidth: portfolioImages[4].width,
    imageHeight: portfolioImages[4].height,
    tags: ["Software", "Automation", "B2B"],
  }, 
  {
    title: "Dima Tech",
    category: "Порфолио ",
    text: "Платформа для автоматизации операционных процессов, клиентских коммуникаций и рабочих модулей для бизнеса.",
    href: "https://www.dima-tech.com/",
    image: portfolioImages[5].src,
    imageWidth: portfolioImages[5].width,
    imageHeight: portfolioImages[5].height,
    tags: ["Software", "Automation", "B2B"],
  }
]

export const projects = [
  {
    title: "МаниМедиа",
    category: "Сайт и платформа",
    text: "Digital-платформа с личным кабинетом и системой аналитики для медиа-проектов.",
    href: "https://mm-web-wheat.vercel.app",
    image: portfolioImages[0].src,
    imageWidth: portfolioImages[0].width,
    imageHeight: portfolioImages[0].height,
    tags: ["#UX/UI", "#Frontend", "#Backend"],
  },
  {
    title: "Ramka Community",
    category: "Комьюнити",
    text: "Платформа для сообщества с аккуратной структурой, событиями и удобной навигацией.",
    href: "https://ramka-web.vercel.app",
    image: portfolioImages[1].src,
    imageWidth: portfolioImages[1].width,
    imageHeight: portfolioImages[1].height,
    tags: ["Community", "Events", "CMS"],
  },
  {
    title: "Youtube Lab",
    category: "Медиа-сайт",
    text: "Сайт для медиа-лаборатории с фокусом на понятную подачу услуг и заявки.",
    href: "https://youtube-lab-phi.vercel.app",
    image: portfolioImages[2].src,
    imageWidth: portfolioImages[2].width,
    imageHeight: portfolioImages[2].height,
    tags: ["Media", "Landing", "Leads"],
  },
  {
    title: "Latem Homes",
    category: "Недвижимость",
    text: "Сайт для мобильных домов с понятной структурой, сильным SEO и коверсирующим дизайном",
    href: "https://www.latemhomes.nl",
    image: portfolioImages[3].src,
    imageWidth: portfolioImages[3].width,
    imageHeight: portfolioImages[3].height,
    tags: ["Build", "Landing", "Leads"],
  },
];

export const portfolioModalProjects = [
  ...projects,
  hiddenModalProjects[0],
  hiddenModalProjects[1],
];

export const criticalMedia = [
  "/vission-studio-icon-black.png",
  "/vission-logo-white.png",
  "/mountains-head.jpg",
  ...projects.map((project) => project.image),
];

export const services = [
  ["01", "Сайт", "Лендинг, корпоративный, магазин"],
  ["02", "Mini App", "Telegram: продажи, каталоги, квизы"],
  ["03", "Telegram-бот", "Заявки, заказы, автоматизация"],
  ["04", "Дизайн", "UI/UX, Figma, прототипирование"],
  ["05", "Трафик", "SEO, Meta Ads, Google Ads, Telegram Ads, Analytics"],
  ["06", "Под ключ", "Сайт + бот + аналитика + поддержка"]
];

export const stats = [
  ["50+", "проектов запущено"],
  ["7", "направлений работы"],
  ["1-3", "дня на простой сайт"],
  ["24/7", "на связи по проектам"],
];

export const aboutCards = [
  ["Погружаемся в бизнес", "Перед разработкой разбираем задачу, аудиторию, продукт и путь клиента."],
  ["Работаем по этапам", "Фиксируем структуру, сроки, задачи и показываем промежуточный результат."],
  ["Думаем о конверсии", "Делаем не просто красивый интерфейс, а систему, которая ведёт к действию."],
  ["Поддерживаем после", "Помогаем с правками, техническими вопросами и развитием проекта."],
];

export const workSteps = [
  ["01", "Бриф", "Собираем задачу, цели, референсы, ограничения и нужный результат."],
  ["02", "Прототип", "Собираем структуру, сценарии, ключевые экраны и точки конверсии."],
  ["03", "Дизайн", "Создаём визуальную систему, адаптивы и понятный пользовательский путь."],
  ["04", "Разработка", "Верстаем, подключаем логику, формы, ботов, аналитику и админ-процессы."],
  ["05", "Запуск", "Проверяем, публикуем, передаём доступы и остаёмся рядом после релиза."],
];

export const requestBenefits = [
  "Бесплатная консультация",
  "Оценка за несколько часов",
  "Без скрытых платежей",
];

export const goals = [
  "Запустить новый проект",
  "Обновить текущий сайт",
  "Получать больше заявок",
  "Автоматизировать продажи",
  "Улучшить UI/UX",
];

export const reviews = [
  "/optimized/reviews/review1.jpg",
  "/optimized/reviews/review2.jpg",
  "/optimized/reviews/review3.jpg",
  "/optimized/reviews/review4.jpg",
  "/optimized/reviews/review5.jpg",
];

export const needs = [
  "Сайт / лендинг",
  "Telegram Mini App",
  "Telegram-бот",
  "UI/UX-дизайн",
  "SEO / реклама",
  "Под ключ",
];

export const budgets = [
  "До $500",
  "$500 – $1 000",
  "$1 000 – $2 500",
  "$2 500+",
  "Обсудим",
];

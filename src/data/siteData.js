export const telegramLink = "https://t.me/nyxusdt";

const portfolioImages = [
  { src: "/optimized/portfolio/manimedia.jpg", width: 1300, height: 1082 },
  { src: "/optimized/portfolio/ramka-comunity.jpg", width: 1300, height: 975 },
  { src: "/optimized/portfolio/youtubelab.jpg", width: 1300, height: 975 },
  { src: "/optimized/portfolio/latemhomes.jpg", width: 1500, height: 843 },
  { src: "/optimized/portfolio/simplisft.jpg", width: 1300, height: 975 },
  { src: "/optimized/portfolio/dimatech.jpg", width: 1300, height: 975 },
];

const reviews = [
  "/optimized/reviews/review1.jpg",
  "/optimized/reviews/review2.jpg",
  "/optimized/reviews/review3.jpg",
  "/optimized/reviews/review4.jpg",
  "/optimized/reviews/review5.jpg",
];

const brand = {
  name: "Vission Studio",
  heroTitle: "/vission-logo-white.png",
  heroSubtitle: "Studio",
};

const withImage = (project, imageIndex) => ({
  ...project,
  image: portfolioImages[imageIndex].src,
  imageWidth: portfolioImages[imageIndex].width,
  imageHeight: portfolioImages[imageIndex].height,
});

const ruProjects = [
  withImage({
    title: "МаниМедиа",
    category: "Сайт и платформа",
    text: "Digital-платформа с личным кабинетом и системой аналитики для медиа-проектов.",
    href: "https://mm-web-wheat.vercel.app",
    tags: ["#UX/UI", "#Frontend", "#Backend"],
  }, 0),
  withImage({
    title: "Ramka Community",
    category: "Комьюнити",
    text: "Платформа для сообщества с аккуратной структурой, событиями и удобной навигацией.",
    href: "https://ramka-web.vercel.app",
    tags: ["Community", "Events", "CMS"],
  }, 1),
  withImage({
    title: "Youtube Lab",
    category: "Медиа-сайт",
    text: "Сайт для медиа-лаборатории с фокусом на понятную подачу услуг и заявки.",
    href: "https://youtube-lab-phi.vercel.app",
    tags: ["Media", "Landing", "Leads"],
  }, 2),
  withImage({
    title: "Latem Homes",
    category: "Недвижимость",
    text: "Сайт для мобильных домов с понятной структурой, сильным SEO и коверсирующим дизайном",
    href: "https://www.latemhomes.nl",
    tags: ["Build", "Landing", "Leads"],
  }, 3),
];

const enProjects = [
  withImage({
    title: "ManiMedia",
    category: "Website and platform",
    text: "A digital platform with a personal dashboard and analytics system for media projects.",
    href: "https://mm-web-wheat.vercel.app",
    tags: ["#UX/UI", "#Frontend", "#Backend"],
  }, 0),
  withImage({
    title: "Ramka Community",
    category: "Community",
    text: "A structured community platform with events, content management, and clear navigation.",
    href: "https://ramka-web.vercel.app",
    tags: ["Community", "Events", "CMS"],
  }, 1),
  withImage({
    title: "Youtube Lab",
    category: "Media website",
    text: "A media-lab website focused on clear service presentation and lead generation.",
    href: "https://youtube-lab-phi.vercel.app",
    tags: ["Media", "Landing", "Leads"],
  }, 2),
  withImage({
    title: "Latem Homes",
    category: "Real estate",
    text: "A website for mobile homes with clear structure, SEO focus, and conversion-driven design.",
    href: "https://www.latemhomes.nl",
    tags: ["Build", "Landing", "Leads"],
  }, 3),
];

const ruHiddenProjects = [
  withImage({
    title: "Simpli Soft",
    category: "B2B software",
    text: "Платформа для автоматизации операционных процессов, клиентских коммуникаций и рабочих модулей для бизнеса.",
    href: "https://www.simplisoft.app/",
    tags: ["Software", "Automation", "B2B"],
  }, 4),
  withImage({
    title: "Dima Tech",
    category: "Портфолио",
    text: "Портфолио для специалиста в digital и разработке с акцентом на услуги, опыт и понятный контакт.",
    href: "https://www.dima-tech.com/",
    tags: ["Portfolio", "Personal", "Web"],
  }, 5),
];

const enHiddenProjects = [
  withImage({
    title: "Simpli Soft",
    category: "B2B software",
    text: "A platform for automating operations, client communication, and business workflow modules.",
    href: "https://www.simplisoft.app/",
    tags: ["Software", "Automation", "B2B"],
  }, 4),
  withImage({
    title: "Dima Tech",
    category: "Portfolio",
    text: "A personal portfolio for a digital and development specialist, focused on services, experience, and contact.",
    href: "https://www.dima-tech.com/",
    tags: ["Portfolio", "Personal", "Web"],
  }, 5),
];

const shared = {
  brand,
  telegramLink,
  reviews,
};

const ru = {
  ...shared,
  locale: "ru",
  path: "/",
  seo: {
    title: "Vission Studio - веб-студия, сайты, Telegram Mini Apps, боты и UI/UX",
    description:
      "Vission Studio разрабатывает сайты, лендинги, Telegram Mini Apps, Telegram-ботов и UI/UX-дизайн под ключ для бизнеса в СНГ: стратегия, дизайн, разработка, SEO и запуск.",
    keywords:
      "Vission Studio, Vission Studio сайт, веб студия, digital studio, разработка сайтов, создание сайтов, лендинг под ключ, сайт под ключ, Telegram Mini App, Telegram бот, UI UX дизайн, SEO, разработка сайта для бизнеса",
  },
  navLinks: [["Портфолио", "#portfolio"], ["Услуги", "#services"], ["О студии", "#about"], ["Отзывы", "#testimonials"]],
  header: {
    navLabel: "Основная навигация",
    homeLabel: "Vission Studio - на главную",
    cta: "Получить консультацию",
    menuLabel: "Открыть меню",
  },
  hero: {
    ariaLabel: "Главный экран",
    srTitle: "Vission Studio - разработка сайтов, Telegram Mini Apps, Telegram-ботов и UI/UX-дизайна",
    text: ["Сайты, Telegram Mini Apps", "и боты под ключ."],
    primaryCta: "Обсудить проект",
    secondaryCta: "Портфолио",
  },
  projects: ruProjects,
  portfolioModalProjects: [...ruProjects, ...ruHiddenProjects],
  portfolio: {
    title: "Портфолио",
    openProjectLabel: "Открыть проект",
    tagsLabel: "Технологии и акценты",
    metricsLabel: "Ключевые показатели",
    projectLink: "Смотреть проект",
    archiveEyebrow: "Архив",
    modalTitle: "Все проекты",
    closeLabel: "Закрыть окно",
    moreButton: "Смотреть все проекты",
  },
  services: [
    ["01", "Сайт", "Лендинг, корпоративный, магазин", "Сайт / лендинг"],
    ["02", "Mini App", "Telegram: продажи, каталоги, квизы", "Telegram Mini App"],
    ["03", "Telegram-бот", "Заявки, заказы, автоматизация", "Telegram-бот"],
    ["04", "Дизайн", "UI/UX, Figma, прототипирование", "UI/UX-дизайн"],
    ["05", "Трафик", "SEO, Meta Ads, Google Ads, Telegram Ads, Analytics", "SEO / реклама"],
    ["06", "Под ключ", "Сайт + бот + аналитика + поддержка", "Под ключ"],
  ],
  servicesCopy: {
    title: "Услуги",
    text: "Всё, что нужно для присутствия в интернете - от идеи до запуска.",
  },
  stats: [["50+", "проектов запущено"], ["7", "направлений работы"], ["1-3", "дня на простой сайт"], ["24/7", "на связи по проектам"]],
  aboutTitle: "О студии",
  aboutCards: [
    ["Погружаемся в бизнес", "Перед разработкой разбираем задачу, аудиторию, продукт и путь клиента."],
    ["Работаем по этапам", "Фиксируем структуру, сроки, задачи и показываем промежуточный результат."],
    ["Думаем о конверсии", "Делаем не просто красивый интерфейс, а систему, которая ведёт к действию."],
    ["Поддерживаем после", "Помогаем с правками, техническими вопросами и развитием проекта."],
  ],
  workSteps: [
    ["01", "Бриф", "Собираем задачу, цели, референсы, ограничения и нужный результат."],
    ["02", "Прототип", "Собираем структуру, сценарии, ключевые экраны и точки конверсии."],
    ["03", "Дизайн", "Создаём визуальную систему, адаптивы и понятный пользовательский путь."],
    ["04", "Разработка", "Верстаем, подключаем логику, формы, ботов, аналитику и админ-процессы."],
    ["05", "Запуск", "Проверяем, публикуем, передаём доступы и остаёмся рядом после релиза."],
  ],
  requestBenefits: [],
  goals: ["Запустить новый проект", "Обновить текущий сайт", "Получать больше заявок", "Автоматизировать продажи", "Улучшить UI/UX"],
  needs: ["Сайт / лендинг", "Telegram Mini App", "Telegram-бот", "UI/UX-дизайн", "SEO / реклама", "Под ключ"],
  budgets: ["До $500", "$500 – $1 000", "$1 000 – $2 500", "$2 500+", "Обсудим"],
  request: {
    processEyebrow: "Процесс",
    processTitle: "Как мы работаем",
    formEyebrow: "Заявка",
    formTitle: "Расскажите о проекте",
    goalLabel: "Цель",
    needLabel: "Что нужно?",
    budgetLabel: "Бюджет",
    firstNameLabel: "Имя",
    firstNamePlaceholder: "Иван",
    lastNameLabel: "Фамилия",
    lastNamePlaceholder: "Иванов",
    contactLabel: "Telegram / телефон / имейл",
    contactPlaceholder: "@username, +7... или ...@gmail.com",
    descriptionLabel: "О проекте",
    descriptionPlaceholder: "Расскажите о задаче...",
    submit: "Отправить заявку",
    loading: "Отправляем...",
    successMessage: "Заявка отправлена. Скоро свяжемся с вами.",
    errorMessage: "Не удалось отправить заявку.",
  },
  toast: {
    success: { title: "Заявка отправлена", defaultMessage: "Спасибо. Скоро свяжемся с вами." },
    error: { title: "Не удалось отправить", defaultMessage: "Проверьте данные или попробуйте позже." },
    closeLabel: "Закрыть уведомление",
  },
  testimonials: {
    eyebrow: "Отзывы",
    title: "Что говорят клиенты",
    prevLabel: "Предыдущий отзыв",
    nextLabel: "Следующий отзыв",
    reviewLabel: "Отзыв клиента",
    dotsLabel: "Выбор отзыва",
    dotLabel: "Перейти к отзыву",
    closeLabel: "Закрыть отзыв",
    zoomAlt: "Увеличенный отзыв",
  },
  footer: {
    title: ["Запустим ваш", "проект вместе"],
    cta: "Написать в Telegram",
  },
};

const en = {
  ...shared,
  locale: "en",
  path: "/en",
  seo: {
    title: "Vission Studio - websites, Telegram Mini Apps, bots and UI/UX",
    description:
      "Vission Studio builds websites, landing pages, Telegram Mini Apps, Telegram bots and UI/UX design for businesses: strategy, design, development, SEO and launch.",
    keywords:
      "Vission Studio, web studio, website development, landing page, Telegram Mini App, Telegram bot, UI UX design, SEO, digital studio, business website",
  },
  navLinks: [["Portfolio", "#portfolio"], ["Services", "#services"], ["About", "#about"], ["Reviews", "#testimonials"]],
  header: {
    navLabel: "Main navigation",
    homeLabel: "Vission Studio - home",
    cta: "Get a consultation",
    menuLabel: "Open menu",
  },
  hero: {
    ariaLabel: "Hero section",
    srTitle: "Vission Studio - websites, Telegram Mini Apps, Telegram bots and UI/UX design",
    text: ["Websites, Telegram Mini Apps", "and bots built end to end."],
    primaryCta: "Discuss a project",
    secondaryCta: "Portfolio",
  },
  projects: enProjects,
  portfolioModalProjects: [...enProjects, ...enHiddenProjects],
  portfolio: {
    title: "Portfolio",
    openProjectLabel: "Open project",
    tagsLabel: "Technologies and focus areas",
    metricsLabel: "Key metrics",
    projectLink: "View project",
    archiveEyebrow: "Archive",
    modalTitle: "All projects",
    closeLabel: "Close modal",
    moreButton: "View all projects",
  },
  services: [
    ["01", "Website", "Landing page, corporate website, online store", "Website / landing page"],
    ["02", "Mini App", "Telegram sales, catalogs, quizzes", "Telegram Mini App"],
    ["03", "Telegram bot", "Leads, orders, automation", "Telegram bot"],
    ["04", "Design", "UI/UX, Figma, prototyping", "UI/UX design"],
    ["05", "Traffic", "SEO, Meta Ads, Google Ads, Telegram Ads, Analytics", "SEO / ads"],
    ["06", "Full package", "Website + bot + analytics + support", "Full package"],
  ],
  servicesCopy: {
    title: "Services",
    text: "Everything you need for a strong online presence - from idea to launch.",
  },
  stats: [["50+", "projects launched"], ["7", "service areas"], ["1-3", "days for a simple site"], ["24/7", "project communication"]],
  aboutTitle: "About",
  aboutCards: [
    ["We study the business", "Before development, we clarify the task, audience, product and customer journey."],
    ["We work in stages", "We define structure, timing, tasks and show intermediate results along the way."],
    ["We think about conversion", "We build not just a clean interface, but a system that guides users to action."],
    ["We support after launch", "We help with edits, technical questions and further project growth."],
  ],
  workSteps: [
    ["01", "Brief", "We collect goals, references, constraints and the result you need."],
    ["02", "Prototype", "We build the structure, scenarios, key screens and conversion points."],
    ["03", "Design", "We create the visual system, responsive layouts and a clear user path."],
    ["04", "Development", "We code the interface, connect logic, forms, bots, analytics and admin flows."],
    ["05", "Launch", "We test, publish, hand over access and stay close after release."],
  ],
  requestBenefits: [],
  goals: ["Launch a new project", "Update an existing website", "Get more leads", "Automate sales", "Improve UI/UX"],
  needs: ["Website / landing page", "Telegram Mini App", "Telegram bot", "UI/UX design", "SEO / ads", "Full package"],
  budgets: ["Up to €500", "€500 – €1 000", "€1 000 – €2 500", "€2 500+", "Let's discuss"],
  request: {
    processEyebrow: "Process",
    processTitle: "How we work",
    formEyebrow: "Request",
    formTitle: "Tell us about your project",
    goalLabel: "Goal",
    needLabel: "What do you need?",
    budgetLabel: "Budget",
    firstNameLabel: "First name",
    firstNamePlaceholder: "Ivan",
    lastNameLabel: "Last name",
    lastNamePlaceholder: "Ivanov",
    contactLabel: "Telegram / phone / email",
    contactPlaceholder: "@username, +7... or ...@gmail.com",
    descriptionLabel: "About the project",
    descriptionPlaceholder: "Tell us what you want to build...",
    submit: "Send request",
    loading: "Sending...",
    successMessage: "Request sent. We will contact you soon.",
    errorMessage: "Could not send the request.",
  },
  toast: {
    success: { title: "Request sent", defaultMessage: "Thank you. We will contact you soon." },
    error: { title: "Could not send", defaultMessage: "Check the details or try again later." },
    closeLabel: "Close notification",
  },
  testimonials: {
    eyebrow: "Reviews",
    title: "What clients say",
    prevLabel: "Previous review",
    nextLabel: "Next review",
    reviewLabel: "Client review",
    dotsLabel: "Select review",
    dotLabel: "Go to review",
    closeLabel: "Close review",
    zoomAlt: "Enlarged review",
  },
  footer: {
    title: ["Let's launch your", "project together"],
    cta: "Message on Telegram",
  },
};

export const siteDataByLocale = { ru, en };

export const getLocaleFromPath = (pathname = window.location.pathname) =>
  pathname.replace(/\/+$/, "") === "/en" || pathname.startsWith("/en/") ? "en" : "ru";

export const getSiteData = (locale = "ru") => siteDataByLocale[locale] || siteDataByLocale.ru;

export const criticalMedia = [
  "/vission-studio-icon-black.png",
  "/vission-logo-white.png",
  "/mountains-head.jpg",
  ...ruProjects.map((project) => project.image),
];

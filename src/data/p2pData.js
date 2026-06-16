export const p2pConfig = {
  showFeaturedOffer: true,
}

export const p2pOrders = [
  {
    badge: 'Популярное для новых пользователей',
    completion: '181 Ордера (97%)',
    limit: '5000,00 - 5000,00 RUB',
    methods: ['Mobile Top-up', 'Наличные', 'Bank Transfer'],
    name: 'Sonnberry',
    orders: '',
    price: '75,00',
    quantity: '100 USDT',
    time: '2мин.',
    featured: true,
    visible: false,
  },
  {
    completion: '5 Ордера (100%)',
    limit: '500,00 - 501,00 RUB',
    methods: ['Bank Transfer'],
    name: 'G0v0nuc',
    price: '72,94',
    quantity: '11,7252 USDT',
    time: '1мин.',
  },
  {
    completion: '349 Ордера (100%)',
    disabled: true,
    limit: '1650,00 - 1650,00 RUB',
    methods: ['Bank Transfer'],
    name: 'Amirkhankh',
    price: '74,00',
    quantity: '30 USDT',
    time: '4мин.',
  },
  {
    completion: '565 Ордера (100%)',
    limit: '1000,00 - 2500,00 RUB',
    methods: ['Bank Transfer'],
    name: 'DominateX',
    price: '74,20',
    quantity: '54 USDT',
  },
]

export const p2pBottomNavItems = [
  { icon: 'home', key: 'p2p', label: 'P2P' },
  { icon: 'orders', key: 'orders', label: 'Orders' },
  { icon: 'ads', key: 'ads', label: 'Ads' },
  { icon: 'profile', key: 'profile', label: 'Profile' },
]

export const p2pProfileData = {
  statuses: [
    { active: true, label: 'Эл. почта' },
    { active: false, label: 'SMS' },
    { active: true, label: 'Верификация личности' },
    { active: false, label: 'Депозит' },
  ],
  stats: [
    { label: 'Исполненные ордера за 30 дней', value: '4 Ордера' },
    { help: true, label: 'Исполнено за 30 дней', value: '100 %' },
    { label: 'Средн. время перевода', value: '1 мин.' },
    { label: 'Средн. время оплаты', value: '1 мин.' },
  ],
  summaryActionLabel: 'Больше данных',
  user: {
    name: 'test666',
  },
  menuGroups: [
    [
      { icon: 'ticket', label: 'P2P-купон' },
      { icon: 'wallet', label: 'Способ оплаты', value: '2' },
      { accent: true, icon: 'merchant', label: 'Мерчант', value: 'Список привилегий' },
    ],
    [
      { icon: 'review', label: 'Оставьте отзыв', value: 100 },
      { icon: 'notifications', label: 'Настройка уведомлений' },
      { icon: 'subscriptions', label: 'Подписки' },
      { icon: 'blacklist', label: 'Управлять чёрным списком' },
    ],
  ],
}

export const p2pProfileDetailsData = {
  sections: [
    [
      { label: 'Исполненные ордера за 30 дней', value: '0 Ордера' },
      {
        label: 'Все исполненные ордера',
        value: '0 Ордера',
        valueNote: 'Покупка 0 | Продажа 0',
      },
      {
        label: 'Высокий рейтинг %',
        value: '0%',
        valueNote: '0 | 0',
        valueNoteType: 'rating',
      },
      { label: 'Процент исполнения за 30 дней (%)', value: '0 %' },
      { label: 'Средн. время перевода', value: '0 мин.' },
      { label: 'Средн. время оплаты', value: '0 мин.' },
    ],
    [
      { label: 'Дней с создания аккаунта', value: '73 дн.' },
      { label: 'Дней с первой сделки', value: '0 дн.' },
      {
        help: true,
        label: 'Подтверждённое имя',
        revealedValue: 'IVAN IVANOVICH',
        value: '****',
        valueIcon: 'hidden',
      },
      { label: 'Торговый объём за 30 дней', value: '0 USDT' },
      { label: 'Прибл. общий торговый объём', value: '0 USDT' },
    ],
  ],
}

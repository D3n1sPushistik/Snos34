import React, { useState, useEffect } from 'react';
import { ChevronDown, PhoneIncoming, Copy, MapPinned, Hammer, Fence, Trash, Truck, Move3D } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [dividerHeight, setDividerHeight] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Расчет высоты разделительной линии
      const servicesSection = document.getElementById('services-section');
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.top <= viewportHeight && rect.bottom >= 0) {
          // Элемент виден в viewport
          const visibleHeight = Math.min(viewportHeight, rect.bottom) - Math.max(0, rect.top);
          const percentVisible = (visibleHeight / rect.height) * 100;
          // Ограничиваем максимальную высоту до 90%
          setDividerHeight(Math.min(percentVisible * 1.2, 90));
        } else {
          setDividerHeight(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Вызываем handleScroll сразу после монтирования
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section с собственным фоном */}
      <div className="relative bg-gradient-to-br from-[#166534] via-[#166534] to-transparent overflow-x-hidden min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_var(--tw-gradient-stops))] from-transparent via-white/0 to-white opacity-50"></div>
        <div className="absolute bottom-0 w-full h-96 bg-gradient-to-b from-transparent to-white"></div>
        {/* Декоративные полосы справа (белые) */}
        <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {[...Array(6)].map((_, i) => (
              <div
                key={`white-line-${i}`}
                className="absolute h-[2px] bg-[#fafafa] transform rotate-12"
                style={{
                  width: '140%',
                  top: `${15 + i * 20}%`,
                  right: `-20%`,
                  opacity: 0.7,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Декоративные полосы слева (зеленые) */}
        <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div
                key={`green-line-${i}`}
                className="absolute h-[2px] bg-[#CCFF00] transform -rotate-12"
                style={{
                  width: '140%',
                  top: `${15 + i * 20}%`,
                  left: `-20%`,
                  opacity: 0.5,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Navigation */}
          <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
            isScrolled 
              ? 'bg-[#166534]/60 backdrop-blur-md shadow-lg' 
              : 'bg-transparent'
          }`}>
            <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-[1440px]">
              <div className="flex items-center">
                <span className="text-2xl md:text-3xl font-extrabold text-white">
                  СНОС<span className="text-[#CCFF00]" style={{ fontSize: "1.5em" }}>34</span>
                </span>
              </div>

              <div className="hidden lg:flex items-center space-x-8 font-semibold">
                <a href="#" className="text-white hover:text-[#CCFF00] transition uppercase">Главная</a>
                <a href="#" className="text-white hover:text-[#CCFF00] transition uppercase">Виды работ</a>
                <a href="#" className="text-white hover:text-[#CCFF00] transition uppercase">Схема работы</a>
                <a href="#" className="text-white hover:text-[#CCFF00] transition uppercase">Связаться с нами</a>
              </div>

              <div className="flex items-center">
                <a 
                  href="tel:+79178888888" 
                  className={`transition-all duration-300 font-bold px-4 py-2 rounded block ${
                    isScrolled 
                      ? 'text-[#333333] bg-white/50 hover:text-white' 
                      : 'text-white hover:text-[#CCFF00]'
                  }`}
                >
                  +7 (917) 888-88-88
                </a>
              </div>
            </div>
          </nav>

          {/* Отступ для контента под фиксированным меню */}
          <div className="h-16 md:h-20"></div>

          {/* Hero Section Content */}
          <div className="container mx-auto px-4 md:px-6 flex-1 flex items-center max-w-[1440px]">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full mt-16 sm:mt-24 md:mt-0">
              <div>
                <h1 className="font-black text-white leading-tight space-y-4 md:space-y-6">
                  <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    <span className="relative text-4xl lg:text-5xl xl:text-6xl">
                      Демонтаж
                      <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-2 bg-[#CCFF00] opacity-50 rounded"></span>
                    </span>
                    <span className="text-3xl lg:text-4xl xl:text-5xl font-medium"> зданий</span>
                  </div>

                  <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                    <span className="relative text-4xl lg:text-5xl xl:text-6xl">
                      Вывоз
                      <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-2 bg-[#CCFF00] opacity-50 rounded"></span>
                    </span>
                    <span className="text-3xl lg:text-4xl xl:text-5xl font-medium"> строительного мусора</span>
                  </div>

                  <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                    <span className="relative text-4xl lg:text-5xl xl:text-6xl">
                      Монтаж
                      <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-2 bg-[#CCFF00] opacity-50 rounded"></span>
                    </span>
                    <span className="text-3xl lg:text-4xl xl:text-5xl font-medium"> заборов</span>
                  </div>
                </h1>

                <div className="mt-12 md:mt-24 space-y-4 flex flex-col items-start" >
                  <div className="inline-flex items-center bg-white rounded-full px-4 md:px-6 py-2 md:py-3 shadow-lg animate-fadeInUp opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                    <MapPinned className="h-4 w-4 md:h-5 md:w-5 text-[#166534] min-w-[16px] md:min-w-[20px] mr-2" />
                    <span className="text-gray-800 font-medium text-sm md:text-base">Волгоград</span>
                  </div>

                  <div className="inline-flex items-center bg-white rounded-full px-4 md:px-6 py-2 md:py-3 shadow-lg animate-fadeInUp opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                    <MapPinned className="h-4 w-4 md:h-5 md:w-5 text-[#166534] min-w-[16px] md:min-w-[20px] mr-2" />
                    <span className="text-gray-800 font-medium text-sm md:text-base">Городищенский район</span>
                  </div>

                  <div 
                    className="inline-flex items-center justify-between bg-white rounded-full px-4 md:px-6 py-2 md:py-3 shadow-lg hover:bg-gray-50 transition-colors group cursor-pointer animate-fadeInUp opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
                    onClick={() => window.location.href = 'tel:+79178888888'}
                  >
                    <div className="flex items-center">
                      <PhoneIncoming className="h-4 w-4 md:h-5 md:w-5 text-[#166534] min-w-[16px] md:min-w-[20px] mr-2" />
                      <span className="text-gray-800 font-medium text-sm md:text-base">+7 (917) 888-88-88</span>
                    </div>
                    <Copy className="h-4 w-4 md:h-5 md:w-5 text-[#166534] hover:text-[#0f4023] transition-colors ml-4" />
                  </div>
                </div>
              </div>

              <div className="relative mt-8 md:mt-0">
                {/* Верхнее изображение дома */}
                <div
                  className="absolute -top-20 right-4 w-64 transition-transform duration-300 ease-out hidden xl:block"
                  style={{
                    transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`,
                  }}
                >
                  <img
                    src="Public/Home.png"
                    alt="Yellow house with balcony"
                    className="w-full transition-transform"
                  />
                </div>

                {/* Главное изображение КАМАЗа */}
                <div className="relative w-full overflow-hidden">
                  <img
                    src="Public/kamaz2.png"
                    alt="Orange KAMAZ dump truck"
                    className="rounded-2xl mx-auto w-[300px] sm:w-[500px] md:w-[800px] md:max-w-full object-contain"
                  />
                </div>

                {/* Нижнее изображение забора */}
                <div
                  className="absolute bottom-4 left-4 w-64 transition-transform duration-300 ease-out hidden xl:block"
                  style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                  }}
                >
                  <img
                    src="Public/Zabor.png"
                    alt="Decorative fence with plants"
                    className="w-full transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services-section" className="bg-gradient-to-b from-[#FFFFFF] via-[#F7FBFE] to-[#F0F8FE] py-12 md:py-24 relative overflow-hidden">
        {/* Декоративные иконки в фоне - скрыты на мобильных */}
        <div className="absolute inset-0 opacity-10 blur-[2px] hidden md:block">
          {/* Левая сторона */}
          <Hammer className="absolute w-20 h-20 lg:w-32 lg:h-32 text-gray-400 left-[5%] top-[10%] transform -rotate-12" strokeWidth={1} />
          <Truck className="absolute w-16 h-16 lg:w-28 lg:h-28 text-gray-400 left-[15%] top-[40%] transform rotate-6" strokeWidth={1} />
          <Trash className="absolute w-14 h-14 lg:w-24 lg:h-24 text-gray-400 left-[8%] top-[70%] transform -rotate-12" strokeWidth={1} />
          
          {/* Правая сторона */}
          <Move3D className="absolute w-20 h-20 lg:w-32 lg:h-32 text-gray-400 right-[10%] top-[15%] transform rotate-12" strokeWidth={1} />
          <Fence className="absolute w-16 h-16 lg:w-28 lg:h-28 text-gray-400 right-[5%] top-[45%] transform -rotate-6" strokeWidth={1} />
          <MapPinned className="absolute w-14 h-14 lg:w-24 lg:h-24 text-gray-400 right-[12%] top-[75%] transform rotate-12" strokeWidth={1} />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-[1440px] relative">
          <h2 className="text-3xl md:text-[2.9rem] font-bold text-black mb-8 md:mb-16 text-center">
            {/* Мобильная версия */}
            <div className="flex flex-col items-center md:hidden">
              <span className="relative inline-block">
                ВЫПОЛНЯЕМЫЕ
                <span className="absolute bottom-1 left-0 w-full h-2 bg-[#166534] opacity-50 rounded"></span>
              </span>
              <span className="relative inline-block mt-1">
                РАБОТЫ
                <span className="absolute bottom-1 left-0 w-full h-2 bg-[#166534] opacity-50 rounded"></span>
              </span>
            </div>

            {/* Десктопная версия */}
            <span className="relative hidden md:inline-block">
              ВЫПОЛНЯЕМЫЕ РАБОТЫ
              <span className="absolute -bottom-1 left-0 w-full h-2 bg-[#166534] opacity-50 rounded"></span>
            </span>
          </h2>

          {/* Адаптивный контейнер для карточек */}
          <div className="flex flex-col lg:flex-row max-w-7xl mx-auto relative">
            {/* Вертикальная линия для мобильной и планшетной версии */}
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-[#166534] opacity-20 lg:hidden"></div>

            {/* Левая колонка */}
            <div className="w-full lg:w-1/2 space-y-8 lg:space-y-[300px] pl-16 lg:pl-0 lg:pr-8 relative">
              {/* Карточки услуг */}
              <div className="bg-white rounded-2xl p-6 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center justify-center w-full">
                  <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4">Снос зданий</h3>
                  <Hammer className="h-8 w-8 md:h-10 md:w-10 text-[#166534] mb-4 md:mb-6" />
                  <p className="text-gray-600 text-center">
                    Профессиональный демонтаж зданий и сооружений любой сложности.
                    Гарантируем безопасность и оперативность выполнения работ.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center justify-center w-full">
                  <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 text-gray-800 mb-4">Вывоз мусора</h3>
                  <Trash className="h-8 w-8 md:h-10 md:w-10 text-[#166534] mb-4 md:mb-6" />
                  <p className="text-gray-600 text-center">
                    Оперативный вывоз строительного мусора и отходов с объекта.
                    Предоставляем собственный транспорт и бригаду грузчиков.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center justify-center w-full">
                  <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4">Планировка участка</h3>
                  <Move3D className="h-8 w-8 md:h-10 md:w-10 text-[#166534] mb-4 md:mb-6" />
                  <p className="text-gray-600 text-center">
                    Комплексная подготовка и выравнивание территории под застройку.
                    Работаем с участками любой сложности и размера.
                  </p>
                </div>
              </div>
            </div>

            {/* Разделительная линия для десктопа */}
            <div className="hidden lg:block w-1 bg-[#166534] opacity-50 rounded mx-8"></div>

            {/* Правая колонка */}
            <div className="w-full lg:w-1/2 space-y-8 lg:space-y-[300px] pl-16 lg:pl-8 mt-8 lg:mt-[300px] relative">
              {/* Карточки услуг */}
              <div className="bg-white rounded-2xl p-6 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center justify-center w-full space-y-6">
                  <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800">
                    Монтаж / Демонтаж забора
                  </h3>
                  <div className="flex justify-center">
                    <Fence className="w-12 h-12 text-[#166534]" />
                  </div>
                  <p className="text-gray-600 text-center">
                    Установка и демонтаж заборов из различных материалов под ключ. Большой опыт работы с разными типами ограждений.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center justify-center w-full">
                  <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4">Завоз материалов</h3>
                  <Truck className="h-8 w-8 md:h-10 md:w-10 text-[#166534] mb-4 md:mb-6" />
                  <p className="text-gray-600 text-center">
                    Доставка строительных материалов точно в срок на ваш объект.
                    Работаем с любыми объемами, предоставляем все документы.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Схема работы */}
      <div className="container mx-auto px-4 md:px-6 max-w-[1440px] relative mt-24 md:mt-32 overflow-x-hidden">
        <h2 className="text-3xl md:text-[2.9rem] font-bold text-black mb-16 md:mb-24 text-center">
          <span className="relative inline-block">
            СХЕМА РАБОТЫ
            <span className="absolute -bottom-1 left-0 w-full h-2 bg-[#166534] opacity-50 rounded"></span>
          </span>
        </h2>

        <div className="relative w-full h-[1000px] flex justify-center overflow-x-hidden">
          <div className="relative w-[1000px]">
            {/* Линии SVG */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              {/* Линия от 1 к 2 */}
              <path d="M110,110 C300,110 500,150 790,160" className="stroke-[#166534] stroke-3 opacity-20 fill-none" />
              
              {/* Линия от 2 к 3 */}
              <path d="M790,160 C400,190 250,350 40,370" className="stroke-[#166534] stroke-3 opacity-20 fill-none" />
              
              {/* Линия от 3 к 4 */}
              <path d="M40,370 C300,400 500,420 790,430" className="stroke-[#166534] stroke-3 opacity-20 fill-none" />
              
              {/* Линия от 4 к 5 */}
              <path d="M790,430 C700,530 650,650 500,690" className="stroke-[#166534] stroke-3 opacity-20 fill-none" />
              
              {/* Линия от 5 к 6 */}
              <path d="M500,700 L500,890" className="stroke-[#166534] stroke-3 opacity-20 fill-none" />
            </svg>

            {/* Круги с номерами и текстом */}
            <div className="absolute left-[70px] top-[100px]">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">1</div>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xl md:text-2xl font-bold text-gray-800">Ваш звонок</span>
              </div>
            </div>

            <div className="absolute left-[770px] top-[150px]">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">2</div>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xl md:text-2xl font-bold text-gray-800">Выезд специалиста</span>
              </div>
            </div>

            <div className="absolute left-[20px] top-[360px]">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">3</div>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xl md:text-2xl font-bold text-gray-800">Определение стоимости и аванса</span>
              </div>
            </div>

            <div className="absolute left-[770px] top-[420px]">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">4</div>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xl md:text-2xl font-bold text-gray-800">Планирование производственных работ</span>
              </div>
            </div>

            <div className="absolute left-[490px] top-[680px]">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">5</div>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xl md:text-2xl font-bold text-gray-800">Демонтаж и вывоз мусора</span>
              </div>
            </div>

            <div className="absolute left-[490px] top-[880px]">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">6</div>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xl md:text-2xl font-bold text-gray-800">Полная оплата работы</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
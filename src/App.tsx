import { useState, useEffect } from 'react';
import { PhoneIncoming, Copy, MapPinned, Hammer, Fence, Trash, Truck, Move3D, Car, Wallet, HandCoins, FileAxis3D, Mail } from 'lucide-react';
import { useBreakpoint } from './hooks/useBreakpoint';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [paths, setPaths] = useState<string[]>([]);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

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
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardId = Number(entry.target.getAttribute('data-card-id'));
          setVisibleCards(prev => new Set(prev).add(cardId));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2,
      rootMargin: '50px'
    });

    // Находим все карточки и добавляем их в observer
    document.querySelectorAll('[data-card-id]').forEach(card => {
      observer.observe(card);
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Вызываем handleScroll сразу после монтирования
    handleScroll();

    const updatePaths = () => {
      const circles = Array.from(document.querySelectorAll('.step-circle'));
      if (circles.length < 6) return;

      const newPaths = [];
      const c1 = { x: 70, y: 100 };
      const c2 = { x: 770, y: 200 };
      const c3 = { x: 20, y: 450 };
      const c4 = { x: 770, y: 600 };
      const c5 = { x: 490, y: 800 };
      const c6 = { x: 490, y: 1000 };

      newPaths.push(`M${c1.x + 40},${c1.y + 40} C${c1.x + 50},${c1.y + 200}   ${c2.x - 50},${c2.y - 100}  ${c2.x + 40},${c2.y + 40}`);
      newPaths.push(`M${c2.x + 40},${c2.y + 40} C${c2.x + 600},${c2.y + 350}  ${c3.x - 300},${c3.y - 150} ${c3.x + 40},${c3.y + 40}`);
      newPaths.push(`M${c3.x + 40},${c3.y + 40} C${c3.x + 300},${c3.y + 50}   ${c4.x - 200},${c4.y}       ${c4.x + 40},${c4.y + 40}`);
      newPaths.push(`M${c4.x + 40},${c4.y + 40} C${c4.x + 320},${c4.y + 100}  ${c5.x + 300},${c5.y + 130} ${c5.x + 40},${c5.y + 40}`);
      newPaths.push(`M${c5.x + 40},${c5.y + 40} C${c5.x - 250},${c5.y + 20}    ${c5.x - 300},${c5.y + 200} ${c6.x + 40},${c6.y + 40}`);

      setPaths(newPaths);
    };

    updatePaths();
    window.addEventListener('resize', updatePaths);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      window.removeEventListener('resize', updatePaths);
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
          <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled
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
                  className={`transition-all duration-300 font-bold px-4 py-2 rounded block ${isScrolled
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
              <div
                data-card-id="1"
                className={`transform transition-all duration-1000 ${visibleCards.has(1)
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-20'
                  }`}
              >
                <div className="bg-white rounded-2xl p-6 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center justify-center w-full">
                    <h3 className="text-xl md:text-4xl font-bold text-center text-gray-800 mb-4">Снос зданий</h3>
                    <Hammer className="h-8 w-8 md:h-10 md:w-10 text-[#166534] mb-4 md:mb-6" />
                    <p className="text-gray-600 md:text-2xl text-center">
                      Профессиональный демонтаж зданий и сооружений любой сложности.
                      
                    </p>
                  </div>
                </div>
              </div>

              <div
                data-card-id="2"
                className={`transform transition-all duration-1000 delay-200 ${visibleCards.has(2)
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-20'
                  }`}
              >
                <div className="bg-white rounded-2xl p-6 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center justify-center w-full">
                    <h3 className="text-xl md:text-4xl font-bold text-center text-gray-800 mb-4">Вывоз мусора</h3>
                    <Trash className="h-8 w-8 md:h-10 md:w-10 text-[#166534] mb-4 md:mb-6" />
                    <p className="text-gray-600 md:text-2xl text-center">
                      Оперативный вывоз строительного мусора и отходов с объекта.
                      
                    </p>
                  </div>
                </div>
              </div>

              <div
                data-card-id="3"
                className={`transform transition-all duration-1000 delay-400 ${visibleCards.has(3)
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-20'
                  }`}
              >
                <div className="bg-white rounded-2xl p-6 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center justify-center w-full">
                    <h3 className="text-xl md:text-4xl font-bold text-center text-gray-800 mb-4">Планировка участка</h3>
                    <Move3D className="h-8 w-8 md:h-10 md:w-10 text-[#166534] mb-4 md:mb-6" />
                    <p className="text-gray-600 md:text-2xl text-center">
                      Комплексная подготовка и выравнивание территории под застройку.
                     
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Разделительная линия для десктопа */}
            <div className="hidden lg:block w-1.5 bg-[#166534] opacity-50 rounded mx-8"></div>

            {/* Правая колонка */}
            <div className="w-full lg:w-1/2 space-y-8 lg:space-y-[300px] pl-16 lg:pl-8 mt-8 lg:mt-[270px] relative">
              <div
                data-card-id="4"
                className={`transform transition-all duration-1000 delay-600 ${visibleCards.has(4)
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
                  }`}
              >
                <div className="bg-white rounded-2xl p-6 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center justify-center w-full space-y-6">
                    <h3 className="text-xl md:text-4xl font-bold text-center text-gray-800">
                      Монтаж / Демонтаж забора
                    </h3>
                    <div className="flex justify-center">
                      <Fence className="w-12 h-12 text-[#166534]" />
                    </div>
                    <p className="text-gray-600 md:text-2xl text-center">
                      Установка и демонтаж заборов из различных материалов под ключ.
                    </p>
                  </div>
                </div>
              </div>

              <div
                data-card-id="5"
                className={`transform transition-all duration-1000 delay-800 ${visibleCards.has(5)
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
                  }`}
              >
                <div className="bg-white rounded-2xl p-6 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center justify-center w-full">
                    <h3 className="text-xl md:text-4xl font-bold text-center text-gray-800 mb-4">Завоз материалов</h3>
                    <Truck className="h-8 w-8 md:h-10 md:w-10 text-[#166534] mb-4 md:mb-6" />
                    <p className="text-gray-600 md:text-2xl text-center">
                      Доставка строительных материалов точно в срок на ваш объект.
                    
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Схема работы */}
      <div id="work-struture" className="bg-gradient-to-b from-[#F0F8FE] via-[#F7FBFE] to-[#e3eee5] py-12 md:py-24 relative overflow-hidden">
        {/* Декоративные иконки в фоне - скрыты на мобильных */}
        <div className="absolute inset-0 opacity-10 blur-[2px] hidden md:block">
          {/* Левая сторона */}
          <PhoneIncoming className="absolute w-20 h-20 lg:w-32 lg:h-32 text-gray-400 left-[5%] top-[10%] transform -rotate-12" strokeWidth={1} />
          <Car className="absolute w-16 h-16 lg:w-28 lg:h-28 text-gray-400 left-[15%] top-[40%] transform rotate-6" strokeWidth={1} />
          <Wallet className="absolute w-14 h-14 lg:w-24 lg:h-24 text-gray-400 left-[8%] top-[70%] transform -rotate-12" strokeWidth={1} />

          {/* Правая сторона */}
          <FileAxis3D className="absolute w-20 h-20 lg:w-32 lg:h-32 text-gray-400 right-[10%] top-[15%] transform rotate-12" strokeWidth={1} />
          <Truck className="absolute w-16 h-16 lg:w-28 lg:h-28 text-gray-400 right-[5%] top-[45%] transform -rotate-6" strokeWidth={1} />
          <HandCoins className="absolute w-14 h-14 lg:w-24 lg:h-24 text-gray-400 right-[12%] top-[75%] transform rotate-12" strokeWidth={1} />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-[1440px] relative mt-8 md:mt-12 overflow-x-hidden">
          <h2 className="text-3xl md:text-[2.9rem] font-bold text-black mb-8 md:mb-12 text-center">
            <span className="relative inline-block">
              СХЕМА РАБОТЫ
              <span className="absolute -bottom-1 left-0 w-full h-2 bg-[#166534] opacity-50 rounded"></span>
            </span>
          </h2>

          {/* Мобильная версия */}
          <div className="flex flex-col items-center space-y-16 md:hidden">
            {/* Вертикальная линия */}
            <div className="absolute left-1/2 top-[200px] bottom-32 w-1 bg-[#166534] opacity-50 rounded transform -translate-x-1/2"></div>
            
            {[
              { num: 1, text: "Ваш звонок", icon: PhoneIncoming },
              { num: 2, text: "Выезд специалиста", icon: Car },
              { num: 3, text: "Определение стоимости и аванса", icon: Wallet },
              { num: 4, text: "Планирование работ", icon: FileAxis3D },
              { num: 5, text: "Демонтаж и вывоз мусора", icon: Truck },
              { num: 6, text: "Оплата работы", icon: HandCoins }
            ].map((item) => (
              <div key={item.num} className="relative">
                <span className="absolute -top-24 left-1/2 -translate-x-1/2 text-xl font-bold text-gray-800 text-center max-w-[200px] leading-tight">
                  {item.text}
                </span>
                <div className="step-circle w-20 h-20 rounded-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-[#e8f5ee] to-[#166534]/20 shadow-lg">
                  <item.icon className="w-8 h-8 text-[#166534]" />
                </div>
              </div>
            ))}
          </div>

          {/* Десктопная версия */}
          <div className="relative w-full h-[1200px] justify-center overflow-x-hidden work-structure-container hidden md:flex">
            <div className="relative w-[1000px]">
              {/* Линии SVG */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                {paths.map((path, index) => (
                  <path 
                    key={index} 
                    d={path} 
                    className="stroke-[#166534] opacity-50 fill-none"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                ))}
              </svg>

              {/* Круги с номерами и текстом */}
              <div className="absolute left-[70px] top-[100px]">
                <div className="relative">
                  <span className="absolute -top-20 left-1/2 -translate-x-1/2 text-xl md:text-3xl font-bold text-gray-800 text-center max-w-[200px] leading-tight">
                    Ваш звонок
                  </span>
                  <div className="step-circle w-20 h-20 rounded-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-[#e8f5ee] to-[#166534]/20 shadow-lg">
                    <PhoneIncoming className="w-8 h-8 text-[#166534]" />
                  </div>
                </div>
              </div>

              <div className="absolute left-[770px] top-[200px]">
                <div className="relative">
                  <span className="absolute -top-20 left-1/2 -translate-x-1/2 text-xl md:text-3xl font-bold text-gray-800 text-center max-w-[200px] leading-tight">
                    Выезд специалиста
                  </span>
                  <div className="step-circle w-20 h-20 rounded-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-[#e8f5ee] to-[#166534]/20 shadow-lg">
                    <Car className="w-8 h-8 text-[#166534]" />
                  </div>
                </div>
              </div>

              <div className="absolute left-[20px] top-[450px]">
                <div className="relative">
                  <span className="absolute -bottom-28 left-1/2 -translate-x-1/2 text-xl md:text-3xl font-bold text-gray-800 text-center max-w-[400px] leading-tight">
                    Определение стоимости и аванса
                  </span>
                  <div className="step-circle w-20 h-20 rounded-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-[#e8f5ee] to-[#166534]/20 shadow-lg">
                    <Wallet className="w-8 h-8 text-[#166534]" />
                  </div>
                </div>
              </div>

              <div className="absolute left-[770px] top-[600px]">
                <div className="relative">
                  <span className="absolute -top-20 left-1/2 -translate-x-1/2 text-xl md:text-3xl font-bold text-gray-800 text-center max-w-[300px] leading-tight">
                    Планирование работ
                  </span>
                  <div className="step-circle w-20 h-20 rounded-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-[#e8f5ee] to-[#166534]/20 shadow-lg">
                    <FileAxis3D className="w-8 h-8 text-[#166534]" />
                  </div>
                </div>
              </div>

              <div className="absolute left-[490px] top-[800px]">
                <div className="relative">
                  <span className="absolute -top-28 left-1/2 -translate-x-1/2 text-xl md:text-3xl font-bold text-gray-800 text-center max-w-[200px] leading-tight">
                    Демонтаж и вывоз мусора
                  </span>
                  <div className="step-circle w-20 h-20 rounded-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-[#e8f5ee] to-[#166534]/20 shadow-lg">
                    <Truck className="w-8 h-8 text-[#166534]" />
                  </div>
                </div>
              </div>

              <div className="absolute left-[490px] top-[1000px]">
                <div className="relative">
                  <span className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-xl md:text-3xl font-bold text-gray-800 text-center max-w-[200px] leading-tight">
                    Оплата работ
                  </span>
                  <div className="step-circle w-20 h-20 rounded-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-[#e8f5ee] to-[#166534]/20 shadow-lg">
                    <HandCoins className="w-8 h-8 text-[#166534]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Обратная связь */}
      <div id="feedback" className="bg-gradient-to-b from-[#e3eee5] via-[#F7FBFE] to-[#e3eee5] py-12 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-[1440px] relative">
          <h2 className="text-3xl md:text-[2.9rem] font-bold text-black mb-8 md:mb-16 text-center">
            <span className="relative inline-block">
              СВЯЗАТЬСЯ С МЕНЕДЖЕРОМ
              <span className="absolute -bottom-1 left-0 w-full h-2 bg-[#166534] opacity-50 rounded"></span>
            </span>
          </h2>

          <div className="max-w-3xl mx-auto">
            <form className="flex flex-col md:flex-row gap-4 items-end">
              {/* Имя */}
              <div className="flex-1">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#166534] focus:border-transparent outline-none transition"
                  placeholder="Ваше имя"
                />
              </div>

              {/* Телефон */}
              <div className="flex-1">
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#166534] focus:border-transparent outline-none transition"
                  placeholder="Телефон"
                />
              </div>

              {/* Кнопка отправки */}
              <button
                type="submit"
                className="w-full md:w-auto bg-[#CCFF00] hover:bg-[#FFD700]/90 text-black font-bold py-3 px-8 rounded transition-colors duration-300"
              >
                Заказать звонок
              </button>
            </form>

            {/* Согласие на обработку данных */}
            <div className="flex items-center gap-2 mt-4">
              <input 
                type="checkbox" 
                id="privacy" 
                className="w-4 h-4 rounded border-gray-300 text-[#166534] focus:ring-[#166534]"
                defaultChecked 
              />
              <label htmlFor="privacy" className="text-sm text-gray-600">
                Я принимаю условия{" "}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsPrivacyModalOpen(true);
                  }} 
                  className="text-[#166534] hover:underline"
                >
                  пользовательского соглашения на обработку персональных данных
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Интервал */}
      <div className="h-16 md:h-24 bg-[#e3eee5]"></div>

      {/* Footer */}
      <footer className="bg-[#166534] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-[1440px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Логотип и описание */}
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-extrabold">
                  СНОС<span className="text-[#CCFF00]" style={{ fontSize: "1.5em" }}>34</span>
                </span>
              </div>
              <p className="text-gray-200 text-sm md:text-base">
                Профессиональный демонтаж зданий и сооружений в Волгограде и Городищенском районе
              </p>
            </div>

            {/* Навигация */}
            <div>
              
            </div>

            {/* Услуги */}
            <div>

            </div>

            {/* Контакты */}
            <div>
              <h3 className="text-lg font-bold mb-4">Контакты</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <PhoneIncoming className="w-5 h-5 text-[#CCFF00]" />
                  <a href="tel:+79178888888" className="text-gray-200 hover:text-[#CCFF00] transition">+7 (917) 888-88-88</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-[#CCFF00]" />
                  <a href="mailto:info@info.com" className="text-gray-200 hover:text-[#CCFF00] transition">info@info.com</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Нижняя часть футера */}
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>© {new Date().getFullYear()} СНОС34. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Модальное окно с пользовательским соглашением */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button 
              onClick={() => setIsPrivacyModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Пользовательское соглашение</h3>
            <div className="prose prose-sm">
              <p className="mb-4">
                Предоставляя свои персональные данные Пользователь даёт согласие на обработку, хранение и использование своих персональных данных на основании ФЗ № 152-ФЗ «О персональных данных» от 27.07.2006 г. в следующих целях:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Осуществление клиентской поддержки</li>
                <li>Получения Пользователем информации о маркетинговых событиях</li>
                <li>Проведения аудита и прочих внутренних исследований с целью повышения качества предоставляемых услуг.</li>
              </ul>
              <p className="mb-4">
                Под персональными данными подразумевается любая информация личного характера, позволяющая установить личность Пользователя/Покупателя такая как:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Фамилия, Имя, Отчество</li>
                <li>Дата рождения</li>
                <li>Контактный телефон</li>
                <li>Адрес электронной почты</li>
                <li>Почтовый адрес</li>
              </ul>
              <p className="mb-4">
                Персональные данные Пользователей хранятся исключительно на электронных носителях и обрабатываются с использованием автоматизированных систем, за исключением случаев, когда неавтоматизированная обработка персональных данных необходима в связи с исполнением требований законодательства.
              </p>
              <p className="mb-4">
                Компания обязуется не передавать полученные персональные данные третьим лицам, за исключением следующих случаев:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>По запросам уполномоченных органов государственной власти РФ только по основаниям и в порядке, установленным законодательством РФ</li>
                <li>Стратегическим партнерам, которые работают с Компанией для предоставления продуктов и услуг, или тем из них, которые помогают Компании реализовывать продукты и услуги потребителям. Мы предоставляем третьим лицам минимальный объем персональных данных, необходимый только для оказания требуемой услуги или проведения необходимой транзакции.</li>
              </ul>
              <p>
                Компания оставляет за собой право вносить изменения в одностороннем порядке в настоящие правила, при условии, что изменения не противоречат действующему законодательству РФ. Изменения условий настоящих правил вступают в силу после их публикации на Сайте.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
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
        <div className="relative z-10 h-screen flex flex-col">
          {/* Navigation */}
          <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-[#166534]/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
            }`}>
            <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-[1440px]">
              <div className="flex items-center">
                <span className="text-white text-3xl font-extrabold">
                  СНОС<span className="text-[#CCFF00]" style={{ fontSize: "1.5em" }}>34</span>
                </span>
              </div>

              <div className="hidden md:flex items-center space-x-8 font-medium">
                <a href="#" className="text-white hover:text-[#CCFF00] transition font-bold">Главная</a>
                <a href="#" className="text-white hover:text-[#CCFF00] transition font-bold">Виды работ</a>
                <a href="#" className="text-white hover:text-[#CCFF00] transition font-bold">Схема работы</a>
                <a href="#" className="text-white hover:text-[#CCFF00] transition font-bold">Связаться с нами</a>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`transition-all duration-300 font-bold px-4 py-2 rounded ${isScrolled ? 'text-[#166534] bg-white/50 hover:text-black' : 'text-white hover:text-[#CCFF00]'
                  }`}>+7 (917) 888-88-88</span>
              </div>
            </div>
          </nav>

          {/* Отступ для контента под фиксированным меню */}
          <div className="h-20"></div>

          {/* Hero Section Content */}
          <div className="container mx-auto px-6 flex-1 flex items-center max-w-[1440px]">
            <div className="grid md:grid-cols-2 gap-12 items-center w-full">
              <div>
                <h1 className="font-black text-white leading-tight space-y-6">
                  <div>
                    <span className="relative text-6xl">
                      Демонтаж
                      <span className="absolute bottom-2 left-0 w-full h-2 bg-[#CCFF00] opacity-50 rounded"></span>
                    </span>
                    <span className="text-5xl font-medium"> зданий</span>
                  </div>

                  <div>
                    <span className="relative text-6xl">
                      Вывоз
                      <span className="absolute bottom-2 left-0 w-full h-2 bg-[#CCFF00] opacity-50 rounded"></span>
                    </span>
                    <span className="text-5xl font-medium"> строительного мусора</span>
                  </div>

                  <div>
                    <span className="relative text-6xl">
                      Монтаж
                      <span className="absolute bottom-2 left-0 w-full h-2 bg-[#CCFF00] opacity-50 rounded"></span>
                    </span>
                    <span className="text-5xl font-medium"> заборов</span>
                  </div>
                </h1>

                <div className="mt-24 space-y-4">
                  <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
                    <MapPinned className="h-5 w-5 text-[#166534] mr-2" />
                    <span className="text-gray-800 font-medium">Волгоград</span>
                  </div>

                  <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg ml-4">
                    <MapPinned className="h-5 w-5 text-[#166534] mr-2" />
                    <span className="text-gray-800 font-medium">Городищенский район</span>
                  </div>

                  <div
                    className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg mt-6 w-fit cursor-pointer hover:bg-gray-50 transition-colors group"
                    onClick={() => {
                      navigator.clipboard.writeText('+7 (917) 888-88-88');
                    }}
                  >
                    <PhoneIncoming className="h-5 w-5 text-[#166534] mr-2" />
                    <span className="text-gray-800 font-medium">+7 (917) 888-88-88</span>
                    <Copy
                      className="h-5 w-5 text-[#166534] ml-4 cursor-pointer hover:text-[#0f4023] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText('+7 (917) 888-88-88');
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Верхнее изображение дома */}
                <div
                  className="absolute -top-20 right-4 w-64 transition-transform duration-300 ease-out"
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
                <img
                  src="Public/kamaz2.png"
                  alt="Orange KAMAZ dump truck"
                  className="rounded-2xl mx-auto w-[800px] max-w-[120%]"
                />

                {/* Нижнее изображение забора */}
                <div
                  className="absolute bottom-4 left-4 w-64 transition-transform duration-300 ease-out"
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
      <div id="services-section" className="bg-white py-24">
        
        <div className="container mx-auto px-6 max-w-[1440px]">
          <h2 className="text-[2.9rem] font-bold text-black mb-16 text-center">
            <span className="relative">
              ВЫПОЛНЯЕМЫЕ РАБОТЫ
              <span className="absolute bottom-1 left-0 w-full h-2 bg-[#166534] opacity-50 rounded"></span>
            </span>
          </h2>

          <div className="flex max-w-7xl mx-auto relative">
            {/* Левая колонка */}
            <div className="w-1/2 space-y-[300px] pr-8">
              <div className="bg-white rounded-2xl p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center justify-center w-full">
                  <h3 className="text-2xl font-medium text-gray-800 mb-4">Снос зданий</h3>
                  <Hammer className="h-10 w-10 text-[#166534] mb-6" />
                  <p className="text-gray-600 text-center text-base leading-relaxed">
                    Профессиональный демонтаж зданий и сооружений любой сложности.
                    Гарантируем безопасность и оперативность выполнения работ.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center justify-center w-full">
                  <h3 className="text-2xl font-medium text-gray-800 mb-4">Вывоз мусора</h3>
                  <Trash className="h-10 w-10 text-[#166534] mb-6" />
                  <p className="text-gray-600 text-center text-base leading-relaxed">
                    Оперативный вывоз строительного мусора и отходов с объекта.
                    Предоставляем собственный транспорт и бригаду грузчиков.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center justify-center w-full">
                  <h3 className="text-2xl font-medium text-gray-800 mb-4">Планировка участка</h3>
                  <Move3D className="h-10 w-10 text-[#166534] mb-6" />
                  <p className="text-gray-600 text-center text-base leading-relaxed">
                    Комплексная подготовка и выравнивание территории под застройку.
                    Работаем с участками любой сложности и размера.
                  </p>
                </div>
              </div>
            </div>

            {/* Разделительная линия */}
            <div className="w-1 bg-gray-200 mx-8"></div>

            {/* Правая колонка */}
            <div className="w-1/2 space-y-[300px] pl-8 pt-[300px]">
              <div className="bg-white rounded-2xl p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center justify-center w-full">
                  <h3 className="text-2xl font-medium text-gray-800 mb-4">Монтаж / Демонтаж забора</h3>
                  <Fence className="h-10 w-10 text-[#166534] mb-6" />
                  <p className="text-gray-600 text-center text-base leading-relaxed">
                    Установка и демонтаж заборов из различных материалов под ключ.
                    Большой опыт работы с разными типами ограждений.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center justify-center w-full">
                  <h3 className="text-2xl font-medium text-gray-800 mb-4">Завоз материалов</h3>
                  <Truck className="h-10 w-10 text-[#166534] mb-6" />
                  <p className="text-gray-600 text-center text-base leading-relaxed">
                    Доставка строительных материалов точно в срок на ваш объект.
                    Работаем с любыми объемами, предоставляем все документы.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
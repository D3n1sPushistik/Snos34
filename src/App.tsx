import React, { useState, useEffect } from 'react';
import {ChevronDown, CheckCircle2, PhoneIncoming, Home } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Основной S-образный градиент */}
      <div className="absolute inset-0 bg-[linear-gradient(295deg,_#fafafa_20%,_#166534_50%)]"></div>
      
      {/* Декоративные полосы справа (белые) */}
      <div className="absolute right-0 top-0 w-1/2 h-full">
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
      <div className="absolute left-0 top-0 w-1/2 h-full">
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={`green-line-${i}`}
              className="absolute h-[2px] bg-[#CCFF00] transform -rotate-12"
              style={{
                width: '140%',
                top: `${45 + i * 15}%`,
                left: `-20%`,
                opacity: 0.5,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* S-образная разделительная линия */}
      <div 
        className="absolute w-[3px] h-[200%] bg-red-500 opacity-30"
        style={{
          left: '50%',
          top: '-50%',
          transform: 'rotate(-15deg)',
          clipPath: 'path("M 0 0 Q -50 50 0 100 Q 50 150 0 200")',
        }}
      ></div>

      {/* Существующий контент */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-white text-3xl font-extrabold">
              Снос1<span className="text-[#CCFF00]">34</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <a href="#" className="text-white hover:text-[#CCFF00] transition"><b>Домой</b></a>
            <a href="#" className="text-white hover:text-[#CCFF00] transition">About</a>
            <a href="#" className="text-white hover:text-[#CCFF00] transition">Features</a>
            <a href="#" className="text-white hover:text-[#CCFF00] transition">Integration</a>
            <div className="relative group">
              <button className="text-white hover:text-[#CCFF00] transition flex items-center">
                Pages <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mt-8 mx-auto px-6 pt-20 pb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-black text-white leading-tight space-y-6">
                <div>
                  <span className="relative text-6xl">
                    Демонтаж
                    <span className="absolute bottom-2 left-0 w-full h-2 bg-[#CCFF00] opacity-50 rounded"></span>
                  </span>
                  <span className="text-6xl font-medium"> зданий</span>
                </div>

                <div>
                  <span className="relative text-6xl">
                    Вывоз
                    <span className="absolute bottom-2 left-0 w-full h-2 bg-[#CCFF00] opacity-50 rounded"></span>
                  </span>
                  <span className="text-6xl font-medium"> строительного мусора</span>
                </div>
                
                <div>
                  <span className="relative text-6xl">
                    Монтаж
                    <span className="absolute bottom-2 left-0 w-full h-2 bg-[#CCFF00] opacity-50 rounded"></span>
                  </span>
                  <span className="text-6xl font-medium"> заборов</span>
                </div>
              </h1>


              <div className="pt-16 mt-16 space-y-4 font-medium">
              <div className="flex items-center space-x-2 text-white">
                  <PhoneIncoming className="h-5 w-5 text-[#CCFF00]" />
                  <span>+7 (917) 888-88-88</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <Home className="h-5 w-5 text-[#CCFF00]" />
                  <span>Волгоград</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <Home className="h-5 w-5 text-[#CCFF00]" />
                  <span>Городищенский район</span>
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
  );
}

export default App;
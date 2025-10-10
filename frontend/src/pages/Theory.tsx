import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Zap, Target } from 'lucide-react';
import { Layout } from '../components/Layout';
import ReactMarkdown from 'react-markdown';

type TheorySection = 'euclid' | 'complexity' | 'applications';

const theoryContent: Record<TheorySection, { title: string; content: string; icon: any }> = {
  euclid: {
    title: "Алгоритм Евклида",
    icon: BookOpen,
    content: `
# Алгоритм Евклида

Алгоритм Евклида — это эффективный метод нахождения **наибольшего общего делителя (НОД)** двух целых чисел. Он считается одним из старейших алгоритмов, который до сих пор используется в вычислениях.

## Основная идея

Алгоритм основан на принципе: НОД двух чисел не меняется, если большее число заменить на его остаток от деления на меньшее число.

### Математическая формула

Для любых чисел **a** и **b**, где **a > b**:

\`\`\`
НОД(a, b) = НОД(b, a mod b)
\`\`\`

Процесс повторяется до тех пор, пока **b = 0**, тогда НОД равен **a**.

## Пошаговый пример

Найдём НОД(48, 18):

1. **Шаг 1:** 48 = 18 × 2 + 12 → НОД(48, 18) = НОД(18, 12)  
2. **Шаг 2:** 18 = 12 × 1 + 6 → НОД(18, 12) = НОД(12, 6)  
3. **Шаг 3:** 12 = 6 × 2 + 0 → НОД(12, 6) = НОД(6, 0)  
4. **Результат:** НОД = 6

## Почему это работает

На каждом шаге:
- Любой общий делитель **a** и **b** также делит **a mod b**  
- Любой общий делитель **b** и **a mod b** также делит **a**  

Следовательно, множество общих делителей не меняется, и НОД остаётся правильным.
    `,
  },
  complexity: {
    title: 'Сложность алгоритма',
    icon: Zap,
    content: `
# Анализ сложности

Понимание эффективности алгоритма Евклида важно для оценки его практичности.

## Временная сложность

Временная сложность алгоритма:

\`\`\`
O(log min(a, b))
\`\`\`

Это делает алгоритм **очень быстрым**, даже для больших чисел.

### Почему логарифмическая?

На каждом шаге остаток **не больше половины** предыдущего остатка. Это гарантирует экспоненциальное уменьшение чисел и логарифмическое время.

### Худший случай

Худший случай возникает при последовательных числах Фибоначчи:
- Например, НОД(89, 55) требует максимального числа шагов  
- Для чисел F(n) и F(n-1) требуется примерно **n шагов**

## Практическая производительность

- **Малые числа** (< 1000): почти мгновенно  
- **Средние числа** (< 10^6): микросекунды  
- **Большие числа** (< 10^12): миллисекунды  
- **Очень большие числа** (криптографические): всё ещё приемлемо

## Пространственная сложность

Пространственная сложность **O(1)**, так как требуется фиксированное количество памяти.

Алгоритм идеален для:
- Встроенных систем  
- Криптографии  
- Масштабных вычислений
    `,
  },
  applications: {
    title: 'Применения алгоритма',
    icon: Target,
    content: `
# Практическое применение

Алгоритм Евклида используется не только в теории — он имеет множество практических применений в информатике и математике.

## 1. Криптография

### RSA
- Генерация ключей требует поиска взаимно простых чисел (НОД = 1)  
- Обеспечивает безопасность шифрования

### Диффи-Хеллман
- Использует НОД для проверки корректности общих секретов

## 2. Сокращение дробей

- Пример: 42/18 → НОД(42, 18) = 6 → 7/3  
- Важно для финансовых расчётов, науки и нормализации данных

## 3. Компьютерная графика

### Разрешение экрана и соотношение сторон
- Упрощение пиксельных соотношений: 1920×1080 → НОД = 120 → 16:9  
- Оптимизация масштабирования текстур  
- Расчёт сеток и плиток

## 4. Музыкальная теория

### Музыкальные интервалы и гармония
- Общие делители для ритмов  
- Полиритмы  
- Синхронизация ударов в цифровом аудио

## 5. Теория чисел

- **Тождество Безу**: решение ax + by = gcd(a,b)  
- Модульная арифметика: основа криптографии  
- Факторизация чисел: изучение свойств чисел

## 6. Разработка алгоритмов

- **Расширенный алгоритм Евклида**: обратные элементы  
- **Наименьшее общее кратное (НОК)**: LCM(a,b) = (a×b)/GCD(a,b)  
- **Модульное возведение в степень**: быстрые вычисления
    `,
  },
};

export const Theory = () => {
  const [activeSection, setActiveSection] = useState<TheorySection>('euclid');

  const currentContent = theoryContent[activeSection];
  const Icon = currentContent.icon;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
            <Lightbulb className="w-10 h-10 text-cyan-400" />
            <span>Теория и концепции</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Погружение в математику алгоритма НОД
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-2">
            {(Object.keys(theoryContent) as TheorySection[]).map((section) => {
              const SectionIcon = theoryContent[section].icon;
              const isActive = activeSection === section;

              return (
                <motion.button
                  key={section}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection(section)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/50 border-2'
                      : 'bg-slate-900/50 border border-slate-700 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <SectionIcon
                      className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}
                    />
                    <span className={`font-medium ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {theoryContent[section].title}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 shadow-2xl"
          >
            <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-slate-700">
              <Icon className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl font-bold text-white">{currentContent.title}</h2>
            </div>

            <div className="prose prose-invert prose-cyan max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-white mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-purple-400 mt-6 mb-3">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-slate-300 leading-relaxed mb-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-slate-300 space-y-2 mb-4">{children}</ol>
                  ),
                  code: ({ children }) => (
                    <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400 font-mono text-sm">{children}</code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-slate-800 rounded-lg p-4 overflow-x-auto mb-4 border border-slate-700">{children}</pre>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-cyan-400">{children}</strong>
                  ),
                }}
              >
                {currentContent.content}
              </ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

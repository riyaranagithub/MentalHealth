import { Wind, Brain, Heart, Waves, Eye, Anchor, RefreshCw, BookOpen, Sparkles, Smile } from 'lucide-react';

interface Tool {
  id: string;
  icon: React.ReactNode;
  name: string;
  description: string;
  color: string;
}

interface Category {
  emoji: string;
  title: string;
  tools: Tool[];
}

interface MainHubProps {
  onSelectTool: (toolId: string) => void;
}

export function MainHub({ onSelectTool }: MainHubProps) {
  const categories: Category[] = [
    {
      emoji: '🫁',
      title: 'Calm Your Body',
      tools: [
        {
          id: 'breathing',
          icon: <Wind className="w-6 h-6" />,
          name: 'Guided Breathing',
          description: 'Find your rhythm with gentle breath work',
          color: 'bg-blue-100 hover:bg-blue-200'
        },
        {
          id: 'sensory',
          icon: <Waves className="w-6 h-6" />,
          name: 'Sensory Calm',
          description: 'Use your senses to anchor in the present',
          color: 'bg-cyan-100 hover:bg-cyan-200'
        },
        {
          id: 'grounding',
          icon: <Anchor className="w-6 h-6" />,
          name: 'Grounding',
          description: 'Connect to the here and now',
          color: 'bg-teal-100 hover:bg-teal-200'
        }
      ]
    },
    {
      emoji: '🧠',
      title: 'Calm Your Mind',
      tools: [
        {
          id: 'reframing',
          icon: <RefreshCw className="w-6 h-6" />,
          name: 'Thought Reframing',
          description: 'Find a different perspective on your thoughts',
          color: 'bg-purple-100 hover:bg-purple-200'
        },
        {
          id: 'mindfulness',
          icon: <Eye className="w-6 h-6" />,
          name: 'Mindfulness',
          description: 'Practice present-moment awareness',
          color: 'bg-violet-100 hover:bg-violet-200'
        },
        {
          id: 'writing',
          icon: <BookOpen className="w-6 h-6" />,
          name: 'Expressive Writing',
          description: 'Let your thoughts flow onto the page',
          color: 'bg-indigo-100 hover:bg-indigo-200'
        }
      ]
    },
    {
      emoji: '❤️',
      title: 'Support Yourself',
      tools: [
        {
          id: 'compassion',
          icon: <Heart className="w-6 h-6" />,
          name: 'Self-Compassion',
          description: 'Treat yourself with kindness',
          color: 'bg-pink-100 hover:bg-pink-200'
        },
        {
          id: 'gratitude',
          icon: <Sparkles className="w-6 h-6" />,
          name: 'Gratitude Reset',
          description: 'Shift focus to what\'s going well',
          color: 'bg-rose-100 hover:bg-rose-200'
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl mb-3 text-gray-800">
          Let's slow things down
        </h1>
        <p className="text-lg text-gray-600">
          Choose what feels helpful right now
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {categories.map((category, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-2xl text-gray-700 flex items-center gap-2">
              <span className="text-3xl">{category.emoji}</span>
              {category.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {category.tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => onSelectTool(tool.id)}
                  className={`${tool.color} p-6 rounded-2xl text-left transition-all duration-200 border-2 border-transparent hover:border-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400`}
                >
                  <div className="text-gray-700 mb-3">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg mb-1 text-gray-800">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {tool.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
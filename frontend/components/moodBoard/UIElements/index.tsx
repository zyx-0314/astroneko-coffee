"use client";

import { useUIElementsState } from './UIElements.hook';
import { 
  UIElementsProps, 
  ButtonExample, 
  FormExample, 
  CardExample, 
  LogoExample, 
  StarRating, 
  ToggleExample, 
  BadgeExample 
} from '@/schema/uiElements.schema';

export default function MoodBoardUIElements({ className }: UIElementsProps) {
  const { activeTab, setActiveTab, buttonExamples, formExamples, cardExamples, logoExamples, starRatings, toggleExamples, badgeExamples } = useUIElementsState();

  const getButtonStyles = (variant: string, size: string) => {
    const baseClasses = "font-medium transition-colors rounded-lg";
    
    const variantClasses = {
      primary: "bg-[#6B4E37] text-white hover:bg-[#5A3E2A]",
      secondary: "bg-[#2CA6A4] text-white hover:bg-[#238A88]",
      outline: "border-2 border-[#6B4E37] text-[#6B4E37] hover:bg-[#6B4E37] hover:text-white dark:border-[#E1B168] dark:text-[#E1B168] dark:hover:bg-[#E1B168] dark:hover:text-gray-900",
      ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-6 py-2 text-base",
      lg: "px-8 py-3 text-lg"
    };

    return `${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]} ${sizeClasses[size as keyof typeof sizeClasses]}`;
  };

  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">UI Styling</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('buttons')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'buttons' 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Buttons & Forms
        </button>
        <button
          onClick={() => setActiveTab('cards')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'cards' 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Cards & Images
        </button>
        <button
          onClick={() => setActiveTab('logos')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'logos' 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Logos
        </button>
        <button
          onClick={() => setActiveTab('interactive')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'interactive' 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Interactive
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'badges' 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Badges
        </button>
      </div>

      {activeTab === 'buttons' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buttons Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Buttons</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Button Variants</h4>
                <div className="flex flex-wrap gap-3">
                  {buttonExamples.slice(0, 4).map((button: ButtonExample, index: number) => (
                    <button
                      key={index}
                      className={getButtonStyles(button.variant, button.size)}
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Button Sizes</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <button className={getButtonStyles('primary', 'sm')}>Small</button>
                  <button className={getButtonStyles('primary', 'md')}>Medium</button>
                  <button className={getButtonStyles('primary', 'lg')}>Large</button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Interactive States</h4>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-[#6B4E37] text-white rounded-lg font-medium">
                    Normal State
                  </button>
                  <button className="w-full px-4 py-2 bg-[#5A3E2A] text-white rounded-lg font-medium">
                    Hover State
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-400 text-gray-200 rounded-lg font-medium cursor-not-allowed" disabled>
                    Disabled State
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Forms Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Form Elements</h3>
            
            <div className="space-y-4">
              {formExamples.map((form: FormExample, index: number) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {form.label}
                  </label>
                  {form.type === 'input' && (
                    <input
                      type="text"
                      placeholder={form.placeholder}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#2CA6A4] focus:border-transparent"
                    />
                  )}
                  {form.type === 'textarea' && (
                    <textarea
                      placeholder={form.placeholder}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#2CA6A4] focus:border-transparent resize-none"
                    />
                  )}
                  {form.type === 'select' && (
                    <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2CA6A4] focus:border-transparent">
                      <option value="">{form.placeholder}</option>
                      <option value="small">Small (8oz)</option>
                      <option value="medium">Medium (12oz)</option>
                      <option value="large">Large (16oz)</option>
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardExamples.map((card: CardExample, index: number) => (
            <div
              key={index}
              className={`rounded-xl border transition-all ${
                card.variant === 'featured' 
                  ? 'bg-gradient-to-br from-[#6B4E37] to-[#5A3E2A] text-white border-[#6B4E37] p-6'
                  : card.variant === 'compact'
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-6'
              }`}
            >
              {card.variant === 'featured' && (
                <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
              )}
              <h4 className={`font-semibold mb-2 ${
                card.variant === 'featured' ? 'text-white text-lg' : 
                card.variant === 'compact' ? 'text-gray-900 dark:text-white text-sm' : 
                'text-gray-900 dark:text-white'
              }`}>
                {card.title}
              </h4>
              <p className={`${
                card.variant === 'featured' ? 'text-gray-200 text-sm' : 
                card.variant === 'compact' ? 'text-gray-600 dark:text-gray-400 text-xs' : 
                'text-gray-600 dark:text-gray-400 text-sm'
              }`}>
                {card.description}
              </p>
              {card.variant === 'featured' && (
                <button className="mt-4 px-4 py-2 bg-white text-[#6B4E37] rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Order Now
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'logos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {logoExamples.map((logo: LogoExample, index: number) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 flex items-center justify-center"
            >
              <div className={`${
                logo.size === 'medium' 
                  ? 'w-20 h-20 bg-[#6B4E37]' 
                  : 'w-12 h-12 ' + (
                    logo.label.includes('Black') ? 'bg-black' :
                    logo.label.includes('White') ? 'bg-gray-100 dark:bg-white border border-gray-300' :
                    'bg-[#6B4E37]'
                  )
              } rounded-lg flex items-center justify-center`}>
                <div className="text-white text-xs font-bold">LOGO</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'interactive' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Star Ratings Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Star Ratings</h3>
            
            <div className="space-y-4">
              {starRatings.map((rating: StarRating, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${
                          star <= rating.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{rating.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Toggles Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Toggle Switches</h3>
            
            <div className="space-y-4">
              {toggleExamples.map((toggle: ToggleExample, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <label className="text-gray-700 dark:text-gray-300 font-medium">
                    {toggle.label}
                  </label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      defaultChecked={toggle.checked}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      toggle.checked ? 'bg-[#2CA6A4]' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                        toggle.checked ? 'translate-x-6' : 'translate-x-1'
                      } mt-1`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {badgeExamples.map((badge: BadgeExample, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div
                className="px-3 py-1 rounded-full text-xs font-semibold text-white mb-2"
                style={{ backgroundColor: badge.color }}
              >
                {badge.label}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {badge.variant}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Design Guidelines */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">UI Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Color Usage</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Primary actions use Shingle Fawn (#6B4E37)</li>
              <li>• Secondary actions use Jungle Green (#2CA6A4)</li>
              <li>• Maintain 4.5:1 contrast ratio minimum</li>
              <li>• Use hover states for all interactive elements</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Spacing & Layout</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• 8px base spacing unit (0.5rem)</li>
              <li>• 16px standard padding for buttons</li>
              <li>• 24px minimum touch target size</li>
              <li>• Consistent 8px border radius</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Accessibility</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• All buttons include focus states</li>
              <li>• Form labels are properly associated</li>
              <li>• Interactive elements have clear states</li>
              <li>• Color is not the only indicator</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VidAIStudioLogo({ className }) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main logo background with gradient */}
          <rect width="40" height="40" rx="12" fill="url(#logoGradient)" />

          {/* Play button triangle */}
          <path d="M15 12L28 20L15 28V12Z" fill="white" fillOpacity="0.95" />

          {/* Decorative elements - small diamonds */}
          <circle
            cx="32"
            cy="8"
            r="2"
            fill="url(#accentGradient)"
            opacity="0.8"
          />
          <path
            d="M35 15L37 17L35 19L33 17L35 15Z"
            fill="url(#accentGradient)"
            opacity="0.6"
          />
          <circle
            cx="31"
            cy="32"
            r="1.5"
            fill="url(#accentGradient)"
            opacity="0.7"
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient
              id="logoGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient
              id="accentGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 leading-tight">
          VidAIStudio
        </span>
        <span className="text-xs text-gray-500 font-medium tracking-wide">
          AI VIDEO
        </span>
      </div>
    </div>
  );
}

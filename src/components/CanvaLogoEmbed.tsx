import React, { useState } from 'react';
import { ExternalLink, Sparkles, Maximize2 } from 'lucide-react';

export const CANVA_LOGO_EMBED_URL =
  'https://www.canva.com/design/DAHVdpgZwQc/QpIOfpqwS-WrxfoHeqWMgg/view?embed';
export const CANVA_LOGO_VIEW_URL =
  'https://canva.link/ko5bhxv1zaasyoe';
export const CANVA_LOGO_SHARE_URL =
  'https://canva.link/ko5bhxv1zaasyoe';

interface CanvaLogoEmbedProps {
  className?: string;
  showCaption?: boolean;
  onExpand?: () => void;
}

export const CanvaLogoEmbed: React.FC<CanvaLogoEmbedProps> = ({
  className = '',
  showCaption = true,
  onExpand,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className={`w-full ${className}`}>
      {/* Canva Embed Responsive Container (Matches Canva 141.4286% A4 ratio safely) */}
      <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900 text-slate-300">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent mb-3" />
            <p className="text-xs font-semibold text-slate-300">Loading Official Brand Presentation...</p>
          </div>
        )}

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 0,
            paddingTop: '141.4286%',
            paddingBottom: 0,
            overflow: 'hidden',
          }}
        >
          <iframe
            loading="lazy"
            src={CANVA_LOGO_EMBED_URL}
            title="RD Infra Logo PDF - Official Brand Presentation"
            allowFullScreen
            allow="fullscreen"
            onLoad={() => setIsLoading(false)}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              border: 'none',
              padding: 0,
              margin: 0,
            }}
          />
        </div>

        {onExpand && (
          <button
            type="button"
            onClick={onExpand}
            className="absolute top-3 right-3 z-20 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg border border-slate-700/60 shadow-md transition-all cursor-pointer backdrop-blur-sm"
            title="Open Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {showCaption && (
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <a
              href={CANVA_LOGO_SHARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A4D92] hover:text-blue-800 font-semibold hover:underline inline-flex items-center gap-1"
            >
              RD Infra logo PDF
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>by Harshita Taksh</span>
          </div>

          <a
            href={CANVA_LOGO_VIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-800 font-medium hover:underline"
          >
            Open in Canva
          </a>
        </div>
      )}
    </div>
  );
};

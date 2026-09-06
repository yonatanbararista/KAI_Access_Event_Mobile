import React from 'react';
import { Wifi, Battery } from 'lucide-react';

export const IosStatusBar = ({ light = true }) => {
  return (
    <div className={`w-full flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold z-50 select-none ${light ? 'text-white' : 'text-slate-800'}`}>
      <span>23:32</span>
      <div className="flex items-center gap-1.5">
        {/* Cellular signal bars */}
        <div className="flex items-end gap-0.5 h-3">
          <div className={`w-0.5 h-1 rounded-sm ${light ? 'bg-white' : 'bg-slate-800'}`} />
          <div className={`w-0.5 h-1.5 rounded-sm ${light ? 'bg-white' : 'bg-slate-800'}`} />
          <div className={`w-0.5 h-2 rounded-sm ${light ? 'bg-white' : 'bg-slate-800'}`} />
          <div className={`w-0.5 h-2.5 rounded-sm ${light ? 'bg-white' : 'bg-slate-800'}`} />
        </div>
        <Wifi size={13} strokeWidth={2.5} />
        <div className="flex items-center">
          <div className={`w-5 h-2.5 border ${light ? 'border-white' : 'border-slate-800'} rounded-sm p-0.5 flex items-center`}>
            <div className={`h-full w-3/4 rounded-2xs ${light ? 'bg-white' : 'bg-slate-800'}`} />
          </div>
          <div className={`w-0.5 h-1 ${light ? 'bg-white' : 'bg-slate-800'} rounded-r-xs`} />
        </div>
      </div>
    </div>
  );
};

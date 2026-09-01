import React, { useState } from 'react';
import { 
  Sliders, 
  Palette, 
  Zap, 
  MousePointer, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ChevronLeft,
  Layers,
  Circle,
  Activity
} from 'lucide-react';

export default function ControlsPanel({
  props,
  onChange,
  onReset,
  presets,
  onApplyPreset,
  showHero,
  onToggleHero,
  visible,
  onToggleVisibility
}) {
  const [activeTab, setActiveTab] = useState('grid');
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!visible) {
    return (
      <button
        onClick={onToggleVisibility}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-105"
        title="Show Customization Controls"
      >
        <Sliders className="w-3.5 h-3.5 text-blue-400" />
        <span>Customize Grid</span>
      </button>
    );
  }

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isCollapsed ? 'translate-x-[calc(100%-44px)]' : ''}`}>
      <div className="relative flex items-stretch bg-slate-950/85 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden w-80 max-h-[85vh] text-slate-200">
        
        {/* Collapse / Expand Tab Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-11 bg-slate-900/60 hover:bg-slate-800/80 border-r border-slate-800 text-slate-400 hover:text-slate-200 transition-colors shrink-0"
          title={isCollapsed ? 'Expand Panel' : 'Collapse Panel'}
        >
          {isCollapsed ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>

        {/* Main Panel Content */}
        <div className="flex-1 flex flex-col p-4 overflow-y-auto custom-scrollbar">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide">Kinetic Controls</h3>
                <p className="text-[10px] text-slate-400">Live Grid & Physics Tweaker</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={onReset}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all"
                title="Reset to Defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onToggleVisibility}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all"
                title="Hide Overlay"
              >
                <EyeOff className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900/80 border border-slate-800/80 rounded-xl mb-4 text-xs font-medium">
            <button
              onClick={() => setActiveTab('grid')}
              className={`flex flex-col items-center py-1.5 px-1 rounded-lg transition-all ${
                activeTab === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 mb-0.5" />
              <span className="text-[10px]">Grid</span>
            </button>
            <button
              onClick={() => setActiveTab('physics')}
              className={`flex flex-col items-center py-1.5 px-1 rounded-lg transition-all ${
                activeTab === 'physics' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5 mb-0.5" />
              <span className="text-[10px]">Physics</span>
            </button>
            <button
              onClick={() => setActiveTab('motion')}
              className={`flex flex-col items-center py-1.5 px-1 rounded-lg transition-all ${
                activeTab === 'motion' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MousePointer className="w-3.5 h-3.5 mb-0.5" />
              <span className="text-[10px]">Motion</span>
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`flex flex-col items-center py-1.5 px-1 rounded-lg transition-all ${
                activeTab === 'theme' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5 mb-0.5" />
              <span className="text-[10px]">Colors</span>
            </button>
          </div>

          {/* TAB 1: GRID GEOMETRY */}
          {activeTab === 'grid' && (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Spacing</span>
                  <span className="font-mono text-blue-400 text-[11px]">{props.spacing}px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="2"
                  value={props.spacing}
                  onChange={(e) => onChange('spacing', parseFloat(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Dot Size</span>
                  <span className="font-mono text-blue-400 text-[11px]">{props.dotSize}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={props.dotSize}
                  onChange={(e) => onChange('dotSize', parseFloat(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Grid Line Stroke</span>
                  <span className="font-mono text-blue-400 text-[11px]">{props.gridStroke}px</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={props.gridStroke}
                  onChange={(e) => onChange('gridStroke', parseFloat(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Grid Opacity</span>
                  <span className="font-mono text-blue-400 text-[11px]">{Math.round(props.gridOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1"
                  step="0.05"
                  value={props.gridOpacity}
                  onChange={(e) => onChange('gridOpacity', parseFloat(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PHYSICS & FORCES */}
          {activeTab === 'physics' && (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Interaction Mode</span>
                  <span className="font-mono text-blue-400 capitalize text-[11px]">{props.interactionMode}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900 rounded-lg text-[11px]">
                  {['repulsion', 'attraction', 'swirl'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => onChange('interactionMode', mode)}
                      className={`py-1 rounded capitalize transition-colors ${
                        props.interactionMode === mode ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Repulsion Force</span>
                  <span className="font-mono text-blue-400 text-[11px]">{props.repulsion}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={props.repulsion}
                  onChange={(e) => onChange('repulsion', parseFloat(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Interaction Radius</span>
                  <span className="font-mono text-blue-400 text-[11px]">{props.radius}px</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="350"
                  step="10"
                  value={props.radius}
                  onChange={(e) => onChange('radius', parseFloat(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Spring Stiffness</span>
                  <span className="font-mono text-blue-400 text-[11px]">{props.stiffness.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.02"
                  max="0.3"
                  step="0.01"
                  value={props.stiffness}
                  onChange={(e) => onChange('stiffness', parseFloat(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Damping (Friction)</span>
                  <span className="font-mono text-blue-400 text-[11px]">{props.damping.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="0.96"
                  step="0.02"
                  value={props.damping}
                  onChange={(e) => onChange('damping', parseFloat(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 3: CLICK & TRAIL */}
          {activeTab === 'motion' && (
            <div className="space-y-4">
              {/* Click Ripple Props */}
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-200">Click Shockwave</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={props.enableClick}
                      onChange={(e) => onChange('enableClick', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {props.enableClick && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Click Intensity</span>
                      <span className="font-mono text-blue-400 text-[11px]">{props.clickIntensity}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      step="5"
                      value={props.clickIntensity}
                      onChange={(e) => onChange('clickIntensity', parseFloat(e.target.value))}
                      className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Cursor Trail Props */}
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-200">Cursor Trail (Hover)</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={props.enableTrail}
                      onChange={(e) => onChange('enableTrail', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {props.enableTrail && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Trail Inertia / Softness</span>
                      <span className="font-mono text-blue-400 text-[11px]">{Math.round(props.trailIntensity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="0.95"
                      step="0.05"
                      value={props.trailIntensity}
                      onChange={(e) => onChange('trailIntensity', parseFloat(e.target.value))}
                      className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Toggle Center Hero Card */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">Show Center Title Card</span>
                <button
                  onClick={onToggleHero}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                    showHero ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {showHero ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{showHero ? 'Visible' : 'Hidden'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: COLORS & PRESETS */}
          {activeTab === 'theme' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Background</span>
                  <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-lg border border-slate-800">
                    <input
                      type="color"
                      value={props.backgroundColor}
                      onChange={(e) => onChange('backgroundColor', e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="font-mono text-[11px] text-slate-300 uppercase">{props.backgroundColor}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">Hover Glow</span>
                  <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-lg border border-slate-800">
                    <input
                      type="color"
                      value={props.hoverColor}
                      onChange={(e) => onChange('hoverColor', e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="font-mono text-[11px] text-blue-400 uppercase">{props.hoverColor}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">Grid Lines</span>
                  <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-lg border border-slate-800">
                    <input
                      type="color"
                      value={props.lineColor}
                      onChange={(e) => onChange('lineColor', e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="font-mono text-[11px] text-slate-300 uppercase">{props.lineColor}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">Grid Dots</span>
                  <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-lg border border-slate-800">
                    <input
                      type="color"
                      value={props.dotColor}
                      onChange={(e) => onChange('dotColor', e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="font-mono text-[11px] text-slate-300 uppercase">{props.dotColor}</span>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-medium block mb-2">Visual Presets</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.keys(presets).map((presetKey) => (
                    <button
                      key={presetKey}
                      onClick={() => onApplyPreset(presetKey)}
                      className="flex items-center justify-center p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-all hover:scale-[1.02]"
                    >
                      <span className="capitalize text-[11px] font-medium">{presetKey.replace(/([A-Z])/g, ' $1')}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

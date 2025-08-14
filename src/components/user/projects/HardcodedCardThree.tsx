import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  CalendarClock,
  Clock,
  Copy,
  MoreVertical,
  Pencil,
  Star,
  Trash2,
  Target,
  Database,
  Timer,
  Palette,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";

export default function HardcodedCardThree() {
  // Format dates
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) + ", " + date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).toLowerCase();
  };

  // Hard-coded theme for the third card using teal theme
  const theme = {
    header: 'bg-gradient-to-br from-purple-50 to-purple-100',
    accent: 'bg-gradient-to-r from-purple-600 to-purple-700',
    text: 'text-purple-700',
    light: 'text-purple-400',
    hover: 'hover:bg-purple-50/80',
    card: 'bg-gradient-to-br from-purple-50 to-purple-100',
    overlay: 'bg-gradient-to-br from-purple-600 to-purple-700',
  };

  // Hard-coded creation and update dates
  const createdDate = new Date("2025-07-20T08:45:00");
  const updatedDate = new Date("2025-08-08T16:30:00");

  return (
    <div
      className={`group relative overflow-hidden border-0 ${theme.card} hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer w-full min-h-[340px] flex flex-col rounded-3xl shadow-lg`}
    >
      {/* Dashboard-style overlay */}
      <div className={`absolute inset-0 ${theme.overlay} opacity-5`} />
      
      {/* Header */}
      <div className={`relative ${theme.header} px-6 py-2.5 border-b border-white/20`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`${theme.accent} w-8 h-8 rounded-2xl flex items-center justify-center shadow-lg`}>
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Market Optimizer
              </h2>
              <span className={`${theme.text} bg-white/90 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm inline-block mt-0.5`}>
                v1.8
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className={`${theme.hover} p-2 rounded-xl transition-all duration-200 group h-auto w-auto border-0 bg-white/60 backdrop-blur-sm`}
            >
              <Star
                className={`w-4 h-4 fill-amber-400 text-amber-400`}
              />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${theme.hover} p-2 rounded-xl transition-all duration-200 group h-auto w-auto border-0 bg-white/60 backdrop-blur-sm`}
                >
                  <MoreVertical className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-52 bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20 rounded-2xl p-2"
              >
                <DropdownMenuItem
                  className="text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 px-4 py-3 cursor-pointer text-sm rounded-xl font-medium flex items-center gap-3 whitespace-nowrap"
                >
                  <Copy className="w-4 h-4 flex-shrink-0" />
                  Duplicate Project
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-700 hover:bg-emerald-50/80 hover:text-emerald-600 px-4 py-3 cursor-pointer text-sm rounded-xl font-medium flex items-center gap-3"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem
                  className="text-red-600 hover:bg-red-50/80 px-4 py-3 cursor-pointer text-sm rounded-xl font-medium flex items-center gap-3"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Content - Fixed height with proper spacing */}
      <div className="relative px-6 py-3 flex-1 flex flex-col min-h-0 bg-white/80 backdrop-blur-sm">
        {/* Description */}
        <p className="text-slate-600 text-sm mb-3 leading-relaxed font-medium">
          Comprehensive market optimization solution with advanced competitor analysis and pricing strategies.
        </p>

        {/* Details - Scrollable if needed */}
        <div className="space-y-2.5 flex-1">
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center space-x-3">
              <Database className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500 font-medium">Table</span>
            </div>
            <span className="text-sm font-semibold text-slate-800">Competitive Intel</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="flex items-center space-x-3">
              <Target className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500 font-medium">Target Brand</span>
            </div>
            <span className="text-sm font-semibold text-slate-800">Premium Series</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="flex items-center space-x-3">
              <Timer className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500 font-medium">Model Run</span>
            </div>
            <span className="text-sm font-semibold text-slate-800">65 Weeks</span>
          </div>

          <div className="pt-2.5 border-t border-slate-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-500 font-medium">Created</span>
              </div>
              <span className="text-xs text-slate-700 font-semibold">{formatDate(createdDate)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CalendarClock className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-500 font-medium">Last Updated</span>
              </div>
              <span className="text-xs text-slate-700 font-semibold">{formatDate(updatedDate)}</span>
            </div>
          </div>
        </div>

        {/* Button - Fixed at bottom */}
        <div className="mt-3 pt-2.5 border-t border-slate-200/60">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className={`w-full ${theme.accent} hover:shadow-lg text-white font-semibold py-2.5 px-5 rounded-2xl transition-all duration-300 text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer group relative z-10`}
              >
                <span>Actions</span>
                <ChevronDown className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="bg-white/95 backdrop-blur-lg shadow-2xl border border-white/20 rounded-2xl p-3 w-[352px] mb-2"
              sideOffset={5}
              side="top"
            >
              <div className="grid grid-cols-2 gap-2 w-full">
                <Link
                  href={`/user/design-studio?projectName=Market Optimizer&project=1003&model=2003`}
                  className={`bg-purple-200 hover:bg-purple-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-10 border border-purple-300/50`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  Design Studio
                </Link>
                
                <Link
                  href={`/user/simulator?projectName=Market Optimizer&project=1003&model=2003`}
                  className={`bg-emerald-200 hover:bg-emerald-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-10 border border-emerald-300/50`}
                >
                  <Target className="w-3.5 h-3.5" />
                  Simulator
                </Link>
                
                <Link
                  href={`/user/insights?projectName=Market Optimizer&project=1003&model=2003`}
                  className={`bg-indigo-200 hover:bg-indigo-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-10 border border-indigo-300/50`}
                >
                  <Database className="w-3.5 h-3.5" />
                  Insights
                </Link>
                
                <Link
                  href={`/user/output?projectName=Market Optimizer&project=1003&model=2003`}
                  className={`bg-amber-200 hover:bg-amber-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-10 border border-amber-300/50`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Output Report
                </Link>
                
                <Link
                  href={`/user/forecast?projectName=Market Optimizer&project=1003&model=2003`}
                  className={`bg-cyan-200 hover:bg-cyan-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-10 border border-cyan-300/50`}
                >
                  <CalendarClock className="w-3.5 h-3.5" />
                  Forecast
                </Link>
                
                <Link
                  href={`/user/tpo?projectName=Market Optimizer&project=1003&model=2003`}
                  className={`bg-fuchsia-200 hover:bg-fuchsia-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-10 border border-fuchsia-300/50`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  TPO
                </Link>
                
                <Link
                  href={`/user/analysis?projectName=Market Optimizer&project=1003&model=2003`}
                  className={`bg-rose-200 hover:bg-rose-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-10 border border-rose-300/50`}
                >
                  <Target className="w-3.5 h-3.5" />
                  Analysis
                </Link>
                
                <Link
                  href={`/user/price-architecture?projectName=Market Optimizer&project=1003&model=2003`}
                  className={`bg-lime-200 hover:bg-lime-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-10 border border-lime-300/50`}
                >
                  <Database className="w-3.5 h-3.5" />
                  Price Architecture
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

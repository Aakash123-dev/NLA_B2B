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
} from "lucide-react";

export default function HardcodedCardOne() {
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

  // Hard-coded theme for the first card
  const theme = {
				header: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
				accent: 'bg-gradient-to-r from-cyan-600 to-cyan-700',
				text: 'text-cyan-700',
				light: 'text-cyan-400',
				hover: 'hover:bg-cyan-50/80',
				card: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
				overlay: 'bg-gradient-to-br from-cyan-600 to-cyan-700',

  };

  // Hard-coded creation and update dates
  const createdDate = new Date("2025-08-01T10:30:00");
  const updatedDate = new Date("2025-08-10T14:45:00");

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
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Premium Analytics
              </h2>
              <span className={`${theme.text} bg-white/90 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm inline-block mt-0.5`}>
                v2.1
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
          Advanced analytics platform with real-time data visualization and predictive modeling capabilities.
        </p>

        {/* Date info - Moved under description */}
        <div className="mb-3 pb-2.5 border-b border-slate-200/60 space-y-1.5">
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

        {/* Action buttons grid */}
        <div className="flex-1 grid grid-cols-2 gap-2">
          <Link
            href={`/user/design-studio?projectName=Premium Analytics&project=1001&model=2001`}
            className={`bg-orange-50 hover:bg-orange-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-9 border border-orange-300/50`}
          >
            <Activity className="w-3.5 h-3.5" />
            Design Studio
          </Link>
          
          <Link
            href={`/user/simulator?projectName=Premium Analytics&project=1001&model=2001`}
            className={`bg-emerald-50 hover:bg-emerald-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-9 border border-emerald-300/50`}
          >
            <Target className="w-3.5 h-3.5" />
            Simulator
          </Link>
          
          <Link
            href={`/user/insights?projectName=Premium Analytics&project=1001&model=2001`}
            className={`bg-indigo-50 hover:bg-indigo-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-9 border border-indigo-300/50`}
          >
            <Database className="w-3.5 h-3.5" />
            Insights
          </Link>
          
          <Link
            href={`/user/output?projectName=Premium Analytics&project=1001&model=2001`}
            className={`bg-amber-50 hover:bg-amber-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-9 border border-amber-300/50`}
          >
            <Clock className="w-3.5 h-3.5" />
            Output Report
          </Link>
          
          <Link
            href={`/user/forecast?projectName=Premium Analytics&project=1001&model=2001`}
            className={`bg-cyan-50 hover:bg-cyan-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-9 border border-cyan-300/50`}
          >
            <CalendarClock className="w-3.5 h-3.5" />
            Forecast
          </Link>
          
          <Link
            href={`/user/tpo?projectName=Premium Analytics&project=1001&model=2001`}
            className={`bg-fuchsia-50 hover:bg-fuchsia-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-9 border border-fuchsia-300/50`}
          >
            <Palette className="w-3.5 h-3.5" />
            TPO
          </Link>
          
          <Link
            href={`/user/analysis?projectName=Premium Analytics&project=1001&model=2001`}
            className={`bg-rose-50 hover:bg-rose-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-9 border border-rose-300/50`}
          >
            <Target className="w-3.5 h-3.5" />
             Analysis
          </Link>
          
          <Link
            href={`/user/price-architecture?projectName=Premium Analytics&project=1001&model=2001`}
            className={`bg-lime-50 hover:bg-lime-300 hover:shadow-md text-black font-medium py-2 px-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 h-9 border border-lime-300/50`}
          >
            <Database className="w-3.5 h-3.5" />
            Price Architecture
          </Link>
        </div>
      </div>
    </div>
  );
}

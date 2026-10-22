import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Project } from "@/lib/types/projects";
import React, { SetStateAction } from "react";
import { cn } from "cn";
import { FILTER_TABS, FilterTab } from "../pages/projects-data-table";

type FilterTapsPorps = {
    projectsList: Project[];
    filter: FilterTab;
    setFilter: React.Dispatch<SetStateAction<FilterTab>>;
    search: string;
    setSearch: React.Dispatch<SetStateAction<string>>;
}

export function FilterTapsAndSearch({ projectsList, filter, setFilter, search, setSearch }: FilterTapsPorps) {
    return(
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
            {FILTER_TABS.map(({ key, label }) => {
              const count = key === "all" ? projectsList.length : projectsList.filter(l => l.stack === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                    filter === key
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  )}
                >
                  {label}
                  <span className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    filter === key ? "bg-background/20 text-background" : "bg-background text-foreground"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm text-primary"
            />
          </div>
        </div>
    )
}
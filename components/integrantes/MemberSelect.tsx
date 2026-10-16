"use client";

import { useRef, useState } from "react";
import type { Member } from "@/content/types";
import { cn } from "@/lib/utils";
import { MemberBio } from "@/components/integrantes/MemberBio";
import { MemberPortrait } from "@/components/integrantes/MemberPortrait";

interface MemberSelectProps {
  members: Member[];
}

/**
 * Roster interactivo de /integrantes: selector tipo tabs + retrato + ficha.
 * El estado de selección vive acá; la página (server component) solo pasa
 * los datos desde content/members.ts.
 */
export function MemberSelect({ members }: MemberSelectProps) {
  const [selectedId, setSelectedId] = useState(members[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = members.findIndex((member) => member.id === selectedId);
  const selected = selectedIndex >= 0 ? members[selectedIndex] : members[0];

  if (!selected) return null;

  return (
    <div>
      {/* Selector de integrante */}
      <div
        role="tablist"
        aria-label="Elegir integrante"
        className="flex flex-wrap items-end gap-x-8 gap-y-4 border-b border-steel sm:gap-x-12"
      >
        {members.map((member, index) => {
          const isActive = member.id === selected.id;
          return (
            <button
              key={member.id}
              type="button"
              role="tab"
              id={`integrante-tab-${member.id}`}
              aria-selected={isActive}
              aria-controls={`integrante-panel-${member.id}`}
              tabIndex={isActive ? 0 : -1}
              ref={(element) => { tabRefs.current[index] = element; }}
              onClick={() => setSelectedId(member.id)}
              onKeyDown={(event) => {
                let nextIndex: number;
                switch (event.key) {
                  case "ArrowRight":
                    nextIndex = (index + 1) % members.length;
                    break;
                  case "ArrowLeft":
                    nextIndex = (index - 1 + members.length) % members.length;
                    break;
                  case "Home":
                    nextIndex = 0;
                    break;
                  case "End":
                    nextIndex = members.length - 1;
                    break;
                  default:
                    return;
                }
                event.preventDefault();
                setSelectedId(members[nextIndex].id);
                tabRefs.current[nextIndex]?.focus();
              }}
              className={cn(
                "-mb-px flex cursor-pointer items-baseline gap-3 border-b-2 px-1 pb-4 pt-1 transition-colors duration-300",
                isActive
                  ? "border-blood text-blood"
                  : "border-transparent text-fog hover:text-bone"
              )}
            >
              <span className="tech-label text-smoke">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="display-title text-2xl sm:text-3xl">
                {member.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel del integrante seleccionado — key fuerza el fade al cambiar */}
      <div
        key={selected.id}
        role="tabpanel"
        id={`integrante-panel-${selected.id}`}
        aria-labelledby={`integrante-tab-${selected.id}`}
        tabIndex={0}
        className="animate-fade-in pt-10 sm:pt-14"
      >
        <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          <MemberPortrait
            name={selected.name}
            photo={selected.photo}
            index={selectedIndex + 1}
            total={members.length}
            className="lg:col-span-5"
          />
          <MemberBio member={selected} className="lg:col-span-6 lg:col-start-7" />
        </div>
      </div>
    </div>
  );
}

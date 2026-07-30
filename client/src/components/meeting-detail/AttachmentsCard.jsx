import { FileAudio, FileImage, FileText, Paperclip } from "lucide-react";

import DetailSectionCard from "@/components/meeting-detail/DetailSectionCard";

const TYPE_ICON = {
  audio: FileAudio,
  pdf: FileText,
  image: FileImage,
};

export default function AttachmentsCard({ attachments }) {
  return (
    <DetailSectionCard title="Attachments" icon={Paperclip}>
      <ul className="space-y-2">
        {attachments.map((file) => {
          const Icon = TYPE_ICON[file.type] ?? FileText;

          return (
            <li key={file.id}>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl border border-[#27272A]/50 bg-[#0F0F11] px-3.5 py-3 text-left transition-colors duration-200 hover:border-[#27272A] hover:bg-[#121214]"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#1A1A1D]">
                  <Icon className="size-3.5 text-[#3B82F6]" strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium tracking-tight text-[#FAFAFA]">
                    {file.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-[#71717A]">
                    {file.size}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </DetailSectionCard>
  );
}

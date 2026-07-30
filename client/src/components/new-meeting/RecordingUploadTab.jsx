import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FileAudio,
  FileVideo,
  Upload,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = [
  "audio/mpeg",
  "audio/mp4",
  "audio/wav",
  "audio/x-wav",
  "audio/x-m4a",
  "audio/m4a",
  "video/mp4",
  ".mp3",
  ".mp4",
  ".wav",
  ".m4a",
];

const ACCEPT_ATTR = ".mp3,.mp4,.wav,.m4a,audio/mpeg,audio/wav,audio/mp4,video/mp4";
const MAX_FILE_SIZE_MB = 500;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isAcceptedFile(file) {
  const name = file.name.toLowerCase();
  const extOk = [".mp3", ".mp4", ".wav", ".m4a"].some((ext) =>
    name.endsWith(ext)
  );
  return extOk || ACCEPTED_TYPES.includes(file.type);
}

function FileTypeIcon({ fileName }) {
  const isVideo = fileName.toLowerCase().endsWith(".mp4");
  const Icon = isVideo ? FileVideo : FileAudio;
  return <Icon className="size-4 text-[#3B82F6]" strokeWidth={1.75} />;
}

export default function RecordingUploadTab({ onUpload }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const selectFile = useCallback((nextFile) => {
    if (!nextFile) return;

    if (!isAcceptedFile(nextFile)) {
      setError("Unsupported format. Use MP3, MP4, WAV, or M4A.");
      setFile(null);
      return;
    }

    if (nextFile.size > MAX_FILE_SIZE_BYTES) {
      setError(`File exceeds the ${MAX_FILE_SIZE_MB} MB limit.`);
      setFile(null);
      return;
    }

    setError("");
    setFile(nextFile);
  }, []);

  const onDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    selectFile(dropped);
  };

  const handleUpload = () => {
    if (!file) return;
    onUpload?.(file);
  };

  return (
    <motion.div
      key="upload"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[1.25rem] border border-dashed px-6 py-10 text-center transition-all duration-200",
          dragging
            ? "border-[#3B82F6] bg-[#3B82F6]/8"
            : "border-[#27272A] bg-[#0F0F11] hover:border-[#3F3F46] hover:bg-[#121214]"
        )}
      >
        <div className="flex size-12 items-center justify-center rounded-2xl border border-[#27272A] bg-[#18181B] transition-colors duration-200 group-hover:border-[#3B82F6]/30">
          <Upload className="size-5 text-[#3B82F6]" strokeWidth={1.75} />
        </div>

        <div className="space-y-1">
          <p className="text-[15px] font-medium tracking-tight text-[#FAFAFA]">
            Drag and drop your recording
          </p>
          <p className="text-sm text-[#71717A]">
            or browse files from your device
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-1 h-8 rounded-lg border-[#27272A] bg-[#18181B] px-3 text-xs font-medium text-[#A1A1AA] hover:border-[#3F3F46] hover:bg-[#1C1C1F] hover:text-[#FAFAFA]"
          onClick={(event) => {
            event.stopPropagation();
            inputRef.current?.click();
          }}
        >
          Browse Files
        </Button>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_ATTR}
          className="hidden"
          onChange={(event) => {
            selectFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </div>

      {file ? (
        <div className="flex items-center gap-3 rounded-xl border border-[#27272A]/70 bg-[#141416] px-3.5 py-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#1A1A1D]">
            <FileTypeIcon fileName={file.name} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium tracking-tight text-[#FAFAFA]">
              {file.name}
            </p>
            <p className="text-xs text-[#71717A]">{formatBytes(file.size)}</p>
          </div>
          <button
            type="button"
            aria-label="Remove file"
            onClick={() => {
              setFile(null);
              setError("");
            }}
            className="flex size-8 items-center justify-center rounded-lg text-[#71717A] transition-colors hover:bg-[#1C1C1F] hover:text-[#FAFAFA]"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}

      {error ? (
        <p className="text-xs text-rose-400">{error}</p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 text-xs text-[#71717A]">
        {["MP3", "MP4", "WAV", "M4A"].map((format) => (
          <span
            key={format}
            className="inline-flex h-6 items-center rounded-md bg-[#1A1A1D] px-2 font-medium text-[#A1A1AA] ring-1 ring-inset ring-[#27272A]"
          >
            {format}
          </span>
        ))}
        <span className="text-[#52525B]">·</span>
        <span>Max {MAX_FILE_SIZE_MB} MB</span>
      </div>

      <Button
        type="button"
        disabled={!file}
        onClick={handleUpload}
        className={cn(
          "h-10 w-full gap-2 rounded-xl border-0 text-sm font-medium",
          file
            ? "bg-[#3B82F6] text-white hover:bg-[#2563EB] hover:text-white"
            : "bg-[#1A1A1D] text-[#52525B]"
        )}
      >
        <Upload className="size-4" />
        Upload & Analyze
      </Button>
    </motion.div>
  );
}

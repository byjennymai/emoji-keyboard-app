"use client";

import {
  type EmojiPickerListCategoryHeaderProps,
  type EmojiPickerListEmojiProps,
  type EmojiPickerListRowProps,
  EmojiPicker as EmojiPickerPrimitive,
} from "frimousse";
import { LoaderIcon, SearchIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

function EmojiPicker({
  className,
  ...props
}: React.ComponentProps<typeof EmojiPickerPrimitive.Root>) {
  return (
    <EmojiPickerPrimitive.Root
      className={cn(
        "bg-popover text-popover-foreground isolate flex h-full w-fit flex-col overflow-hidden rounded-md",
        className
      )}
      data-slot="emoji-picker"
      {...props}
    />
  );
}

interface EmojiPickerSearchProps extends React.ComponentProps<typeof EmojiPickerPrimitive.Search> {
}

function EmojiPickerSearch({
  className,
  ...props
}: EmojiPickerSearchProps) {
  return (
    <div
      className={cn("flex h-12 items-center gap-2 px-3 pb-2 pt-2", className)}
      style={{ paddingLeft: '32px' }}
      data-slot="emoji-picker-search-wrapper"
    >
      <EmojiPickerPrimitive.Search
        className="outline-hidden flex h-10 w-full rounded-md bg-transparent py-3 text-md disabled:cursor-not-allowed disabled:opacity-50 emoji-keyboard-input"
        style={{ 
          fontFamily: 'Maru Mono, monospace', 
          color: '#E9E9E9'
        }}
        placeholder="emoji-keyboard"
        data-slot="emoji-picker-search"
        {...props}
      />
    </div>
  );
}

function EmojiPickerRow({ children, ...props }: EmojiPickerListRowProps) {
  return (
    <div {...props} className="scroll-my-1 px-0.5" data-slot="emoji-picker-row">
      {children}
    </div>
  );
}

interface EmojiPickerEmojiProps extends EmojiPickerListEmojiProps {
  onEmojiClick?: (emoji: string) => void;
}

function EmojiPickerEmoji({
  emoji,
  className,
  onEmojiClick,
  ...props
}: EmojiPickerEmojiProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onEmojiClick) {
      onEmojiClick(emoji.emoji)
    }
    // Call original onClick if it exists
    if (props.onClick) {
      props.onClick(e as any)
    }
  }

  return (
    <button
      {...props}
      onClick={handleClick}
      className={cn(
        "data-[active]:bg-accent flex items-center justify-center rounded-[14px]",
        className
      )}
      style={{ 
        width: '45px', 
        height: '45px', 
        padding: '10px', 
        fontSize: '28px'
      }}
      data-slot="emoji-picker-emoji"
    >
      {emoji.emoji}
    </button>
  );
}

function EmojiPickerCategoryHeader({
  category,
  ...props
}: EmojiPickerListCategoryHeaderProps) {
  return (
    <div
      {...props}
      className="px-3 pb-2 pt-3.5 text-xs leading-none sticky top-0 z-10"
      style={{ paddingLeft: '30px' }}
      data-slot="emoji-picker-category-header"
    >
            <span className="px-2 pb-0.5 pt-1 rounded-xl inline-block backdrop-blur-md relative" style={{ fontFamily: 'PP NeueBit, sans-serif', fontSize: '18px', textTransform: 'capitalize', backgroundColor: '#E6E6DE/80', color: '#6B6B6B' }}>
        {category.label}
      </span>
    </div>
  );
}

interface EmojiPickerContentProps extends React.ComponentProps<typeof EmojiPickerPrimitive.Viewport> {
  onEmojiClick?: (emoji: string) => void;
}

function EmojiPickerContent({
  className,
  onEmojiClick,
  ...props
}: EmojiPickerContentProps) {
  return (
    <EmojiPickerPrimitive.Viewport
      className={cn("outline-hidden relative flex-1", className)}
      data-slot="emoji-picker-viewport"
      {...props}
    >
      <EmojiPickerPrimitive.Loading
        className="absolute inset-0 flex items-center justify-center text-muted-foreground"
        data-slot="emoji-picker-loading"
      >
        <LoaderIcon className="size-4 animate-spin" />
      </EmojiPickerPrimitive.Loading>
      <EmojiPickerPrimitive.Empty
        className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm"
        data-slot="emoji-picker-empty"
      >
        No emoji found.
      </EmojiPickerPrimitive.Empty>
      <EmojiPickerPrimitive.List
        className="select-none pb-1"
        components={{
          Row: EmojiPickerRow,
          Emoji: (props: any) => (
            <EmojiPickerEmoji
              {...props}
              onEmojiClick={onEmojiClick}
            />
          ),
          CategoryHeader: EmojiPickerCategoryHeader,
        }}
        data-slot="emoji-picker-list"
      />
    </EmojiPickerPrimitive.Viewport>
  );
}

function EmojiPickerFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-w-(--frimousse-viewport-width) flex w-full min-w-0 items-center gap-1 p-2",
        className
      )}
      data-slot="emoji-picker-footer"
      {...props}
    >
      <EmojiPickerPrimitive.ActiveEmoji>
        {({ emoji }) =>
          emoji ? (
            <>
              <div className="flex size-14 flex-none items-center justify-center text-2xl">
                {emoji.emoji}
              </div>
              <span className="text-secondary-foreground truncate text-xs">
                {emoji.label}
              </span>
            </>
          ) : (
            <span className="text-muted-foreground ml-1.5 flex h-7 items-center truncate text-xs">
              Select an emoji…
            </span>
          )
        }
      </EmojiPickerPrimitive.ActiveEmoji>
    </div>
  );
}

export {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
};
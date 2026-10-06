"use client";

import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const storageKey = "miqode-lead-dismissed";
const delayMs = 8000;

function rememberDismissal() {
  try {
    sessionStorage.setItem(storageKey, "1");
  } catch {
    // Private mode can block storage. Closing still works for this view.
  }
}

export function LeadDialog() {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/start") return;
    try {
      if (sessionStorage.getItem(storageKey)) return;
    } catch {
      return;
    }

    const id = window.setTimeout(() => {
      if (window.location.pathname === "/start") return;
      setOpen(true);
    }, delayMs);

    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (pathnameRef.current === pathname) return;
    pathnameRef.current = pathname;
    setOpen(false);
  }, [pathname]);

  function dismiss() {
    setOpen(false);
    rememberDismissal();
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (next) {
          setOpen(true);
          return;
        }
        dismiss();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="lead-dialog-backdrop fixed inset-0 z-[70] bg-ink/45 supports-backdrop-filter:backdrop-blur-xs" />
        <Dialog.Popup className="lead-dialog-popup fixed top-1/2 left-1/2 z-[70] flex max-h-[min(100%-2rem,40rem)] w-[min(100%-1.5rem,34rem)] flex-col overflow-y-auto border border-border bg-background p-5 text-foreground shadow-lg outline-none sm:p-6">
          <Dialog.Close
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-3 right-3"
                aria-label="Close"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Dialog.Close>

          <Eyebrow>Start a project</Eyebrow>
          <Dialog.Title className="mt-2 pr-8 text-xl font-semibold tracking-tight text-balance sm:text-2xl">
            Tell us what you are building.
          </Dialog.Title>
          <Dialog.Description className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Choose a starting point. The note is ready to edit. Add your email
            and phone, and we reply {site.responseTime.toLowerCase()}.
          </Dialog.Description>

          <div className="mt-3">
            <InquiryForm id="lead-dialog" variant="dialog" onSuccess={rememberDismissal} />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

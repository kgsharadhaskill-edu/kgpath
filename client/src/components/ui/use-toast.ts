import { useState } from "react";

export function useToast() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function toast({ title, description, variant }: { title: string; description?: string; variant?: string }) {
    setToastMessage(`${title}${description ? " - " + description : ""}`);
    console.log(`${variant === "destructive" ? "❌" : "✅"} ${title}: ${description ?? ""}`);
    setTimeout(() => setToastMessage(null), 3000);
  }

  return { toast, toastMessage };
}

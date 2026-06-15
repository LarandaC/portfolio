export function ContactSeparator() {
  return (
    <div className="flex items-center justify-center gap-4 my-12">
      <div className="h-px w-24 contact-separator-line-r" />
      <span className="font-mono text-xs contact-separator-gem">✦</span>
      <div className="h-px w-24 contact-separator-line-l" />
    </div>
  );
}

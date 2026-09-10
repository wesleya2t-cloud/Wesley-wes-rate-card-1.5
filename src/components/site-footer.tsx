export function SiteFooter() {
  return (
    <footer className="border-t border-border px-5 py-10">
      <div className="mx-auto max-w-5xl space-y-4 text-sm text-muted-foreground">
        <p className="font-display text-lg text-foreground">
          Wesley Wes — podcast production &amp; digital marketing
        </p>
        <p>
          <a className="underline underline-offset-4 hover:text-foreground" href="mailto:handywesley@gmail.com">
            handywesley@gmail.com
          </a>
        </p>
        <p>
          <span className="text-foreground">Payment terms:</span> 50% deposit to begin work, balance
          due on delivery. Monthly retainers are billed at the start of each month.
        </p>
        <p>
          Rates are shown in Kenyan Shillings. USD figures are converted at an indicative rate and
          the estimate is a range — final pricing is confirmed on a short call.
        </p>
        <p className="text-xs">© {new Date().getFullYear()} Wesley Wes Creates. Reviewed periodically.</p>
      </div>
    </footer>
  );
}

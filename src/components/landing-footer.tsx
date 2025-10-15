export default function LandingFooter() {
  return (
    <footer className="flex-shrink-0">
      <div className="container flex h-14 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Architekt. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

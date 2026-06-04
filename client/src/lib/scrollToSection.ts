type ScrollToSectionOptions = {
  updateHash?: boolean;
  behavior?: ScrollBehavior;
};

let activeScrollId = 0;
let pendingTimeouts: number[] = [];

function getNavbarHeight() {
  return document.querySelector<HTMLElement>('.navbar')?.offsetHeight ?? 0;
}

function getSectionPath(sectionId: string) {
  return sectionId === 'home' ? '/' : `/#${sectionId}`;
}

function clearPendingCorrections() {
  pendingTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
  pendingTimeouts = [];
}

export function scrollToSection(
  sectionId: string,
  { updateHash = true, behavior = 'smooth' }: ScrollToSectionOptions = {},
) {
  clearPendingCorrections();
  activeScrollId += 1;

  const scrollId = activeScrollId;

  function getTargetTop() {
    const target = document.getElementById(sectionId);
    if (!target) return null;

    return target.getBoundingClientRect().top + window.scrollY - getNavbarHeight();
  }

  function scrollOnce(scrollBehavior: ScrollBehavior) {
    const top = getTargetTop();
    if (top == null) return;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: scrollBehavior,
    });
  }

  scrollOnce(behavior);

  if (updateHash) {
    window.history.pushState(null, '', getSectionPath(sectionId));
  }

  [900, 1800].forEach((delay) => {
    const timeoutId = window.setTimeout(() => {
      if (scrollId !== activeScrollId) return;

      const top = getTargetTop();
      if (top == null || Math.abs(top - window.scrollY) < 8) return;

      scrollOnce('auto');
    }, delay);

    pendingTimeouts.push(timeoutId);
  });
}

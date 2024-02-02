import { RefObject, useEffect, useState } from 'react';

export default function useHover<T extends Element>(
  ref: RefObject<T>,
): boolean {
  const [state, setState] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const onMouseEnter = () => setState(true);
    const onMouseLeave = () => setState(false);

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  });

  return state;
}

import { useState, useRef, cloneElement, Children, useEffect } from "react";

import { Fade } from "@mui/material";

export const Transition = ({
  children,
  delay = 2,
  component: Comp = Fade,
  target,
  threshold = 0.5,
  loop = false,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const ele = target || ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(entry.isIntersecting);
          } else if (loop) {
            setVisible(entry.isIntersecting);
          }
        });
      },
      {
        threshold
      }
    );

    observer.observe(ele);

    return () => observer.unobserve(ele);
  }, [target, threshold, rest]);

  return Children.map(children, (child, index) =>
    cloneElement(
      <Comp in={visible} timeout={delay * 1000 * (index + 1)} {...rest}>
        {child}
      </Comp>,
      {
        ref
      }
    )
  );
};

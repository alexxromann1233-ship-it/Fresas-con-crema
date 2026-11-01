/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

type Variant = 'primary' | 'secondary' | 'whatsapp';

interface BaseProps {
  variant?: Variant;
  padding?: string;
  children?: React.ReactNode;
}

/**
 * Anchor
 */
type AnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
  };

/**
 * Button
 */
type NativeButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type Props = AnchorProps | NativeButtonProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (props, ref) => {
    const { variant = 'primary', padding, children } = props;
    const className = clsx(
      'inline-flex items-center justify-center gap-2 border-2 rounded-full font-secondary text-center font-semibold cursor-pointer select-none transition-[color,background-color,border-color,transform] duration-300 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none',
      padding || 'py-3 px-6',
      variant === 'primary' &&
        'bg-(--app-btn-bg) hover:bg-(--app-btn-bg-hover) active:bg-(--app-btn-bg-active) border-(--app-btn-bg) hover:border-(--app-btn-bg-hover) active:border-(--app-btn-bg-active) text-(--app-btn-color) hover:text-(--app-btn-color-hover) active:text-(--app-btn-color-active)',
      variant === 'secondary' &&
        'hover:bg-(--app-btn-bg) active:bg-(--app-btn-bg-hover) border-(--app-btn-bg) active:border-(--app-btn-bg-hover) text-(--app-btn-bg) hover:text-(--app-btn-color) active:text-(--app-btn-color-hover)',
      variant === 'whatsapp' &&
        'bg-[#30D04D] hover:bg-[#28AE41] active:bg-[#208C34] border-[#30D04D] hover:border-[#28AE41] active:border-[#208C34] text-white',
      props.className,
    );

    // 🔥 Narrowing REAL (clave)
    if (props.as === 'a') {
      const { as, ...anchorProps } = props;

      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...anchorProps}
          className={className}
        >
          {children}
        </a>
      );
    }

    const { as, ...buttonProps } = props;

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        {...buttonProps}
        className={className}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };

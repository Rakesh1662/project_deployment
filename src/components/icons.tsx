import type { SVGProps } from 'react';

export function DeployWaveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l-8 4.5v9l8 4.5 8-4.5v-9L12 2z" />
      <path d="M3.23 7.55s2.24 1.44 4.27 0" />
      <path d="M16.5 15.5s-2.24-1.44-4.27 0" />
      <path d="M7.5 11.5s2.24 1.44 4.27 0" />
    </svg>
  );
}

import type { ReactElement, SVGProps } from 'react';

export type SVGIcon = (props: SVGProps<SVGSVGElement>) => ReactElement;

export interface Context {
  locale: string;
}

import { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet';

const Page = forwardRef<HTMLDivElement, { children: ReactNode; className?: string; title: string }>(
  ({ children, title = '', ...rest }, ref) => (
    <div ref={ref} {...rest}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  )
);

export default Page;

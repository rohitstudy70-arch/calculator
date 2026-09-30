import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact CalcMaster India',
  description: 'Get in touch with CalcMaster India for feedback, support, or inquiries.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { useBreakpoint } from '../hooks/useBreakpoint';
import DetailModalDesktop from './desktop/DetailModalDesktop';
import DetailModalMobile from './mobile/DetailModalMobile';
import DetailModalMobileLarge from './mobile/DetailModalMobileLarge';
import type { ReactNode } from 'react';

interface DetailModalProps {
  title: string;
  subtitle?: string;
  beshIcon: string;
  characteristics?: { label: string; value: string }[];
  description: string;
  leftContent: ReactNode;
  contentType: 'film' | 'photo' | 'card' | 'planet' | 'starship';
  totalItems: number;
  currentIndex: number;
  onPageChange: (index: number) => void;
  sectionId?: string;
}

const DetailModal = (props: DetailModalProps) => {
  const { isDesktop } = useBreakpoint();
  const { contentType } = props;

  if (isDesktop) {
    return <DetailModalDesktop {...props} />;
  }

  if (contentType === 'planet' || contentType === 'starship') {
    return <DetailModalMobileLarge {...props} />;
  }
  
  return <DetailModalMobile {...props} />;
};

export default DetailModal;
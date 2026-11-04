'use client';

import React from 'react';
import { trackPhoneClick } from '@/lib/gtag';

interface TrackedPhoneLinkProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function TrackedPhoneLink({
  href = 'tel:+41782158030',
  className = 'flex items-center justify-center space-x-2 btn-secondary px-8 py-4',
  children,
}: TrackedPhoneLinkProps) {
  return (
    <a
      href={href}
      onClick={trackPhoneClick}
      className={className}
    >
      {children}
    </a>
  );
}

'use client';

import React, { useState } from 'react';

interface ShareActionsProps {
  onDownloadPDF?: () => void;
  onDownloadPdf?: () => void;
  onDownloadExcel?: () => void;
  onCopyLink?: () => void;
  shareUrl?: string;
  title?: string;
}

export function ShareActions({
  onDownloadPDF,
  onDownloadPdf,
  onDownloadExcel,
  onCopyLink,
  shareUrl,
  title,
}: ShareActionsProps) {
  const handlePdf = onDownloadPDF || onDownloadPdf;
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyLink = async () => {
    try {
      if (shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      showToast('Link copied to clipboard!');
      if (onCopyLink) onCopyLink();
    } catch (err) {
      showToast('Failed to copy link');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: shareUrl || window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const buttonClass = "p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="relative flex items-center space-x-2">
      {handlePdf && (
        <button onClick={handlePdf} className={buttonClass} aria-label="Download PDF" title="Download PDF">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </button>
      )}
      
      {onDownloadExcel && (
        <button onClick={onDownloadExcel} className={buttonClass} aria-label="Download Excel" title="Download Excel">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
      )}

      <button onClick={handleCopyLink} className={buttonClass} aria-label="Copy Link" title="Copy Link">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </button>

      <button onClick={handleShare} className={buttonClass} aria-label="Share" title="Share">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute right-0 -top-12 bg-gray-900 text-white text-sm py-1.5 px-3 rounded-md shadow-lg whitespace-nowrap z-50 animate-fade-in-up">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

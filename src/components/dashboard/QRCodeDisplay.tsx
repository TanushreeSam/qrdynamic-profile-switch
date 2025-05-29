
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QRCodeDisplayProps {
  qrCodeId: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCodeId }) => {
  const { toast } = useToast();
  const qrUrl = `${window.location.origin}/qr/${qrCodeId}`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrUrl);
    toast({
      title: 'Copied!',
      description: 'QR code URL copied to clipboard',
    });
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeImageUrl;
    link.download = `qr-code-${qrCodeId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <img
          src={qrCodeImageUrl}
          alt="QR Code"
          className="border rounded-lg shadow-sm"
        />
      </div>
      <div className="text-sm text-gray-600 break-all">
        {qrUrl}
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={copyToClipboard}>
          <Copy className="h-4 w-4 mr-2" />
          Copy URL
        </Button>
        <Button variant="outline" size="sm" onClick={downloadQR}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};
